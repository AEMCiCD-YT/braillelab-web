"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { campaign as approved, dateLabel, dateTimeLabel, destinationLabels, monthLabel, platformUrl, usd } from "../../content/campaign";
import { site } from "../../content/site";
import { useTransparency } from "./useTransparency";
import styles from "./Transparency.module.css";

const PAGE_SIZE = 10;
const destinationName = (code) => (code ? destinationLabels[code] ?? code : "Uso flexible (incluida la reserva)");
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
  const [filters, setFilters] = useState(null);
  useEffect(() => setFilters(readQuery()), []);
  const query = useMemo(
    () => (filters ? { from: filters.from, to: filters.to, line: filters.line, page: filters.page, pageSize: PAGE_SIZE } : null),
    [filters],
  );
  if (!query) return <p className={styles.notice} role="status">Cargando información de transparencia…</p>;
  return <Report query={query} filters={filters} setFilters={setFilters} />;
}

function Report({ query, filters, setFilters }) {
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
      {state === "loading" && <p className={styles.notice} role="status">Actualizando…</p>}
      {state === "unavailable" && <StateNotice state={state} lastValid={lastValid} onRetry={retry} />}
      {publication.freshness === "stale" && (
        <p className={`${styles.notice} ${styles.alert}`} role="status">
          Datos desactualizados: se muestra el último corte válido ({dateTimeLabel(publication.asOf)}) porque la actualización no está
          disponible ahora.
        </p>
      )}

      <section aria-labelledby="resumen" className={styles.block}>
        <h2 id="resumen">Resumen</h2>
        <p className={styles.meta}>
          Corte del {dateTimeLabel(publication.asOf)} · versión {publication.version} · campaña{" "}
          {{ active: "activa", paused: "pausada", closed: "cerrada" }[campaign.campaign.status]}. Las cifras se actualizan desde los
          registros verificados de Tesorería.
        </p>
        {totals ? (
          <>
            <dl className={styles.cards}>
              <Card label="Ingresos confirmados (neto)" value={totals.cash.netReceived} note={`Bruto ${usd(totals.cash.grossIncome)} · devoluciones ${usd(totals.cash.refunds)}`} />
              <Card label="Gasto pagado" value={totals.execution.paid} note="Pagos verificados, netos de reversos." />
              <Card label="Compromisos pendientes" value={totals.execution.committedPending} note="Compras aprobadas aún por pagar. No se suman al gasto pagado." />
              <Card label="Disponible" value={totals.execution.available} note="Recibido − pagado − comprometido, por destino. No es el saldo total del banco." />
              <Card label="Necesidad pendiente" value={totals.pendingMonetaryNeed} note="Meta − efectivo verificado − costo cubierto en especie." />
            </dl>
            <Bar label="Avance de la meta con efectivo verificado" part={totals.cash.netReceived} total={campaign.goal} />
            {transparency.dataState === "empty" && <p className={styles.notice}>Todavía no hay movimientos verificados: las cifras en cero son reales.</p>}
          </>
        ) : (
          <p className={styles.notice}>Las cifras de avance de esta campaña no están publicadas.</p>
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
  if (state === "loading") return <p className={styles.notice} role="status">Cargando información de transparencia…</p>;
  if (state === "unconfigured") {
    return (
      <p className={styles.notice} role="status">
        Esta página todavía no está conectada a la plataforma de la asociación. Consultas: <a href={`mailto:${site.contact}`}>{site.contact}</a>.
      </p>
    );
  }
  if (state === "not-published") {
    return (
      <p className={styles.notice} role="status">
        La campaña aún no publica información de ingresos y gastos. Abajo está el presupuesto aprobado; las cifras aparecerán cuando
        estén verificadas y su publicación esté autorizada.
      </p>
    );
  }
  return (
    <div className={`${styles.notice} ${styles.alert}`} role="alert">
      <p>
        No pudimos cargar la información en este momento.
        {lastValid ? ` Último dato válido: ${dateTimeLabel(lastValid.asOf)} (versión ${lastValid.version}).` : ""} No mostramos montos
        para no dar datos incorrectos.
      </p>
      <button type="button" className="button button-secondary" onClick={onRetry}>Reintentar</button>
    </div>
  );
}

function Card({ label, value, note }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{usd(value)}</dd>
      <dd className={styles.cardNote}>{note}</dd>
    </div>
  );
}

/** Barra con alternativa textual: el dato siempre está también en el texto. */
function Bar({ label, part, total }) {
  const value = percentOf(part, total);
  const text = `${label}: ${usd(part)} de ${usd(total)} (${value.toLocaleString("es-EC", { maximumFractionDigits: 1 })} %)`;
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
  return (
    <section aria-labelledby="presupuesto-aprobado" className={styles.block}>
      <h2 id="presupuesto-aprobado">Presupuesto aprobado</h2>
      <Table caption={`Meta técnica total de ${usd(approved.goal)} por grupo`} head={["Grupo", "Monto"]}>
        {approved.budgetGroups.map((group) => (
          <tr key={group.title}>
            <th scope="row">{group.title}</th>
            <td className={styles.number}>{usd(group.amount)}</td>
          </tr>
        ))}
        <tr className={styles.totalRow}>
          <th scope="row">Total</th>
          <td className={styles.number}>{usd(approved.goal)}</td>
        </tr>
      </Table>
      <BootcampNote />
    </section>
  );
}

function BootcampNote() {
  return (
    <p className={styles.note}>
      La operación del bootcamp y del Demo Day tiene un presupuesto aparte, pendiente de definir, y no está financiada por esta meta.
    </p>
  );
}

function BudgetSection({ campaign }) {
  const budget = campaign.budget;
  if (!budget) return <ApprovedBudgetFallback />;
  const groups = [...new Set(budget.lines.map((line) => line.group))];
  const milestone = budget.milestones[0];
  return (
    <section aria-labelledby="presupuesto" className={styles.block}>
      <h2 id="presupuesto">Presupuesto general (versión {budget.version})</h2>
      <p className={styles.meta}>
        Recibido = efectivo verificado asignado al rubro. Comprometido y pagado son hechos distintos: un compromiso pagado pasa de una
        columna a la otra y nunca se cuenta dos veces. «En especie» es costo cubierto con bienes aceptados, no efectivo.
      </p>
      <Table
        caption={`Presupuesto general de ${usd(budget.total)}`}
        head={["Rubro", "Presupuesto", "Recibido", "Comprometido", "Pagado", "En especie"]}
      >
        {groups.map((group) => (
          <GroupRows key={group} group={group} lines={budget.lines.filter((line) => line.group === group)} />
        ))}
        <tr className={styles.totalRow}>
          <th scope="row">Total</th>
          <td className={styles.number}>{usd(budget.total)}</td>
          <td className={styles.number}>{usd(sum(budget.lines, "received"))}</td>
          <td className={styles.number}>{usd(sum(budget.lines, "committed"))}</td>
          <td className={styles.number}>{usd(sum(budget.lines, "paid"))}</td>
          <td className={styles.number}>{usd(sum(budget.lines, "inKindSubstituted"))}</td>
        </tr>
      </Table>
      <BootcampNote />

      {milestone && (
        <>
          <h3>Primer hito: {usd(milestone.target)}</h3>
          <p className={styles.meta}>
            Acumulativo: forma parte de la meta total, no es un presupuesto adicional. {milestone.reached ? "Alcanzado." : `Faltan ${usd(milestone.remaining)}.`}
          </p>
          <Bar label="Avance del primer hito" part={milestone.reachedAmount} total={milestone.target} />
          <Table caption={`Asignaciones del primer hito (${usd(milestone.target)})`} head={["Asignación", "Rubro", "Monto"]}>
            {milestone.allocations.map((allocation) => (
              <tr key={`${allocation.lineCode}-${allocation.label}`}>
                <th scope="row">{allocation.label}</th>
                <td>{budget.lines.find((line) => line.code === allocation.lineCode)?.name ?? allocation.lineCode}</td>
                <td className={styles.number}>{usd(allocation.amount)}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <th scope="row" colSpan={2}>Total del hito</th>
              <td className={styles.number}>{usd(sum(milestone.allocations, "amount"))}</td>
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
  return (
    <>
      <tr className={styles.groupRow}>
        <th scope="rowgroup" colSpan={6}>{group}</th>
      </tr>
      {lines.map((line) => (
        <tr key={line.code}>
          <th scope="row">{line.name}</th>
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
  return (
    <section aria-labelledby="ingresos" className={styles.block}>
      <h2 id="ingresos">Ingresos confirmados y disponibilidad</h2>
      <p className={styles.meta}>
        Solo cuentan transferencias verificadas en la cuenta institucional. Los avisos pendientes de revisión, las promesas, la
        financiación solicitada o aprobada que aún no llegó y las transferencias entre cuentas de la asociación no se suman.
      </p>
      <Table caption="Ingresos" head={["Concepto", "Monto"]}>
        <tr><th scope="row">Ingresos brutos verificados</th><td className={styles.number}>{usd(totals.cash.grossIncome)}</td></tr>
        <tr><th scope="row">Devoluciones</th><td className={styles.number}>− {usd(totals.cash.refunds)}</td></tr>
        <tr><th scope="row">Reversos</th><td className={styles.number}>− {usd(totals.cash.reversals)}</td></tr>
        <tr className={styles.totalRow}><th scope="row">Ingreso neto</th><td className={styles.number}>{usd(totals.cash.netReceived)}</td></tr>
      </Table>

      <Table
        caption="Disponibilidad por destino (recibido − pagado − comprometido). El dinero con destino restringido solo se usa en ese destino."
        head={["Destino", "Recibido", "Pagado", "Comprometido", "Disponible"]}
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
        <Table caption="Movimientos verificados por mes (fecha de operación)" head={["Mes", "Ingresos", "Devoluciones", "Reversos", "Neto", "Pagado"]}>
          {months.map((month) => (
            <tr key={month.month}>
              <th scope="row">{monthLabel(month.month)}</th>
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
  return (
    <section aria-labelledby="especie" className={styles.block}>
      <h2 id="especie">Aportes en especie</h2>
      <p className={styles.meta}>
        Bienes y servicios recibidos, revisados y valorados. No son efectivo ni aumentan lo disponible: solo reducen la necesidad
        cuando sustituyen un costo del presupuesto, una sola vez. Las promesas no se cuentan hasta recibirse y aceptarse.
      </p>
      <Table caption="Aportes en especie aceptados" head={["Concepto", "Monto"]}>
        <tr><th scope="row">Valor aceptado y documentado</th><td className={styles.number}>{usd(inKind.acceptedValuation)}</td></tr>
        <tr><th scope="row">Costo del presupuesto sustituido</th><td className={styles.number}>{usd(inKind.substituted)}</td></tr>
        <tr><th scope="row">Valor no aplicado a ningún rubro</th><td className={styles.number}>{usd(inKind.excessValuation)}</td></tr>
      </Table>
    </section>
  );
}

function ExpensesSection({ expenses, lines, filters, onApply, loading }) {
  const formRef = useRef(null);
  const resultsRef = useRef(null);
  if (!expenses) {
    return (
      <section aria-labelledby="gastos" className={styles.block}>
        <h2 id="gastos">Gastos publicados</h2>
        <p className={styles.notice}>El detalle de gastos de esta campaña no está publicado.</p>
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
      <h2 id="gastos">Gastos publicados</h2>
      <p className={styles.meta}>
        Pagos verificados cuya descripción pública fue aprobada. Cada pago muestra su fecha de operación y la fecha en que se publicó.
        Los comprobantes originales y las facturas nunca se publican; cuando existe, se enlaza una copia revisada.
      </p>
      <form ref={formRef} className={styles.filters} onSubmit={submit} aria-label="Filtrar gastos">
        <label>
          Desde
          <input type="date" name="from" defaultValue={filters.from} />
        </label>
        <label>
          Hasta
          <input type="date" name="to" defaultValue={filters.to} />
        </label>
        <label>
          Rubro
          <select name="line" defaultValue={filters.line}>
            <option value="">Todos</option>
            {lines.map((line) => (
              <option key={line.code} value={line.code}>{line.name}</option>
            ))}
          </select>
        </label>
        <div className={styles.filterActions}>
          <button type="submit" className="button button-secondary" disabled={loading}>Aplicar filtros</button>
          {filtered && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                formRef.current?.reset();
                onApply({ from: "", to: "", line: "", page: 1 });
              }}
            >
              Quitar filtros
            </button>
          )}
        </div>
      </form>

      <p ref={resultsRef} tabIndex={-1} className={styles.results} aria-live="polite">
        {expenses.totalItems === 0
          ? filtered
            ? "No hay gastos publicados con estos filtros."
            : "Todavía no hay gastos publicados."
          : `${expenses.totalItems} ${expenses.totalItems === 1 ? "gasto" : "gastos"} · página ${expenses.page} de ${Math.max(1, expenses.totalPages)}`}
      </p>

      {expenses.items.length > 0 && (
        <Table caption="Gastos publicados" head={["Fecha de operación", "Concepto", "Rubro", "Monto", "Estado", "Documentos"]}>
          {expenses.items.map((item) => (
            <tr key={item.id}>
              <td>{dateLabel(item.operationDate)}<small className={styles.cellNote}>Publicado {dateLabel(item.publishedAt)}</small></td>
              <th scope="row">{item.description}</th>
              <td>{item.lines.map((line) => line.name ?? line.code).join(", ") || "—"}</td>
              <td className={styles.number}>{usd(item.amount)}</td>
              <td>{item.status === "reversed" ? "Revertido" : "Pagado"}</td>
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
        <nav className={styles.pagination} aria-label="Páginas de gastos">
          <button type="button" className="button button-secondary" disabled={expenses.page <= 1 || loading} onClick={() => goTo(expenses.page - 1)}>
            Anterior
          </button>
          <span>Página {expenses.page} de {expenses.totalPages}</span>
          <button type="button" className="button button-secondary" disabled={expenses.page >= expenses.totalPages || loading} onClick={() => goTo(expenses.page + 1)}>
            Siguiente
          </button>
        </nav>
      )}
    </section>
  );
}

function DocumentLink({ document }) {
  const href = platformUrl(document.url);
  if (!href) return null;
  const kind = document.mimeType === "application/pdf" ? "PDF" : "imagen";
  return (
    <a className={styles.documentLink} href={href} target="_blank" rel="noopener noreferrer">
      {document.title} <span className={styles.cellNote}>({kind}, {Math.max(1, Math.round(document.sizeBytes / 1024))} KB; abre en una pestaña nueva)</span>
    </a>
  );
}

function DocumentsSection({ documents }) {
  return (
    <section aria-labelledby="avances" className={styles.block}>
      <h2 id="avances">Avances y documentos públicos</h2>
      {!documents ? (
        <p className={styles.notice}>Los documentos públicos de esta campaña no están publicados.</p>
      ) : documents.length === 0 ? (
        <p className={styles.notice}>Todavía no hay informes ni documentos públicos.</p>
      ) : (
        <ul className={styles.documents}>
          {documents.map((document) => (
            <li key={document.id}>
              <DocumentLink document={document} />
              {document.description && <p>{document.description}</p>}
              <small className={styles.cellNote}>Publicado {dateLabel(document.publishedAt)}</small>
            </li>
          ))}
        </ul>
      )}
      <p className={styles.meta}>
        Los documentos son copias revisadas y redactadas por la asociación. ¿Quieres apoyar? <Link href="/alianzas">Apoya y colabora</Link>.
      </p>
    </section>
  );
}

function Table({ caption, head, children }) {
  return (
    <div className={styles.tableWrap} role="region" aria-label={caption} tabIndex={0}>
      <table className={styles.table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((label, index) => (
              <th key={label} scope="col" className={index > 0 && /Monto|Presupuesto|Recibido|Comprometido|Pagado|especie|Ingresos|Devoluciones|Reversos|Neto|Disponible/.test(label) ? styles.number : undefined}>
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
