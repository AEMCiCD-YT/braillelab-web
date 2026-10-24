"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { apiLabel, campaign as approved, dateLabel, dateTimeLabel, getBudgetGroups, getDestinationLabels, monthLabel, platformUrl, usd } from "../../content/campaign";
import { site } from "../../content/site";
import { localizePath } from "../../lib/i18n.mjs";
import { useLocale } from "../useLocale";
import { useTransparency } from "./useTransparency";
import styles from "./Transparency.module.css";

// Textos por idioma. Nombres de rubros, conceptos, gastos y documentos vienen de la plataforma y se muestran tal cual.
const copy = {
  es: {
    loading: "Cargando información de transparencia…",
    updating: "Actualizando…",
    stale: (date) => `Datos desactualizados: se muestra el último corte válido (${date}) porque la actualización no está disponible ahora.`,
    summary: "Resumen",
    snapshot: (date, version, status) => `Corte del ${date} · versión ${version} · campaña ${status}. Las cifras se actualizan desde los registros verificados de Tesorería.`,
    statuses: { active: "activa", paused: "pausada", closed: "cerrada" },
    netIncome: "Ingresos confirmados (neto)",
    netIncomeNote: (gross, refunds) => `Bruto ${gross} · devoluciones ${refunds}`,
    paid: "Gasto pagado",
    paidNote: "Pagos verificados, netos de reversos.",
    committed: "Compromisos pendientes",
    committedNote: "Compras aprobadas aún por pagar. No se suman al gasto pagado.",
    available: "Disponible",
    availableNote: "Recibido − pagado − comprometido, por destino. No es el saldo total del banco.",
    pending: "Necesidad pendiente",
    pendingNote: "Meta − efectivo verificado − costo cubierto en especie.",
    goalBar: "Avance de la meta con efectivo verificado",
    emptyData: "Todavía no hay movimientos verificados: las cifras en cero son reales.",
    hidden: "Las cifras de avance de esta campaña no están publicadas.",
    unconfigured: "Esta página todavía no está conectada a la plataforma de la asociación. Consultas:",
    notPublished: "La campaña aún no publica información de ingresos y gastos. Abajo está el presupuesto aprobado; las cifras aparecerán cuando estén verificadas y su publicación esté autorizada.",
    unavailable: "No pudimos cargar la información en este momento.",
    lastValid: (date, version) => ` Último dato válido: ${date} (versión ${version}).`,
    noAmounts: "No mostramos montos para no dar datos incorrectos.",
    retry: "Reintentar",
    of: "de",
    approvedBudget: "Presupuesto aprobado",
    approvedCaption: (goal) => `Meta técnica total de ${goal} por grupo`,
    groupHead: ["Grupo", "Monto"],
    total: "Total",
    bootcamp: "La operación del bootcamp y del Demo Day tiene un presupuesto aparte, pendiente de definir, y no está financiada por esta meta.",
    budgetTitle: (version) => `Presupuesto general (versión ${version})`,
    budgetMeta: "Recibido = efectivo verificado asignado al rubro. Comprometido y pagado son hechos distintos: un compromiso pagado pasa de una columna a la otra y nunca se cuenta dos veces. «En especie» es costo cubierto con bienes aceptados, no efectivo.",
    budgetCaption: (total) => `Presupuesto general de ${total}`,
    budgetHead: ["Rubro", "Presupuesto", "Recibido", "Comprometido", "Pagado", "En especie"],
    milestoneTitle: (amount) => `Primer hito: ${amount}`,
    milestoneMeta: "Acumulativo: forma parte de la meta total, no es un presupuesto adicional.",
    reached: "Alcanzado.",
    remaining: (amount) => `Faltan ${amount}.`,
    milestoneBar: "Avance del primer hito",
    milestoneCaption: (amount) => `Asignaciones del primer hito (${amount})`,
    milestoneHead: ["Asignación", "Rubro", "Monto"],
    milestoneTotal: "Total del hito",
    income: "Ingresos confirmados y disponibilidad",
    incomeMeta: "Solo cuentan transferencias verificadas en la cuenta institucional. Los avisos pendientes de revisión, las promesas, la financiación solicitada o aprobada que aún no llegó y las transferencias entre cuentas de la asociación no se suman.",
    incomeCaption: "Ingresos",
    conceptHead: ["Concepto", "Monto"],
    grossIncome: "Ingresos brutos verificados",
    refunds: "Devoluciones",
    reversals: "Reversos",
    net: "Ingreso neto",
    availabilityCaption: "Disponibilidad por destino (recibido − pagado − comprometido). El dinero con destino restringido solo se usa en ese destino.",
    availabilityHead: ["Destino", "Recibido", "Pagado", "Comprometido", "Disponible"],
    flexible: "Uso flexible (incluida la reserva)",
    monthsCaption: "Movimientos verificados por mes (fecha de operación)",
    monthsHead: ["Mes", "Ingresos", "Devoluciones", "Reversos", "Neto", "Pagado"],
    inKind: "Aportes en especie",
    inKindMeta: "Bienes y servicios recibidos, revisados y valorados. No son efectivo ni aumentan lo disponible: solo reducen la necesidad cuando sustituyen un costo del presupuesto, una sola vez. Las promesas no se cuentan hasta recibirse y aceptarse.",
    inKindCaption: "Aportes en especie aceptados",
    accepted: "Valor aceptado y documentado",
    substituted: "Costo del presupuesto sustituido",
    excess: "Valor no aplicado a ningún rubro",
    expenses: "Gastos publicados",
    expensesHidden: "El detalle de gastos de esta campaña no está publicado.",
    expensesMeta: "Pagos verificados cuya descripción pública fue aprobada. Cada pago muestra su fecha de operación y la fecha en que se publicó. Los comprobantes originales y las facturas nunca se publican; cuando existe, se enlaza una copia revisada.",
    filterLabel: "Filtrar gastos",
    from: "Desde",
    to: "Hasta",
    line: "Rubro",
    all: "Todos",
    apply: "Aplicar filtros",
    clear: "Quitar filtros",
    noFiltered: "No hay gastos publicados con estos filtros.",
    noExpenses: "Todavía no hay gastos publicados.",
    results: (count, page, pages) => `${count} ${count === 1 ? "gasto" : "gastos"} · página ${page} de ${pages}`,
    expensesHead: ["Fecha de operación", "Concepto", "Rubro", "Monto", "Estado", "Documentos"],
    published: "Publicado",
    reversed: "Revertido",
    paidStatus: "Pagado",
    pages: "Páginas de gastos",
    previous: "Anterior",
    page: (page, pages) => `Página ${page} de ${pages}`,
    next: "Siguiente",
    image: "imagen",
    newTab: "abre en una pestaña nueva",
    documents: "Avances y documentos públicos",
    documentsHidden: "Los documentos públicos de esta campaña no están publicados.",
    noDocuments: "Todavía no hay informes ni documentos públicos.",
    documentsMeta: "Los documentos son copias revisadas y redactadas por la asociación. ¿Quieres apoyar?",
    support: "Apoya y colabora",
  },
  en: {
    loading: "Loading transparency information…",
    updating: "Updating…",
    stale: (date) => `Outdated data: showing the last valid snapshot (${date}) because the update is not available right now.`,
    summary: "Summary",
    snapshot: (date, version, status) => `Snapshot of ${date} · version ${version} · campaign ${status}. Figures are updated from the Treasurer's verified records.`,
    statuses: { active: "active", paused: "paused", closed: "closed" },
    netIncome: "Confirmed income (net)",
    netIncomeNote: (gross, refunds) => `Gross ${gross} · refunds ${refunds}`,
    paid: "Paid expenses",
    paidNote: "Verified payments, net of reversals.",
    committed: "Pending commitments",
    committedNote: "Approved purchases not yet paid. Not included in paid expenses.",
    available: "Available",
    availableNote: "Received − paid − committed, by allocation. This is not the total bank balance.",
    pending: "Remaining need",
    pendingNote: "Goal − verified cash − cost covered in kind.",
    goalBar: "Progress toward the goal with verified cash",
    emptyData: "There are no verified transactions yet: the zero figures are real.",
    hidden: "Progress figures for this campaign are not published.",
    unconfigured: "This page is not yet connected to the association's platform. Questions:",
    notPublished: "The campaign has not published income and expense information yet. The approved budget is shown below; figures will appear once they are verified and their publication is authorized.",
    unavailable: "We could not load the information right now.",
    lastValid: (date, version) => ` Last valid data: ${date} (version ${version}).`,
    noAmounts: "We do not show amounts so as not to give incorrect data.",
    retry: "Try again",
    of: "of",
    approvedBudget: "Approved budget",
    approvedCaption: (goal) => `Total technical goal of ${goal} by group`,
    groupHead: ["Group", "Amount"],
    total: "Total",
    bootcamp: "Running the bootcamp and Demo Day has a separate budget, still to be defined, and is not funded by this goal.",
    budgetTitle: (version) => `Overall budget (version ${version})`,
    budgetMeta: "Received = verified cash allocated to the budget line. Committed and paid are separate facts: a paid commitment moves from one column to the other and is never counted twice. “In kind” is cost covered by accepted goods, not cash.",
    budgetCaption: (total) => `Overall budget of ${total}`,
    budgetHead: ["Budget line", "Budget", "Received", "Committed", "Paid", "In kind"],
    milestoneTitle: (amount) => `First milestone: ${amount}`,
    milestoneMeta: "Cumulative: it is part of the total goal, not an additional budget.",
    reached: "Reached.",
    remaining: (amount) => `${amount} to go.`,
    milestoneBar: "First milestone progress",
    milestoneCaption: (amount) => `First milestone allocations (${amount})`,
    milestoneHead: ["Allocation", "Budget line", "Amount"],
    milestoneTotal: "Milestone total",
    income: "Confirmed income and availability",
    incomeMeta: "Only transfers verified in the institutional account count. Reports pending review, pledges, funding requested or approved but not yet received, and transfers between the association's own accounts are not included.",
    incomeCaption: "Income",
    conceptHead: ["Item", "Amount"],
    grossIncome: "Verified gross income",
    refunds: "Refunds",
    reversals: "Reversals",
    net: "Net income",
    availabilityCaption: "Availability by allocation (received − paid − committed). Restricted money is used only for its allocation.",
    availabilityHead: ["Allocation", "Received", "Paid", "Committed", "Available"],
    flexible: "Flexible use (including the reserve)",
    monthsCaption: "Verified transactions by month (operation date)",
    monthsHead: ["Month", "Income", "Refunds", "Reversals", "Net", "Paid"],
    inKind: "In-kind contributions",
    inKindMeta: "Goods and services received, reviewed and valued. They are not cash and do not increase available funds: they reduce the need only when they replace a budgeted cost, once. Pledges are not counted until received and accepted.",
    inKindCaption: "Accepted in-kind contributions",
    accepted: "Accepted and documented value",
    substituted: "Budgeted cost replaced",
    excess: "Value not applied to any budget line",
    expenses: "Published expenses",
    expensesHidden: "The expense details for this campaign are not published.",
    expensesMeta: "Verified payments whose public description was approved. Each payment shows its operation date and the date it was published. Original receipts and invoices are never published; when available, a reviewed copy is linked.",
    filterLabel: "Filter expenses",
    from: "From",
    to: "To",
    line: "Budget line",
    all: "All",
    apply: "Apply filters",
    clear: "Clear filters",
    noFiltered: "No published expenses match these filters.",
    noExpenses: "No expenses have been published yet.",
    results: (count, page, pages) => `${count} ${count === 1 ? "expense" : "expenses"} · page ${page} of ${pages}`,
    expensesHead: ["Operation date", "Item", "Budget line", "Amount", "Status", "Documents"],
    published: "Published",
    reversed: "Reversed",
    paidStatus: "Paid",
    pages: "Expense pages",
    previous: "Previous",
    page: (page, pages) => `Page ${page} of ${pages}`,
    next: "Next",
    image: "image",
    newTab: "opens in a new tab",
    documents: "Updates and public documents",
    documentsHidden: "The public documents for this campaign are not published.",
    noDocuments: "There are no reports or public documents yet.",
    documentsMeta: "Documents are reviewed and redacted copies prepared by the association. Want to help?",
    support: "Support us",
  },
};

/** Textos, formatos y destinos del idioma de la página. */
function useText() {
  const locale = useLocale();
  const t = copy[locale];
  const destinationLabels = getDestinationLabels(locale);
  return {
    locale,
    t,
    money: (amount) => usd(amount, locale),
    date: (value) => dateLabel(value, locale),
    dateTime: (value) => dateTimeLabel(value, locale),
    destinationName: (code) => (code ? destinationLabels[code] ?? code : t.flexible),
    label: (text) => apiLabel(text, locale),
  };
}

const PAGE_SIZE = 10;
const cents = (amount) => Math.round(Number(amount) * 100);
const percentOf = (part, total) => (cents(total) > 0 ? Math.max(0, Math.min(100, (cents(part) * 100) / cents(total))) : 0);

function readQuery() {
  if (typeof window === "undefined") return { page: 1 };
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get("pagina"));
  return {
    from: params.get("desde") || "",
    to: params.get("hasta") || "",
    line: params.get("rubro") || "",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

function writeQuery(filters) {
  const params = new URLSearchParams();
  if (filters.from) params.set("desde", filters.from);
  if (filters.to) params.set("hasta", filters.to);
  if (filters.line) params.set("rubro", filters.line);
  if (filters.page > 1) params.set("pagina", String(filters.page));
  const search = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`);
}

export default function TransparencyReport() {
  const { t } = useText();
  const [filters, setFilters] = useState(null);
  useEffect(() => setFilters(readQuery()), []);
  const query = useMemo(
    () => (filters ? { from: filters.from, to: filters.to, line: filters.line, page: filters.page, pageSize: PAGE_SIZE } : null),
    [filters],
  );
  if (!query) return <p className={styles.notice} role="status">{t.loading}</p>;
  return <Report query={query} filters={filters} setFilters={setFilters} />;
}

function Report({ query, filters, setFilters }) {
  const { t, money, dateTime } = useText();
  const { state, campaign, transparency, lastValid, retry } = useTransparency(query);
  const ready = state === "ready";

  function applyFilters(next) {
    const updated = { ...filters, ...next };
    writeQuery(updated);
    setFilters(updated);
  }

  if (!ready && !campaign) {
    return (
      <div className={styles.stack}>
        <StateNotice state={state} lastValid={lastValid} onRetry={retry} />
        <ApprovedBudgetFallback />
      </div>
    );
  }

  const publication = campaign.publication;
  const totals = transparency.totals;

  return (
    <div className={styles.stack}>
      {state === "loading" && <p className={styles.notice} role="status">{t.updating}</p>}
      {state === "unavailable" && <StateNotice state={state} lastValid={lastValid} onRetry={retry} />}
      {publication.freshness === "stale" && (
        <p className={`${styles.notice} ${styles.alert}`} role="status">
          {t.stale(dateTime(publication.asOf))}
        </p>
      )}

      <section aria-labelledby="resumen" className={styles.block}>
        <h2 id="resumen">{t.summary}</h2>
        <p className={styles.meta}>
          {t.snapshot(dateTime(publication.asOf), publication.version, t.statuses[campaign.campaign.status])}
        </p>
        {totals ? (
          <>
            <dl className={styles.cards}>
              <Card label={t.netIncome} value={totals.cash.netReceived} note={t.netIncomeNote(money(totals.cash.grossIncome), money(totals.cash.refunds))} />
              <Card label={t.paid} value={totals.execution.paid} note={t.paidNote} />
              <Card label={t.committed} value={totals.execution.committedPending} note={t.committedNote} />
              <Card label={t.available} value={totals.execution.available} note={t.availableNote} />
              <Card label={t.pending} value={totals.pendingMonetaryNeed} note={t.pendingNote} />
            </dl>
            <Bar label={t.goalBar} part={totals.cash.netReceived} total={campaign.goal} />
            {transparency.dataState === "empty" && <p className={styles.notice}>{t.emptyData}</p>}
          </>
        ) : (
          <p className={styles.notice}>{t.hidden}</p>
        )}
      </section>

      <BudgetSection campaign={campaign} />

      {totals && <IncomeSection totals={totals} months={transparency.cashByMonth} />}
      {totals && <InKindSection inKind={totals.inKind} />}

      <ExpensesSection
        expenses={transparency.expenses}
        lines={campaign.budget?.lines ?? []}
        filters={filters}
        onApply={applyFilters}
        loading={state === "loading"}
      />

      <DocumentsSection documents={transparency.documents} />
    </div>
  );
}

function StateNotice({ state, lastValid, onRetry }) {
  const { t, dateTime } = useText();
  if (state === "loading") return <p className={styles.notice} role="status">{t.loading}</p>;
  if (state === "unconfigured") {
    return (
      <p className={styles.notice} role="status">
        {t.unconfigured} <a href={`mailto:${site.contacts.general}`}>{site.contacts.general}</a>.
      </p>
    );
  }
  if (state === "not-published") {
    return (
      <p className={styles.notice} role="status">{t.notPublished}</p>
    );
  }
  return (
    <div className={`${styles.notice} ${styles.alert}`} role="alert">
      <p>
        {t.unavailable}
        {lastValid ? t.lastValid(dateTime(lastValid.asOf), lastValid.version) : ""} {t.noAmounts}
      </p>
      <button type="button" className="button button-secondary" onClick={onRetry}>{t.retry}</button>
    </div>
  );
}

function Card({ label, value, note }) {
  const { money } = useText();
  return (
    <div>
      <dt>{label}</dt>
      <dd>{money(value)}</dd>
      <dd className={styles.cardNote}>{note}</dd>
    </div>
  );
}

/** Barra con alternativa textual: el dato siempre está también en el texto. */
function Bar({ label, part, total }) {
  const { locale, t, money } = useText();
  const value = percentOf(part, total);
  const text = `${label}: ${money(part)} ${t.of} ${money(total)} (${value.toLocaleString(locale === "en" ? "en-US" : "es-EC", { maximumFractionDigits: 1 })} %)`;
  return (
    <div className={styles.barBlock}>
      <p>{text}</p>
      <div className={styles.bar} aria-hidden="true">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ApprovedBudgetFallback() {
  const { locale, t, money } = useText();
  return (
    <section aria-labelledby="presupuesto-aprobado" className={styles.block}>
      <h2 id="presupuesto-aprobado">{t.approvedBudget}</h2>
      <Table caption={t.approvedCaption(money(approved.goal))} head={t.groupHead} numeric={[1]}>
        {getBudgetGroups(locale).map((group) => (
          <tr key={group.title}>
            <th scope="row">{group.title}</th>
            <td className={styles.number}>{money(group.amount)}</td>
          </tr>
        ))}
        <tr className={styles.totalRow}>
          <th scope="row">{t.total}</th>
          <td className={styles.number}>{money(approved.goal)}</td>
        </tr>
      </Table>
      <BootcampNote />
    </section>
  );
}

function BootcampNote() {
  const { t } = useText();
  return <p className={styles.note}>{t.bootcamp}</p>;
}

function BudgetSection({ campaign }) {
  const { t, money, label } = useText();
  const budget = campaign.budget;
  if (!budget) return <ApprovedBudgetFallback />;
  const groups = [...new Set(budget.lines.map((line) => line.group))];
  const milestone = budget.milestones[0];
  return (
    <section aria-labelledby="presupuesto" className={styles.block}>
      <h2 id="presupuesto">{t.budgetTitle(budget.version)}</h2>
      <p className={styles.meta}>{t.budgetMeta}</p>
      <Table
        caption={t.budgetCaption(money(budget.total))}
        head={t.budgetHead}
        numeric={[1, 2, 3, 4, 5]}
      >
        {groups.map((group) => (
          <GroupRows key={group} group={group} lines={budget.lines.filter((line) => line.group === group)} />
        ))}
        <tr className={styles.totalRow}>
          <th scope="row">{t.total}</th>
          <td className={styles.number}>{money(budget.total)}</td>
          <td className={styles.number}>{money(sum(budget.lines, "received"))}</td>
          <td className={styles.number}>{money(sum(budget.lines, "committed"))}</td>
          <td className={styles.number}>{money(sum(budget.lines, "paid"))}</td>
          <td className={styles.number}>{money(sum(budget.lines, "inKindSubstituted"))}</td>
        </tr>
      </Table>
      <BootcampNote />

      {milestone && (
        <>
          <h3>{t.milestoneTitle(money(milestone.target))}</h3>
          <p className={styles.meta}>
            {t.milestoneMeta} {milestone.reached ? t.reached : t.remaining(money(milestone.remaining))}
          </p>
          <Bar label={t.milestoneBar} part={milestone.reachedAmount} total={milestone.target} />
          <Table caption={t.milestoneCaption(money(milestone.target))} head={t.milestoneHead} numeric={[2]}>
            {milestone.allocations.map((allocation) => (
              <tr key={`${allocation.lineCode}-${allocation.label}`}>
                <th scope="row">{label(allocation.label)}</th>
                <td>{label(budget.lines.find((line) => line.code === allocation.lineCode)?.name ?? allocation.lineCode)}</td>
                <td className={styles.number}>{money(allocation.amount)}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <th scope="row" colSpan={2}>{t.milestoneTotal}</th>
              <td className={styles.number}>{money(sum(milestone.allocations, "amount"))}</td>
            </tr>
          </Table>
        </>
      )}
    </section>
  );
}

function sum(rows, field) {
  return (rows.reduce((total, row) => total + cents(row[field]), 0) / 100).toFixed(2);
}

function GroupRows({ group, lines }) {
  const { money: usd, label } = useText();
  return (
    <>
      <tr className={styles.groupRow}>
        <th scope="rowgroup" colSpan={6}>{label(group)}</th>
      </tr>
      {lines.map((line) => (
        <tr key={line.code}>
          <th scope="row">{label(line.name)}</th>
          <td className={styles.number}>{usd(line.amount)}</td>
          <td className={styles.number}>{usd(line.received)}</td>
          <td className={styles.number}>{usd(line.committed)}</td>
          <td className={styles.number}>{usd(line.paid)}</td>
          <td className={styles.number}>{usd(line.inKindSubstituted)}</td>
        </tr>
      ))}
    </>
  );
}

function IncomeSection({ totals, months }) {
  const { locale, t, money: usd, destinationName } = useText();
  return (
    <section aria-labelledby="ingresos" className={styles.block}>
      <h2 id="ingresos">{t.income}</h2>
      <p className={styles.meta}>{t.incomeMeta}</p>
      <Table caption={t.incomeCaption} head={t.conceptHead} numeric={[1]}>
        <tr><th scope="row">{t.grossIncome}</th><td className={styles.number}>{usd(totals.cash.grossIncome)}</td></tr>
        <tr><th scope="row">{t.refunds}</th><td className={styles.number}>− {usd(totals.cash.refunds)}</td></tr>
        <tr><th scope="row">{t.reversals}</th><td className={styles.number}>− {usd(totals.cash.reversals)}</td></tr>
        <tr className={styles.totalRow}><th scope="row">{t.net}</th><td className={styles.number}>{usd(totals.cash.netReceived)}</td></tr>
      </Table>

      <Table
        caption={t.availabilityCaption}
        head={t.availabilityHead}
        numeric={[1, 2, 3, 4]}
      >
        {totals.execution.availableByDestination.map((row) => (
          <tr key={row.destination ?? "flexible"}>
            <th scope="row">{destinationName(row.destination)}</th>
            <td className={styles.number}>{usd(row.received)}</td>
            <td className={styles.number}>{usd(row.paid)}</td>
            <td className={styles.number}>{usd(row.committedPending)}</td>
            <td className={styles.number}>{usd(row.available)}</td>
          </tr>
        ))}
      </Table>

      {months?.length > 0 && (
        <Table caption={t.monthsCaption} head={t.monthsHead} numeric={[1, 2, 3, 4, 5]}>
          {months.map((month) => (
            <tr key={month.month}>
              <th scope="row">{monthLabel(month.month, locale)}</th>
              <td className={styles.number}>{usd(month.grossIncome)}</td>
              <td className={styles.number}>{usd(month.refunds)}</td>
              <td className={styles.number}>{usd(month.reversals)}</td>
              <td className={styles.number}>{usd(month.netReceived)}</td>
              <td className={styles.number}>{usd(month.paid)}</td>
            </tr>
          ))}
        </Table>
      )}
    </section>
  );
}

function InKindSection({ inKind }) {
  const { t, money: usd } = useText();
  return (
    <section aria-labelledby="especie" className={styles.block}>
      <h2 id="especie">{t.inKind}</h2>
      <p className={styles.meta}>{t.inKindMeta}</p>
      <Table caption={t.inKindCaption} head={t.conceptHead} numeric={[1]}>
        <tr><th scope="row">{t.accepted}</th><td className={styles.number}>{usd(inKind.acceptedValuation)}</td></tr>
        <tr><th scope="row">{t.substituted}</th><td className={styles.number}>{usd(inKind.substituted)}</td></tr>
        <tr><th scope="row">{t.excess}</th><td className={styles.number}>{usd(inKind.excessValuation)}</td></tr>
      </Table>
    </section>
  );
}

function ExpensesSection({ expenses, lines, filters, onApply, loading }) {
  const { t, money: usd, date, label } = useText();
  const formRef = useRef(null);
  const resultsRef = useRef(null);
  if (!expenses) {
    return (
      <section aria-labelledby="gastos" className={styles.block}>
        <h2 id="gastos">{t.expenses}</h2>
        <p className={styles.notice}>{t.expensesHidden}</p>
      </section>
    );
  }

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onApply({ from: String(form.get("from") || ""), to: String(form.get("to") || ""), line: String(form.get("line") || ""), page: 1 });
  }

  function goTo(page) {
    onApply({ page });
    resultsRef.current?.focus();
  }

  const filtered = Boolean(filters.from || filters.to || filters.line);
  return (
    <section aria-labelledby="gastos" className={styles.block}>
      <h2 id="gastos">{t.expenses}</h2>
      <p className={styles.meta}>{t.expensesMeta}</p>
      <form ref={formRef} className={styles.filters} onSubmit={submit} aria-label={t.filterLabel}>
        <label>
          {t.from}
          <input type="date" name="from" defaultValue={filters.from} />
        </label>
        <label>
          {t.to}
          <input type="date" name="to" defaultValue={filters.to} />
        </label>
        <label>
          {t.line}
          <select name="line" defaultValue={filters.line}>
            <option value="">{t.all}</option>
            {lines.map((line) => (
              <option key={line.code} value={line.code}>{label(line.name)}</option>
            ))}
          </select>
        </label>
        <div className={styles.filterActions}>
          <button type="submit" className="button button-secondary" disabled={loading}>{t.apply}</button>
          {filtered && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                formRef.current?.reset();
                onApply({ from: "", to: "", line: "", page: 1 });
              }}
            >
              {t.clear}
            </button>
          )}
        </div>
      </form>

      <p ref={resultsRef} tabIndex={-1} className={styles.results} aria-live="polite">
        {expenses.totalItems === 0
          ? filtered
            ? t.noFiltered
            : t.noExpenses
          : t.results(expenses.totalItems, expenses.page, Math.max(1, expenses.totalPages))}
      </p>

      {expenses.items.length > 0 && (
        <Table caption={t.expenses} head={t.expensesHead} numeric={[3]}>
          {expenses.items.map((item) => (
            <tr key={item.id}>
              <td>{date(item.operationDate)}<small className={styles.cellNote}>{t.published} {date(item.publishedAt)}</small></td>
              <th scope="row">{item.description}</th>
              <td>{item.lines.map((line) => (line.name ? label(line.name) : line.code)).join(", ") || "—"}</td>
              <td className={styles.number}>{usd(item.amount)}</td>
              <td>{item.status === "reversed" ? t.reversed : t.paidStatus}</td>
              <td>
                {item.documents.length
                  ? item.documents.map((document) => <DocumentLink key={document.id} document={document} />)
                  : "—"}
              </td>
            </tr>
          ))}
        </Table>
      )}

      {expenses.totalPages > 1 && (
        <nav className={styles.pagination} aria-label={t.pages}>
          <button type="button" className="button button-secondary" disabled={expenses.page <= 1 || loading} onClick={() => goTo(expenses.page - 1)}>
            {t.previous}
          </button>
          <span>{t.page(expenses.page, expenses.totalPages)}</span>
          <button type="button" className="button button-secondary" disabled={expenses.page >= expenses.totalPages || loading} onClick={() => goTo(expenses.page + 1)}>
            {t.next}
          </button>
        </nav>
      )}
    </section>
  );
}

function DocumentLink({ document }) {
  const { t } = useText();
  const href = platformUrl(document.url);
  if (!href) return null;
  const kind = document.mimeType === "application/pdf" ? "PDF" : t.image;
  return (
    <a className={styles.documentLink} href={href} target="_blank" rel="noopener noreferrer">
      {document.title} <span className={styles.cellNote}>({kind}, {Math.max(1, Math.round(document.sizeBytes / 1024))} KB; {t.newTab})</span>
    </a>
  );
}

function DocumentsSection({ documents }) {
  const { locale, t, date } = useText();
  return (
    <section aria-labelledby="avances" className={styles.block}>
      <h2 id="avances">{t.documents}</h2>
      {!documents ? (
        <p className={styles.notice}>{t.documentsHidden}</p>
      ) : documents.length === 0 ? (
        <p className={styles.notice}>{t.noDocuments}</p>
      ) : (
        <ul className={styles.documents}>
          {documents.map((document) => (
            <li key={document.id}>
              <DocumentLink document={document} />
              {document.description && <p>{document.description}</p>}
              <small className={styles.cellNote}>{t.published} {date(document.publishedAt)}</small>
            </li>
          ))}
        </ul>
      )}
      <p className={styles.meta}>
        {t.documentsMeta} <Link href={localizePath("/alianzas", locale)}>{t.support}</Link>.
      </p>
    </section>
  );
}

// `numeric`: índices de las columnas con importes, alineadas a la derecha.
function Table({ caption, head, numeric = [], children }) {
  return (
    <div className={styles.tableWrap} role="region" aria-label={caption} tabIndex={0}>
      <table className={styles.table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((label, index) => (
              <th key={label} scope="col" className={numeric.includes(index) ? styles.number : undefined}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
