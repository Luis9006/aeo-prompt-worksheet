import { useState } from "react";

const COLORS = {
  orange: "#FF7A59",
  teal: "#00BDA5",
  navy: "#1C3A56",
  slate: "#516F90",
  light: "#F5F8FA",
  border: "#DFE3EB",
  text: "#33475B",
  purple: "#6B4FA0",
};

const etapas = [
  {
    id: "descubrimiento",
    label: "Descubrimiento",
    color: COLORS.teal,
    desc: "Alguien que recién aprende sobre el tema. Preguntas amplias y conceptuales.",
    ejemplos: ["¿Qué es...?", "¿Por qué importa...?", "¿Cuáles son los tipos de...?"],
  },
  {
    id: "evaluacion",
    label: "Evaluación",
    color: COLORS.orange,
    desc: "Alguien que ya conoce el tema y está comparando opciones.",
    ejemplos: ["¿Cuál es la diferencia entre...?", "¿Qué herramienta es mejor para...?", "¿Cómo comparar...?"],
  },
  {
    id: "decision",
    label: "Decisión",
    color: COLORS.purple,
    desc: "Alguien listo para actuar o implementar.",
    ejemplos: ["¿Cómo implementar...?", "Ayúdame a crear...", "¿Cuáles son los pasos para...?"],
  },
];

const nivelesImpacto = ["Alto — tema clave para mi negocio y no aparezco", "Medio — tema relevante con presencia parcial", "Bajo — tema secundario o ya cubierto bien"];

function generateHTML(data) {
  const fecha = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

  const promptsHTML = etapas.map(etapa => {
    const prompts = data.prompts[etapa.id] || [];
    const hallazgos = data.hallazgos[etapa.id] || [];
    if (prompts.filter(p => p.trim()).length === 0) return "";

    return `
      <div style="margin-bottom:24px;">
        <div style="background:${etapa.color};color:white;padding:8px 16px;border-radius:6px 6px 0 0;font-weight:700;font-size:13px;">Etapa: ${etapa.label}</div>
        <div style="border:1px solid #DFE3EB;border-top:none;border-radius:0 0 6px 6px;overflow:hidden;">
          ${prompts.filter(p => p.trim()).map((p, i) => {
            const h = hallazgos[i] || {};
            return `
              <div style="padding:14px 16px;border-bottom:1px solid #F5F8FA;">
                <div style="font-weight:700;font-size:13px;color:#1C3A56;margin-bottom:8px;">Prompt ${i + 1}: ${p}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;">
                  <div style="background:#F5F8FA;padding:8px 10px;border-radius:5px;">
                    <div style="color:#516F90;font-weight:600;margin-bottom:3px;">¿Aparece mi marca?</div>
                    <div style="color:#1C3A56;font-weight:700;">${h.aparece || "—"}</div>
                  </div>
                  <div style="background:#F5F8FA;padding:8px 10px;border-radius:5px;">
                    <div style="color:#516F90;font-weight:600;margin-bottom:3px;">Fuentes citadas</div>
                    <div style="color:#1C3A56;">${h.fuentes || "—"}</div>
                  </div>
                  <div style="background:#F5F8FA;padding:8px 10px;border-radius:5px;grid-column:span 2;">
                    <div style="color:#516F90;font-weight:600;margin-bottom:3px;">Brecha identificada</div>
                    <div style="color:#1C3A56;">${h.brecha || "—"}</div>
                  </div>
                </div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }).join("");

  const prioridadesHTML = (data.prioridades || []).filter(p => p.prompt.trim()).map((p, i) => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #F5F8FA;align-items:flex-start;">
      <div style="background:#FF7A59;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0;">${i + 1}</div>
      <div>
        <div style="font-weight:700;font-size:14px;color:#1C3A56;">${p.prompt}</div>
        <div style="font-size:12px;color:#516F90;margin-top:3px;">Etapa: ${etapas.find(e => e.id === p.etapa)?.label || p.etapa} · Impacto: ${p.impacto || "—"}</div>
        ${p.accion ? `<div style="font-size:12px;color:#33475B;margin-top:4px;">Acción: ${p.accion}</div>` : ""}
      </div>
    </div>`).join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Investigación de Prompts AEO — ${data.marca}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#F5F8FA;padding:32px 24px;color:#33475B;}
  .page{max-width:800px;margin:0 auto;}
  .header{background:#1C3A56;border-radius:12px 12px 0 0;padding:28px 32px;display:flex;justify-content:space-between;align-items:center;}
  .header-title{color:white;font-size:20px;font-weight:800;}
  .header-sub{color:rgba(255,255,255,0.65);font-size:13px;margin-top:4px;}
  .badge{background:#FF7A59;color:white;font-size:10px;font-weight:800;letter-spacing:1px;padding:6px 12px;border-radius:6px;white-space:nowrap;}
  .body{background:white;border-radius:0 0 12px 12px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.08);}
  .section{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #F5F8FA;}
  .section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
  .section-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:#FF7A59;margin-bottom:12px;}
  .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .info-item{background:#F5F8FA;border-radius:7px;padding:11px 14px;}
  .info-label{font-size:11px;color:#516F90;font-weight:600;margin-bottom:3px;}
  .info-value{font-size:14px;color:#1C3A56;font-weight:700;}
  .reminder{background:#F0FDF4;border-radius:8px;padding:14px 18px;margin-top:24px;}
  .reminder-title{font-size:11px;font-weight:800;color:#00BDA5;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;}
  .reminder-text{font-size:13px;color:#516F90;line-height:1.7;}
  .footer{margin-top:20px;display:flex;justify-content:space-between;font-size:11px;color:#516F90;padding-top:16px;border-top:1px solid #DFE3EB;}
  @media print{body{background:white;padding:0;}.body{box-shadow:none;}}
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div>
      <div class="header-title">Investigación de Prompts para AEO</div>
      <div class="header-sub">${data.marca} · Tema: ${data.tema} · ${fecha}</div>
    </div>
    <div class="badge">HUBSPOT ACADEMY</div>
  </div>
  <div class="body">
    <div class="section">
      <div class="section-label">Perfil de investigación</div>
      <div class="info-grid">
        <div class="info-item"><div class="info-label">Marca o empresa</div><div class="info-value">${data.marca}</div></div>
        <div class="info-item"><div class="info-label">Industria</div><div class="info-value">${data.industria}</div></div>
        <div class="info-item"><div class="info-label">Tema central</div><div class="info-value">${data.tema}</div></div>
      </div>
    </div>
    <div class="section">
      <div class="section-label">Prompts investigados y hallazgos</div>
      ${promptsHTML || "<p style='color:#516F90;font-size:13px;'>No se registraron prompts.</p>"}
    </div>
    ${prioridadesHTML ? `
    <div class="section">
      <div class="section-label">Prompts priorizados</div>
      ${prioridadesHTML}
    </div>` : ""}
    <div class="reminder">
      <div class="reminder-title">Próximo paso</div>
      <div class="reminder-text">Usa esta investigación como base para tu plan de contenido. Empieza por los prompts de alto impacto donde tu marca no aparece — ahí es donde crear contenido nuevo tendrá mayor efecto en tu visibilidad en motores de respuesta con IA.</div>
    </div>
    <div class="footer">
      <span>HubSpot Academy · Certificación en optimización para motores de respuesta (AEO)</span>
      <span>${fecha}</span>
    </div>
  </div>
</div>
</body>
</html>`;
}

export default function App() {
  const [phase, setPhase] = useState("before");
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    marca: "", industria: "", tema: "",
    prompts: { descubrimiento: ["", "", ""], evaluacion: ["", "", ""], decision: ["", "", ""] },
    hallazgos: { descubrimiento: [{}, {}, {}], evaluacion: [{}, {}, {}], decision: [{}, {}, {}] },
    prioridades: [
      { prompt: "", etapa: "", impacto: "", accion: "" },
      { prompt: "", etapa: "", impacto: "", accion: "" },
      { prompt: "", etapa: "", impacto: "", accion: "" },
    ],
  });

  const update = (field, val) => setData(p => ({ ...p, [field]: val }));
  const updatePrompt = (etapa, idx, val) => setData(p => ({
    ...p,
    prompts: { ...p.prompts, [etapa]: p.prompts[etapa].map((v, i) => i === idx ? val : v) },
  }));
  const updateHallazgo = (etapa, idx, field, val) => setData(p => ({
    ...p,
    hallazgos: {
      ...p.hallazgos,
      [etapa]: p.hallazgos[etapa].map((h, i) => i === idx ? { ...h, [field]: val } : h),
    },
  }));
  const updatePrioridad = (idx, field, val) => setData(p => ({
    ...p,
    prioridades: p.prioridades.map((pr, i) => i === idx ? { ...pr, [field]: val } : pr),
  }));

  const totalPrompts = Object.values(data.prompts).flat().filter(p => p.trim()).length;
  const canContinueBefore = data.marca && data.industria && data.tema && totalPrompts >= 3;
  const canFinish = data.prioridades[0].prompt.trim().length > 0;

  const downloadHTML = () => {
    const html = generateHTML(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `investigacion-prompts-aeo-${data.marca.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setPhase("before"); setStep(0);
    setData({
      marca: "", industria: "", tema: "",
      prompts: { descubrimiento: ["", "", ""], evaluacion: ["", "", ""], decision: ["", "", ""] },
      hallazgos: { descubrimiento: [{}, {}, {}], evaluacion: [{}, {}, {}], decision: [{}, {}, {}] },
      prioridades: [{ prompt: "", etapa: "", impacto: "", accion: "" }, { prompt: "", etapa: "", impacto: "", accion: "" }, { prompt: "", etapa: "", impacto: "", accion: "" }],
    });
  };

  const beforeSteps = ["Tu perfil", "Tus prompts"];
  const afterSteps = ["Hallazgos", "Prioridades"];

  if (phase === "done") return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: COLORS.light, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%", background: "white", borderRadius: 16, padding: 40, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎯</div>
        <h2 style={{ color: COLORS.navy, margin: "0 0 12px", fontSize: 22 }}>Investigación completa</h2>
        <p style={{ color: COLORS.slate, lineHeight: 1.7, margin: "0 0 24px", fontSize: 14 }}>
          Identificaste los prompts que los motores de IA responden en tu industria, documentaste tus hallazgos y priorizaste dónde crear contenido nuevo. Descarga tu investigación para usarla como base de tu plan de contenido.
        </p>
        <div style={{ background: COLORS.light, borderRadius: 10, padding: "14px 18px", marginBottom: 20, textAlign: "left" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.orange, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Resumen</div>
          <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 2 }}>
            <div>🏢 <strong>Marca:</strong> {data.marca}</div>
            <div>📌 <strong>Tema central:</strong> {data.tema}</div>
            <div>🔍 <strong>Prompts investigados:</strong> {totalPrompts}</div>
            <div>⚡ <strong>Prompts priorizados:</strong> {data.prioridades.filter(p => p.prompt.trim()).length}</div>
          </div>
        </div>
        <div style={{ background: "#F0FDF4", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: COLORS.slate, lineHeight: 1.6, textAlign: "left" }}>
          <strong style={{ color: COLORS.teal }}>Próximo paso:</strong> Usa los prompts priorizados como punto de partida para tu plan de contenido AEO. Empieza por los de alto impacto donde tu marca aún no aparece.
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={downloadHTML} style={{ background: COLORS.teal, color: "white", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            ⬇️ Descargar investigación
          </button>
          <button onClick={reset} style={{ background: COLORS.light, color: COLORS.slate, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 28px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Nueva investigación
          </button>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: COLORS.slate, textAlign: "center" }}>
          Se descarga como HTML — ábrelo en tu navegador e imprímelo como PDF.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: COLORS.light }}>
      <div style={{ background: COLORS.navy, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: COLORS.orange, borderRadius: 6, padding: "4px 10px" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 11, letterSpacing: 0.5 }}>HUBSPOT ACADEMY</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "white" }}>Investigación de Prompts para AEO</span>
        </div>
        <div style={{ background: phase === "before" ? COLORS.orange : COLORS.teal, color: "white", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>
          {phase === "before" ? "📋 Antes" : "🔍 Después"}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px" }}>

        {phase === "before" && (
          <>
            <div style={{ background: "#F0F7FF", borderRadius: 10, padding: "14px 18px", marginBottom: 20, fontSize: 14, color: COLORS.navy, lineHeight: 1.6 }}>
              <strong>Momento 1 — Antes de la investigación.</strong> Completa tu perfil y prepara los prompts que vas a probar en los motores de IA. Luego abre ChatGPT, Gemini o Perplexity y prueba cada prompt. Regresa aquí para registrar tus hallazgos.
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
              {beforeSteps.map((s, i) => (
                <div key={s} style={{ flex: 1 }}>
                  <div style={{ height: 4, borderRadius: 99, background: i <= step ? COLORS.orange : COLORS.border }} />
                  <div style={{ fontSize: 10, color: i <= step ? COLORS.orange : COLORS.slate, fontWeight: i === step ? 700 : 400, marginTop: 4, textAlign: "center" }}>{s}</div>
                </div>
              ))}
            </div>

            {step === 0 && (
              <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Tu perfil de investigación</h2>
                <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 22px", lineHeight: 1.6 }}>
                  Define el contexto de tu investigación. Cuanto más específico seas con el tema central, más útiles serán los prompts que generes.
                </p>
                {[
                  { field: "marca", label: "Nombre de tu marca o empresa *", placeholder: "ej: HubSpot, Mi Startup, Agencia XYZ" },
                  { field: "industria", label: "Industria *", placeholder: "ej: Software B2B, E-commerce, Salud" },
                  { field: "tema", label: "Tema central de esta investigación *", placeholder: "ej: gestión de proyectos, marketing de contenidos, incorporación de clientes" },
                ].map(f => (
                  <div key={f.field} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input value={data[f.field]} onChange={e => update(f.field, e.target.value)} placeholder={f.placeholder}
                      style={{ width: "100%", padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 7, fontSize: 14, color: COLORS.text, boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Prepara tus prompts</h2>
                <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 6px", lineHeight: 1.6 }}>
                  Escribe al menos un prompt por etapa del recorrido del cliente. Redáctalos como los formularía una persona real — en lenguaje natural, con contexto.
                </p>
                <div style={{ background: COLORS.light, borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: COLORS.slate }}>
                  💡 Escribe al menos <strong>3 prompts en total</strong> para continuar. Cuando termines, pruébalos en ChatGPT, Gemini o Perplexity — la idea es aparecer en todos — y regresa aquí para registrar los resultados.
                </div>
                {etapas.map(etapa => (
                  <div key={etapa.id} style={{ marginBottom: 22 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: etapa.color }} />
                      <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy }}>{etapa.label}</span>
                      <span style={{ fontSize: 12, color: COLORS.slate }}>— {etapa.desc}</span>
                    </div>
                    <div style={{ background: COLORS.light, borderRadius: 7, padding: "8px 12px", marginBottom: 8, fontSize: 12, color: COLORS.slate }}>
                      Ejemplos: {etapa.ejemplos.join(" · ")}
                    </div>
                    {[0, 1, 2].map(idx => (
                      <input key={idx} value={data.prompts[etapa.id][idx]} onChange={e => updatePrompt(etapa.id, idx, e.target.value)}
                        placeholder={`Prompt ${idx + 1} de ${etapa.label.toLowerCase()}...`}
                        style={{ width: "100%", padding: "9px 12px", border: `1px solid ${data.prompts[etapa.id][idx].trim() ? etapa.color : COLORS.border}`, borderRadius: 7, fontSize: 13, color: COLORS.text, boxSizing: "border-box", marginBottom: 8 }} />
                    ))}
                  </div>
                ))}
                <div style={{ fontSize: 12, color: totalPrompts >= 3 ? COLORS.teal : COLORS.slate, marginTop: 4 }}>
                  {totalPrompts >= 3 ? `✓ ${totalPrompts} prompts listos para investigar` : `${totalPrompts}/3 prompts mínimos requeridos`}
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)} style={{ padding: "10px 20px", background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 7, color: COLORS.slate, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  ← Anterior
                </button>
              ) : <div />}
              {step < beforeSteps.length - 1 ? (
                <button onClick={() => setStep(s => s + 1)} disabled={!data.marca || !data.industria || !data.tema}
                  style={{ padding: "11px 28px", background: data.marca && data.industria && data.tema ? COLORS.orange : COLORS.border, border: "none", borderRadius: 7, color: data.marca && data.industria && data.tema ? "white" : COLORS.slate, fontWeight: 700, fontSize: 14, cursor: data.marca && data.industria && data.tema ? "pointer" : "not-allowed" }}>
                  Siguiente →
                </button>
              ) : (
                <button onClick={() => { setPhase("after"); setStep(0); }} disabled={!canContinueBefore}
                  style={{ padding: "11px 28px", background: canContinueBefore ? COLORS.teal : COLORS.border, border: "none", borderRadius: 7, color: canContinueBefore ? "white" : COLORS.slate, fontWeight: 700, fontSize: 14, cursor: canContinueBefore ? "pointer" : "not-allowed" }}>
                  {canContinueBefore ? "Ya probé los prompts →" : `Necesitas ${Math.max(0, 3 - totalPrompts)} prompts más`}
                </button>
              )}
            </div>
          </>
        )}

        {phase === "after" && (
          <>
            <div style={{ background: "#F0FDF4", borderRadius: 10, padding: "14px 18px", marginBottom: 20, fontSize: 14, color: COLORS.navy, lineHeight: 1.6 }}>
              <strong>Momento 2 — Después de la investigación.</strong> Registra lo que encontraste en los motores de IA y define tus prioridades de contenido.
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
              {afterSteps.map((s, i) => (
                <div key={s} style={{ flex: 1 }}>
                  <div style={{ height: 4, borderRadius: 99, background: i <= step ? COLORS.teal : COLORS.border }} />
                  <div style={{ fontSize: 10, color: i <= step ? COLORS.teal : COLORS.slate, fontWeight: i === step ? 700 : 400, marginTop: 4, textAlign: "center" }}>{s}</div>
                </div>
              ))}
            </div>

            {step === 0 && (
              <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Registra tus hallazgos</h2>
                <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 6px", lineHeight: 1.6 }}>
                  Para cada prompt que probaste, registra qué respondió el motor de IA.
                </p>
                <div style={{ background: COLORS.light, borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: COLORS.slate }}>
                  💡 Presta atención a: si tu marca aparece, qué competidores cita la IA, y qué brecha de contenido revela cada respuesta.
                </div>
                {etapas.map(etapa => {
                  const prompts = data.prompts[etapa.id].filter(p => p.trim());
                  if (prompts.length === 0) return null;
                  return (
                    <div key={etapa.id} style={{ marginBottom: 24 }}>
                      <div style={{ background: etapa.color, color: "white", padding: "8px 16px", borderRadius: "8px 8px 0 0", fontWeight: 700, fontSize: 13 }}>{etapa.label}</div>
                      <div style={{ border: `1px solid ${COLORS.border}`, borderTop: "none", borderRadius: "0 0 8px 8px" }}>
                        {prompts.map((prompt, idx) => (
                          <div key={idx} style={{ padding: "14px 16px", borderBottom: idx < prompts.length - 1 ? `1px solid ${COLORS.light}` : "none" }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.navy, marginBottom: 10 }}>"{prompt}"</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 4 }}>¿Aparece tu marca?</label>
                                <div style={{ display: "flex", gap: 6 }}>
                                  {["Sí", "No", "Parcialmente"].map(op => (
                                    <button key={op} onClick={() => updateHallazgo(etapa.id, idx, "aparece", op)}
                                      style={{ padding: "5px 10px", borderRadius: 5, border: `1.5px solid ${data.hallazgos[etapa.id][idx]?.aparece === op ? etapa.color : COLORS.border}`, background: data.hallazgos[etapa.id][idx]?.aparece === op ? etapa.color : "white", color: data.hallazgos[etapa.id][idx]?.aparece === op ? "white" : COLORS.slate, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                                      {op}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 4 }}>Fuentes o marcas citadas</label>
                                <input value={data.hallazgos[etapa.id][idx]?.fuentes || ""} onChange={e => updateHallazgo(etapa.id, idx, "fuentes", e.target.value)}
                                  placeholder="ej: HubSpot, Forbes, competidor X..."
                                  style={{ width: "100%", padding: "6px 10px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12, color: COLORS.text, boxSizing: "border-box" }} />
                              </div>
                              <div style={{ gridColumn: "span 2" }}>
                                <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 4 }}>Brecha identificada</label>
                                <input value={data.hallazgos[etapa.id][idx]?.brecha || ""} onChange={e => updateHallazgo(etapa.id, idx, "brecha", e.target.value)}
                                  placeholder="¿Qué contenido falta o podría mejorar para aparecer en esta respuesta?"
                                  style={{ width: "100%", padding: "6px 10px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12, color: COLORS.text, boxSizing: "border-box" }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Prioriza tus prompts</h2>
                <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 6px", lineHeight: 1.6 }}>
                  Selecciona los tres prompts más importantes para tu estrategia. Prioriza donde tu marca no aparece pero el tema es clave.
                </p>
                <div style={{ background: COLORS.light, borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: COLORS.slate }}>
                  💡 Los prompts de alto impacto donde tu marca no aparece son tu mayor oportunidad.
                </div>
                {data.prioridades.map((pr, i) => (
                  <div key={i} style={{ background: i === 0 ? "#FFF5F2" : COLORS.light, border: `1.5px solid ${i === 0 ? COLORS.orange : COLORS.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <div style={{ background: i === 0 ? COLORS.orange : COLORS.slate, color: "white", width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>{i + 1}</div>
                      <span style={{ fontWeight: 700, fontSize: 14, color: i === 0 ? COLORS.orange : COLORS.slate }}>
                        {i === 0 ? "Prioridad crítica" : i === 1 ? "Segunda prioridad" : "Tercera prioridad"}
                      </span>
                    </div>
                    {[
                      { field: "prompt", label: "Prompt seleccionado *", placeholder: "Copia el prompt que priorizas aquí..." },
                      { field: "accion", label: "Acción de contenido concreta", placeholder: "ej: Crear artículo de blog sobre..., Actualizar página de..." },
                    ].map(f => (
                      <div key={f.field} style={{ marginBottom: 10 }}>
                        <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 4 }}>{f.label}</label>
                        <input value={pr[f.field]} onChange={e => updatePrioridad(i, f.field, e.target.value)} placeholder={f.placeholder}
                          style={{ width: "100%", padding: "8px 11px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, color: COLORS.text, boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 4 }}>Etapa del recorrido</label>
                        <select value={pr.etapa} onChange={e => updatePrioridad(i, "etapa", e.target.value)}
                          style={{ width: "100%", padding: "8px 11px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, color: COLORS.text, background: "white" }}>
                          <option value="">Selecciona...</option>
                          {etapas.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 4 }}>Nivel de impacto</label>
                        <select value={pr.impacto} onChange={e => updatePrioridad(i, "impacto", e.target.value)}
                          style={{ width: "100%", padding: "8px 11px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, color: COLORS.text, background: "white" }}>
                          <option value="">Selecciona...</option>
                          {nivelesImpacto.map(n => <option key={n} value={n}>{n.split(" — ")[0]}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <button onClick={() => step === 0 ? setPhase("before") : setStep(s => s - 1)}
                style={{ padding: "10px 20px", background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 7, color: COLORS.slate, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                ← Anterior
              </button>
              {step < afterSteps.length - 1 ? (
                <button onClick={() => setStep(s => s + 1)}
                  style={{ padding: "11px 28px", background: COLORS.teal, border: "none", borderRadius: 7, color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  Siguiente →
                </button>
              ) : (
                <button onClick={() => setPhase("done")} disabled={!canFinish}
                  style={{ padding: "11px 28px", background: canFinish ? COLORS.orange : COLORS.border, border: "none", borderRadius: 7, color: canFinish ? "white" : COLORS.slate, fontWeight: 700, fontSize: 14, cursor: canFinish ? "pointer" : "not-allowed" }}>
                  Ver mi investigación →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
