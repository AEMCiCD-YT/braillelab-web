import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { recordContributionNoticeConversion, CONTRIBUTION_NOTICE_SEND_TO } from "../lib/google-ads.mjs";

afterEach(() => { delete globalThis.window; });

test("accepted notices emit one event per submission without personal or banking fields", () => {
  const events = [];
  globalThis.window = { gtag: (...args) => events.push(args) };
  const response = { noticeCode: "TEST-1", contactEmail: "private@example.test", amount: "250", bankReference: "PRIVATE" };
  assert.equal(recordContributionNoticeConversion(202, response, "random-test-key-1"), true);
  assert.equal(recordContributionNoticeConversion(202, response, "random-test-key-1"), false);
  assert.deepEqual(events, [["event", "conversion", {
    send_to: CONTRIBUTION_NOTICE_SEND_TO,
    transaction_id: "random-test-key-1",
    transport_type: "beacon",
  }]]);
  assert.equal(recordContributionNoticeConversion(202, { noticeCode: "TEST-2" }, "random-test-key-2"), true);
  assert.equal(events.length, 2);
});

test("errors and incomplete acknowledgements never emit a conversion", () => {
  const events = [];
  globalThis.window = { gtag: (...args) => events.push(args) };
  for (const status of [0, 200, 400, 409, 422, 429, 500, 503]) {
    assert.equal(recordContributionNoticeConversion(status, { noticeCode: "TEST" }, `failure-${status}`), false);
  }
  for (const response of [null, {}, { noticeCode: "" }, { noticeCode: " " }]) {
    assert.equal(recordContributionNoticeConversion(202, response, "incomplete"), false);
  }
  assert.equal(events.length, 0);
});

test("missing or throwing tags never interrupt the form confirmation", () => {
  const response = { noticeCode: "TEST-3" };
  assert.equal(recordContributionNoticeConversion(202, response, "tag-missing"), false);
  globalThis.window = {};
  assert.equal(recordContributionNoticeConversion(202, response, "tag-missing"), false);
  globalThis.window.gtag = () => { throw new Error("blocked"); };
  assert.doesNotThrow(() => recordContributionNoticeConversion(202, response, "tag-blocked"));
  const events = [];
  globalThis.window.gtag = (...args) => events.push(args);
  assert.equal(recordContributionNoticeConversion(202, response, "tag-missing"), true);
  assert.equal(events.length, 1);
});
