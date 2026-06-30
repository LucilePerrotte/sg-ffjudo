import { useState, useEffect } from "react";

const SUPABASE_URL = "https://gubzyphacaeriuxifkqy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Ynp5cGhhY2Flcml1eGlma3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTY0NDYsImV4cCI6MjA5ODM3MjQ0Nn0.xvGZl2rrAJpk__jWni8i43-gNQrieadmk68qUy8OTEI";

const db = {
  async get(table, filters = {}) {
    let url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
    Object.entries(filters).forEach(([k, v]) => { url += `&${k}=eq.${v}`; });
    const r = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
    return r.json();
  },
  async insert(table, data) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(data),
    });
    return r.json();
  },
  async update(table, id, data) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(data),
    });
    return r.json();
  },
};

const COLORS = {
  primary: "#003087", accent: "#E8001D", light: "#f0f4ff", border: "#dde3f0",
  text: "#1a1a2e", muted: "#6b7280", success: "#16a34a", warning: "#d97706",
  danger: "#dc2626", white: "#ffffff",
};

// NOTE: l'authentification utilise désormais Supabase (table utilisateurs).
// Mot de passe temporaire commun pour tous les utilisateurs normaux : "2026"
// Lucile et Michael ont des mots de passe dédiés.
const PASSWORDS_SPECIAUX = {
  "lucile.perrotte@ffjudo.com": "sg2025",
  "michael.argot@ffjudo.com": "tech2025",
};
const PASSWORD_DEFAUT = "2026";

const EVENEMENTS_CATALOGUE = [
  "Séminaire direction", "Conférence de presse", "Formation arbitres",
  "Assemblée générale", "Tournoi régional", "Réunion de bureau",
  "Événement partenaire", "Stage technique", "Autre",
];

const Badge = ({ label, color }) => {
  const c = { success: ["#dcfce7","#16a34a"], warning: ["#fef9c3","#b45309"], danger: ["#fee2e2","#dc2626"], info: ["#dbeafe","#1d4ed8"], muted: ["#f3f4f6","#6b7280"], orange: ["#ffedd5","#c2410c"] }[color] || ["#f3f4f6","#6b7280"];
  return <span style={{ background: c[0], color: c[1], padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{label}</span>;
};
const sBadge = (s) => {
  if (["Validée","Terminée","Bon","Rendue"].includes(s)) return <Badge label={s} color="success" />;
  if (["En attente","Planifiée"].includes(s)) return <Badge label={s} color="info" />;
  if (["Refusée","Annulée","Hors service"].includes(s)) return <Badge label={s} color="danger" />;
  if (["En cours","En maintenance","À surveiller","Reportée","En attente de pièces"].includes(s)) return <Badge label={s} color="orange" />;
  return <Badge label={s} color="muted" />;
};
const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: 20, ...style }}>{children}</div>
);
const inp = { width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff" };
const btnP = { background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14 };
const btnG = { background: "#e5e7eb", color: "#374151", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14 };
const btnS = { background: COLORS.success, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 13 };
const btnD = { background: COLORS.danger, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 13 };
const fmtDate = (dt) => { if (!dt) return ""; const [d, t] = dt.split("T"); return t ? `${d} à ${t}` : d; };
const LOGO_URL = "/logo-france-judo.png";

// ─── LOGIN ────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr(""); setLoading(true);
    try {
      const users = await db.get("utilisateurs", { email });
      const u = (users || [])[0];
      if (!u) { setErr("Email ou mot de passe incorrect."); setLoading(false); return; }
      const attendu = PASSWORDS_SPECIAUX[u.email.toLowerCase()] || PASSWORD_DEFAUT;
      if (password !== attendu) { setErr("Email ou mot de passe incorrect."); setLoading(false); return; }
      onLogin(u);
    } catch(e) {
      console.error(e);
      setErr("Erreur de connexion. Réessayez.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.primary} 0%, #001a4d 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 40, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 16, width: 120, height: 72, marginBottom: 12, padding: 8 }}>
            <img src={LOGO_URL} alt="France Judo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.primary }}>Services Généraux</div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>France Judo</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Adresse email</label>
          <input style={inp} type="email" placeholder="prenom.nom@ffjudo.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Mot de passe</label>
          <input style={inp} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>
        {err && <div style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>⚠️ {err}</div>}
        <button style={{ ...btnP, width: "100%", padding: "12px", fontSize: 15, opacity: loading ? 0.7 : 1 }} onClick={submit} disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>
        <div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: COLORS.muted }}>🔒 Connexion Microsoft SSO à venir</div>
      </div>
    </div>
  );
};

// ─── MODAL VALIDATION ─────────────────────────────────────────────────────
const ModalValidation = ({ reservation, action, onConfirm, onClose }) => {
  const [comment, setComment] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 460, boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 8px", color: action === "valider" ? COLORS.success : COLORS.danger, fontSize: 18 }}>
          {action === "valider" ? "✓ Valider la réservation" : "✗ Refuser la réservation"}
        </h3>
        <p style={{ fontSize: 14, color: COLORS.muted, margin: "0 0 16px" }}><strong>{reservation.evenement}</strong> — {reservation.demandeur}</p>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{action === "valider" ? "Commentaire (ex : lieu de récupération)" : "Motif du refus *"}</label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} style={{ ...inp, marginTop: 6, minHeight: 90, resize: "vertical" }}
          placeholder={action === "valider" ? "Ex : Récupération à l'accueil RDC." : "Ex : Matériel déjà réservé."} />
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={action === "valider" ? btnS : btnD} onClick={() => onConfirm(comment)}>
            {action === "valider" ? "Confirmer la validation" : "Confirmer le refus"}
          </button>
          <button style={btnG} onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

// ─── FORMULAIRE RÉSERVATION ───────────────────────────────────────────────
const FormulaireReservation = ({ currentUser, materiel, onSubmit, onClose }) => {
  const [evenement, setEvenement] = useState("");
  const [autreEvt, setAutreEvt] = useState("");
  const [site, setSite] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [emailContact, setEmailContact] = useState(currentUser.email || "");
  const [telContact, setTelContact] = useState("");
  const [selection, setSelection] = useState({});
  const [catOuverte, setCatOuverte] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const evtFinal = evenement === "Autre" ? autreEvt : evenement;
  const setQte = (id, val, maxDisponible) => {
    const n = Math.max(0, Math.min(parseInt(val) || 0, maxDisponible));
    if (n === 0) { const s = { ...selection }; delete s[id]; setSelection(s); }
    else setSelection({ ...selection, [id]: n });
  };
  const lignes = Object.entries(selection).map(([id, qte]) => {
    const mat = Object.values(materiel).flat().find(m => m.id === parseInt(id));
    return { nom: mat?.nom, qte, materielId: parseInt(id) };
  }).filter(l => l.qte > 0 && l.nom);
  const valid = evtFinal && dateDebut && dateFin && lignes.length > 0;

  const handleSubmit = async () => {
    if (!valid) return;
    if (new Date(dateFin) <= new Date(dateDebut)) {
      setError("La date de retour doit être après la date de sortie.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const fraisMateriel = await db.get("materiel");
      for (const l of lignes) {
        const m = (fraisMateriel || []).find(x => x.id === l.materielId);
        if (!m || m.disponible < l.qte) {
          setError(`Stock insuffisant pour "${l.nom}" (${m?.disponible || 0} disponible(s)).`);
          setSaving(false);
          return;
        }
      }
      const res = await db.insert("reservations", {
        demandeur: currentUser.nom,
        user_id: currentUser.id,
        evenement: evtFinal,
        site,
        date_debut: dateDebut,
        date_fin: dateFin,
        statut: "En attente",
        commentaire: "",
        email: emailContact,
        tel: telContact,
      });
      if (res && res[0]) {
        const resId = res[0].id;
        for (const l of lignes) {
          await db.insert("lignes_reservation", { reservation_id: resId, materiel_nom: l.nom, quantite: l.qte });
        }
        onSubmit({ ...res[0], lignes });
      }
    } catch(e) { console.error(e); setError("Une erreur est survenue."); }
    setSaving(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 20px", color: COLORS.primary }}>Nouvelle demande de réservation</h3>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Événement / motif *</label>
          <select style={{ ...inp, marginTop: 4 }} value={evenement} onChange={e => setEvenement(e.target.value)}>
            <option value="">Choisir un événement…</option>
            {EVENEMENTS_CATALOGUE.map(e => <option key={e}>{e}</option>)}
          </select>
          {evenement === "Autre" && <input style={{ ...inp, marginTop: 8 }} placeholder="Préciser…" value={autreEvt} onChange={e => setAutreEvt(e.target.value)} />}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Email de contact</label>
            <input type="email" style={{ ...inp, marginTop: 4 }} placeholder="votre.email@ffjudo.com" value={emailContact} onChange={e => setEmailContact(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Téléphone de contact</label>
            <input type="tel" style={{ ...inp, marginTop: 4 }} placeholder="06 XX XX XX XX" value={telContact} onChange={e => setTelContact(e.target.value)} />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Site</label>
          <select style={{ ...inp, marginTop: 4 }} value={site} onChange={e => setSite(e.target.value)}>
            <option value="">Choisir un site…</option>
            <option>Bât. A – Bureaux</option><option>Bât. B – Awazu</option><option>Bât. C - Dojo de Paris</option><option>Grand Dôme</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Date et heure de sortie *</label>
            <input type="datetime-local" style={{ ...inp, marginTop: 4 }} value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Date et heure de retour *</label>
            <input type="datetime-local" style={{ ...inp, marginTop: 4 }} value={dateFin} onChange={e => setDateFin(e.target.value)} />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Matériel demandé *</label>
          <div style={{ marginTop: 8, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
            {Object.entries(materiel).map(([cat, items]) => (
              <div key={cat}>
                <button onClick={() => setCatOuverte(catOuverte === cat ? null : cat)}
                  style={{ width: "100%", padding: "11px 14px", background: catOuverte === cat ? COLORS.light : "#fafafa", border: "none", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer", textAlign: "left", fontWeight: 600, fontSize: 13, display: "flex", justifyContent: "space-between" }}>
                  <span>{cat}</span>
                  <span style={{ fontSize: 11, color: COLORS.muted }}>{items.some(i => selection[i.id]) ? `${items.filter(i => selection[i.id]).length} sélectionné(s) · ` : ""}{catOuverte === cat ? "▲" : "▼"}</span>
                </button>
                {catOuverte === cat && items.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", padding: "10px 14px", gap: 12, borderBottom: `1px solid ${COLORS.border}`, background: selection[item.id] ? "#f0fdf4" : "#fff" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{item.nom}</div>
                      <div style={{ fontSize: 12, color: item.disponible > 0 ? COLORS.success : COLORS.danger }}>{item.disponible} disponible(s) / {item.qte} au total</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button onClick={() => setQte(item.id, (selection[item.id] || 0) - 1, item.disponible)} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16 }}>−</button>
                      <span style={{ width: 32, textAlign: "center", fontWeight: 700, color: selection[item.id] ? COLORS.primary : COLORS.muted }}>{selection[item.id] || 0}</span>
                      <button onClick={() => setQte(item.id, (selection[item.id] || 0) + 1, item.disponible)} disabled={(selection[item.id] || 0) >= item.disponible}
                        style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16, opacity: (selection[item.id] || 0) >= item.disponible ? 0.35 : 1 }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {lignes.length > 0 && (
          <div style={{ background: COLORS.light, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 600, marginBottom: 4, color: COLORS.primary }}>Récapitulatif :</div>
            {lignes.map((l, i) => <div key={i}>• {l.nom} × {l.qte}</div>)}
          </div>
        )}
        {error && <div style={{ background: "#fee2e2", color: COLORS.danger, borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>⚠️ {error}</div>}
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...btnP, opacity: (valid && !saving) ? 1 : 0.5 }} disabled={!valid || saving} onClick={handleSubmit}>
            {saving ? "Envoi…" : "Envoyer la demande"}
          </button>
          <button style={btnG} onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

// ─── CALENDRIER HEBDOMADAIRE ──────────────────────────────────────────────
const JOURS_SEMAINE = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const getDebutSemaine = (date) => {
  const d = new Date(date);
  const jour = d.getDay();
  const diff = jour === 0 ? -6 : 1 - jour;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const CalendrierHebdo = ({ reservations, maintenances }) => {
  const [semaineOffset, setSemaineOffset] = useState(0);
  const debutSemaine = getDebutSemaine(new Date());
  debutSemaine.setDate(debutSemaine.getDate() + semaineOffset * 7);
  const jours = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(debutSemaine);
    d.setDate(d.getDate() + i);
    return d;
  });

  const evenementsParJour = (jour) => {
    const jourStr = jour.toISOString().split("T")[0];
    const sorties = reservations.filter(r => (r.dateDebut || r.date_debut || "").startsWith(jourStr) && r.statut !== "Refusée" && r.statut !== "Annulée")
      .map(r => ({ type: "sortie", label: `📦 ${r.evenement}`, statut: r.statut }));
    const retours = reservations.filter(r => (r.dateFin || r.date_fin || "").startsWith(jourStr) && r.statut === "Validée")
      .map(r => ({ type: "retour", label: `↩️ ${r.evenement}`, statut: r.statut }));
    const maint = maintenances.filter(m => (m.date_planifiee || m.planifiee || "") === jourStr && m.statut !== "Terminée" && m.statut !== "Annulée")
      .map(m => ({ type: "maintenance", label: `🔧 ${m.equipement}`, statut: m.statut, priorite: m.priorite }));
    return [...sorties, ...retours, ...maint];
  };

  const moisAnnee = debutSemaine.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const aujourdhui = new Date().toISOString().split("T")[0];

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15 }}>📅 Calendrier de la semaine</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setSemaineOffset(s => s - 1)} style={{ ...btnG, padding: "4px 10px", fontSize: 13 }}>←</button>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary, textTransform: "capitalize", minWidth: 130, textAlign: "center" }}>{moisAnnee}</span>
          <button onClick={() => setSemaineOffset(s => s + 1)} style={{ ...btnG, padding: "4px 10px", fontSize: 13 }}>→</button>
          {semaineOffset !== 0 && <button onClick={() => setSemaineOffset(0)} style={{ ...btnG, padding: "4px 10px", fontSize: 12 }}>Aujourd'hui</button>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, overflowX: "auto" }}>
        {jours.map((jour, i) => {
          const jourStr = jour.toISOString().split("T")[0];
          const evts = evenementsParJour(jour);
          const estAujourdhui = jourStr === aujourdhui;
          return (
            <div key={i} style={{ border: `1px solid ${estAujourdhui ? COLORS.primary : COLORS.border}`, borderRadius: 8, padding: 8, minHeight: 110, minWidth: 110, background: estAujourdhui ? COLORS.light : "#fff" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: estAujourdhui ? COLORS.primary : COLORS.muted, marginBottom: 6 }}>
                {JOURS_SEMAINE[i]} {jour.getDate()}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {evts.length === 0 && <div style={{ fontSize: 10, color: COLORS.muted, fontStyle: "italic" }}>—</div>}
                {evts.slice(0, 4).map((e, j) => (
                  <div key={j} style={{
                    fontSize: 10, padding: "3px 5px", borderRadius: 4, background: e.priorite === "Urgente" ? "#fee2e2" : (e.type === "maintenance" ? "#f3e8ff" : (e.type === "retour" ? "#fef3c7" : "#dbeafe")),
                    color: e.priorite === "Urgente" ? COLORS.danger : COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                  }} title={e.label}>
                    {e.label}
                  </div>
                ))}
                {evts.length > 4 && <div style={{ fontSize: 10, color: COLORS.muted }}>+{evts.length - 4} autre(s)</div>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// ─── APP PRINCIPALE ────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [materiel, setMateriel] = useState({});
  const [equipements, setEquipements] = useState([]);
  const [espacesData, setEspacesData] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReservForm, setShowReservForm] = useState(false);
  const [showMaintForm, setShowMaintForm] = useState(false);
  const [modal, setModal] = useState(null);
  const [newMaint, setNewMaint] = useState({ equipement: "", type: "Curatif", planifiee: "", prestataire: "", priorite: "Normale", description: "" });
  const [searchEq, setSearchEq] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [res, maint, mat, eq, prest, lignesAll] = await Promise.all([
        db.get("reservations"),
        db.get("maintenances"),
        db.get("materiel"),
        db.get("equipements"),
        db.get("prestataires"),
        db.get("lignes_reservation"),
      ]);
      const matParCat = {};
      (mat || []).forEach(m => {
        if (!matParCat[m.categorie]) matParCat[m.categorie] = [];
        matParCat[m.categorie].push(m);
      });
      setMateriel(matParCat);
      setEquipements(eq || []);
      setPrestataires(prest || []);
      const resAvecLignes = (res || []).map(r => ({
        ...r,
        lignes: (lignesAll || []).filter(l => l.reservation_id === r.id).map(l => ({ nom: l.materiel_nom, qte: l.quantite })),
        dateDebut: r.date_debut,
        dateFin: r.date_fin,
        commentaire: r.commentaire || "",
      }));
      setReservations(resAvecLignes);
      setMaintenances((maint || []).map(m => ({ ...m, planifiee: m.date_planifiee || m.planifiee })));
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { if (currentUser) loadData(); }, [currentUser]);

  if (!currentUser) return <LoginPage onLogin={(u) => { setCurrentUser(u); setTab(u.role === "Utilisateur" ? "reservations" : "dashboard"); }} />;

  const isAdmin = currentUser.role === "Admin";
  const isUser = currentUser.role === "Utilisateur";

  const TABS = isUser
    ? [{ id: "reservations", label: "📦 Mes réservations" }, { id: "maintenance", label: "🛠️ Signaler un souci" }]
    : [
        { id: "dashboard", label: "🏠 Tableau de bord" },
        { id: "reservations", label: "📦 Réservations" },
        { id: "materiel", label: "🗃️ Matériel" },
        { id: "equipements", label: "🔧 Équipements" },
        { id: "espaces", label: "🏢 Espaces" },
        { id: "maintenance", label: "🛠️ Maintenance" },
        { id: "prestataires", label: "👷 Prestataires" },
      ];

  const handleConfirm = async (comment) => {
    const newStatut = modal.action === "valider" ? "Validée" : "Refusée";
    await db.update("reservations", modal.reservation.id, { statut: newStatut, commentaire: comment });
    if (newStatut === "Validée") {
      for (const ligne of (modal.reservation.lignes || [])) {
        const matCorrespondant = Object.values(materiel).flat().find(m => m.nom === ligne.nom);
        if (matCorrespondant) {
          const nouvelleQte = Math.max(0, matCorrespondant.disponible - ligne.qte);
          await db.update("materiel", matCorrespondant.id, { disponible: nouvelleQte });
        }
      }
    }
    await loadData();
    setModal(null);
  };

  const handleMarquerRendu = async (reservation) => {
    await db.update("reservations", reservation.id, { statut: "Rendue", date_retour_reelle: new Date().toISOString() });
    for (const ligne of (reservation.lignes || [])) {
      const matCorrespondant = Object.values(materiel).flat().find(m => m.nom === ligne.nom);
      if (matCorrespondant) {
        const nouvelleQte = Math.min(matCorrespondant.qte, matCorrespondant.disponible + ligne.qte);
        await db.update("materiel", matCorrespondant.id, { disponible: nouvelleQte });
      }
    }
    await loadData();
  };

  const handleAnnuler = async (reservation) => {
    const ancienStatut = reservation.statut;
    await db.update("reservations", reservation.id, { statut: "Annulée" });
    if (ancienStatut === "Validée") {
      for (const ligne of (reservation.lignes || [])) {
        const matCorrespondant = Object.values(materiel).flat().find(m => m.nom === ligne.nom);
        if (matCorrespondant) {
          const nouvelleQte = Math.min(matCorrespondant.qte, matCorrespondant.disponible + ligne.qte);
          await db.update("materiel", matCorrespondant.id, { disponible: nouvelleQte });
        }
      }
    }
    await loadData();
  };

  const submitMaint = async () => {
    if (!newMaint.equipement || !newMaint.planifiee) return;
    const data = { equipement: newMaint.equipement, type: newMaint.type || "Curatif", priorite: newMaint.priorite || "Normale", description: newMaint.description, prestataire: newMaint.prestataire, date_planifiee: newMaint.planifiee, statut: "Planifiée", demandeur: currentUser.nom };
    const res = await db.insert("maintenances", data);
    if (res && res[0]) setMaintenances(m => [...m, { ...res[0], planifiee: res[0].date_planifiee }]);
    setShowMaintForm(false);
    setNewMaint({ equipement: "", type: "Curatif", planifiee: "", prestataire: "", priorite: "Normale", description: "" });
  };

  const reservationsVues = isUser ? reservations.filter(r => r.demandeur === currentUser.nom) : reservations;
  const maintenancesVues = isUser ? maintenances.filter(m => m.demandeur === currentUser.nom) : maintenances;
  const filteredEq = equipements.filter(e => e.nom.toLowerCase().includes(searchEq.toLowerCase()));
  const roleColor = { Admin: COLORS.accent, Technicien: "#7c3aed", Utilisateur: COLORS.success }[currentUser.role] || COLORS.muted;

  const EspacesView = () => {
    const [vue, setVue] = useState("liste");
    const [searchEsp, setSearchEsp] = useState("");
    const [filterBat, setFilterBat] = useState("Tous");
    const data = espacesData.length ? espacesData : [];
    const batiments = ["Tous", ...Array.from(new Set(data.map(e => e.batiment))).filter(Boolean)];
    const filtered = data.filter(e => (filterBat === "Tous" || e.batiment === filterBat) && e.nom.toLowerCase().includes(searchEsp.toLowerCase()));
    const parBatiment = batiments.filter(b => b !== "Tous").map(bat => ({ bat, espaces: data.filter(e => e.batiment === bat), site: data.find(e => e.batiment === bat)?.site || "" }));

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ margin: 0, color: COLORS.primary }}>Espaces & bâtiments <span style={{ fontSize: 14, color: COLORS.muted, fontWeight: 400 }}>({data.length} espaces)</span></h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setVue("liste")} style={{ ...btnP, background: vue === "liste" ? COLORS.primary : "#e5e7eb", color: vue === "liste" ? "#fff" : COLORS.text, padding: "7px 16px", fontSize: 13 }}>📋 Liste</button>
            <button onClick={() => setVue("batiment")} style={{ ...btnP, background: vue === "batiment" ? COLORS.primary : "#e5e7eb", color: vue === "batiment" ? "#fff" : COLORS.text, padding: "7px 16px", fontSize: 13 }}>🏢 Par bâtiment</button>
          </div>
        </div>
        {vue === "liste" && (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <input style={{ ...inp, width: 260 }} placeholder="🔍 Rechercher un espace…" value={searchEsp} onChange={e => setSearchEsp(e.target.value)} />
              <select style={{ ...inp, width: 220 }} value={filterBat} onChange={e => setFilterBat(e.target.value)}>{batiments.map(b => <option key={b}>{b}</option>)}</select>
            </div>
            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: COLORS.light }}>
                      {["Nom","Bâtiment","Site","Étage","Surface","Référence","Contact"].map(h => (
                        <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: COLORS.muted, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(e => (
                      <tr key={e.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: "10px 12px", fontWeight: 500 }}>{e.nom}</td>
                        <td style={{ padding: "10px 12px", fontSize: 12, color: COLORS.muted }}>{e.batiment}</td>
                        <td style={{ padding: "10px 12px", fontSize: 12 }}>{e.site}</td>
                        <td style={{ padding: "10px 12px", fontSize: 12 }}>{e.etage}</td>
                        <td style={{ padding: "10px 12px", fontSize: 12 }}>{e.surface ? `${e.surface} m²` : "—"}</td>
                        <td style={{ padding: "10px 12px", fontSize: 11, color: COLORS.muted }}>{e.ref || "—"}</td>
                        <td style={{ padding: "10px 12px", fontSize: 11, color: COLORS.muted }}>{e.contact || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "10px 12px", fontSize: 12, color: COLORS.muted, borderTop: `1px solid ${COLORS.border}` }}>{filtered.length} espace(s) affiché(s)</div>
            </Card>
          </>
        )}
        {vue === "batiment" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {parBatiment.map(({ bat, espaces, site }) => (
              <Card key={bat}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.primary }}>{bat}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>{site} · {espaces.length} espace(s)</div>
                  </div>
                  <Badge label={site} color="info" />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {Array.from(new Set(espaces.map(e => e.etage))).filter(Boolean).sort().map(etage => (
                    <div key={etage} style={{ flex: "0 0 auto", minWidth: 200 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, marginBottom: 4, textTransform: "uppercase" }}>Étage {etage}</div>
                      {espaces.filter(e => e.etage === etage).map(e => (
                        <div key={e.id} style={{ fontSize: 12, padding: "4px 8px", background: COLORS.light, borderRadius: 6, marginBottom: 3, display: "flex", justifyContent: "space-between" }}>
                          <span>{e.nom}</span>
                          {e.surface && <span style={{ color: COLORS.muted, fontSize: 11 }}>{e.surface} m²</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f5f7fb", minHeight: "100vh", color: COLORS.text }}>
      {modal && <ModalValidation reservation={modal.reservation} action={modal.action} onConfirm={handleConfirm} onClose={() => setModal(null)} />}
      {showReservForm && <FormulaireReservation currentUser={currentUser} materiel={materiel} onSubmit={() => { setShowReservForm(false); loadData(); }} onClose={() => setShowReservForm(false)} />}

      <div style={{ background: COLORS.primary, padding: "0 24px", display: "flex", alignItems: "center", gap: 12, height: 56 }}>
        <div style={{ background: "#fff", borderRadius: 8, width: 44, height: 34, display: "flex", alignItems: "center", justifyContent: "center", padding: "2px 4px" }}>
          <img src={LOGO_URL} alt="France Judo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        </div>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Services Généraux — France Judo</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{currentUser.prenom}</div>
            <div style={{ fontSize: 11, color: "#93c5fd" }}>{{ Admin: "👑", Technicien: "🔧", Utilisateur: "👤" }[currentUser.role]} {currentUser.role}</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: roleColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>{currentUser.prenom[0]}</div>
          <button onClick={() => { setCurrentUser(null); setTab("dashboard"); }} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, color: "#fff", padding: "4px 10px", cursor: "pointer", fontSize: 12 }}>Déconnexion</button>
        </div>
      </div>

      <div style={{ background: COLORS.white, borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px", display: "flex", gap: 2, overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "14px 16px", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? COLORS.primary : COLORS.muted, borderBottom: tab === t.id ? `3px solid ${COLORS.primary}` : "3px solid transparent", whiteSpace: "nowrap" }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        {loading && <div style={{ textAlign: "center", padding: 40, color: COLORS.muted }}>Chargement…</div>}

        {!loading && tab === "dashboard" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Tableau de bord</h2>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                { label: "En attente de validation", value: reservations.filter(r => r.statut === "En attente").length, color: COLORS.warning, icon: "⏳" },
                { label: "Articles en catalogue", value: Object.values(materiel).flat().length, color: COLORS.primary, icon: "📦" },
                { label: "Équipements suivis", value: equipements.length, color: COLORS.primary, icon: "🔧" },
                { label: "Maintenances urgentes", value: maintenances.filter(m => m.priorite === "Urgente" && m.statut !== "Terminée").length, color: COLORS.danger, icon: "🔴" },
              ].map(s => (
                <Card key={s.label} style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.muted, marginTop: 2 }}>{s.label}</div>
                </Card>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <CalendrierHebdo reservations={reservations} maintenances={maintenances} />
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <Card style={{ flex: 2, minWidth: 300 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Dernières réservations</h3>
                {reservations.length === 0 ? <p style={{ color: COLORS.muted, fontSize: 14 }}>Aucune réservation pour l'instant.</p> :
                  reservations.slice(-5).reverse().map(r => (
                    <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{r.evenement}</div>
                        <div style={{ fontSize: 12, color: COLORS.muted }}>{r.demandeur} · {fmtDate(r.dateDebut || r.date_debut)}</div>
                      </div>
                      {sBadge(r.statut)}
                    </div>
                  ))}
              </Card>
              <Card style={{ flex: 1, minWidth: 240 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Maintenances actives</h3>
                {maintenances.filter(m => m.statut !== "Terminée").length === 0 ? <p style={{ color: COLORS.muted, fontSize: 14 }}>Aucune maintenance active.</p> :
                  maintenances.filter(m => m.statut !== "Terminée").map(m => (
                    <div key={m.id} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{m.equipement}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>{m.date_planifiee || m.planifiee} · {m.type}</div>
                      <div style={{ marginTop: 4 }}>{sBadge(m.statut)}</div>
                    </div>
                  ))}
              </Card>
            </div>
          </div>
        )}

        {!loading && tab === "reservations" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: COLORS.primary }}>{isUser ? "Mes réservations" : "Réservations matériel"}</h2>
              <button style={btnP} onClick={() => setShowReservForm(true)}>+ Nouvelle demande</button>
            </div>
            <Card>
              {reservationsVues.length === 0
                ? <p style={{ color: COLORS.muted, textAlign: "center", padding: 40 }}>Aucune réservation.</p>
                : <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: COLORS.light }}>
                        {[...(!isUser ? ["Demandeur"] : []), "Événement", "Matériel", "Site", "Sortie", "Retour", "Statut", "Commentaire", ...(isAdmin ? ["Actions"] : [])].map(h => (
                          <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: COLORS.muted, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reservationsVues.map(r => (
                        <tr key={r.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                          {!isUser && <td style={{ padding: "12px" }}>{r.demandeur}</td>}
                          <td style={{ padding: "12px", fontWeight: 600 }}>{r.evenement}</td>
                          <td style={{ padding: "12px", fontSize: 12, color: COLORS.muted }}>{r.lignes?.map((l, i) => <div key={i}>{l.nom} × {l.qte}</div>)}</td>
                          <td style={{ padding: "12px", fontSize: 13 }}>{r.site}</td>
                          <td style={{ padding: "12px", fontSize: 12, whiteSpace: "nowrap" }}>{fmtDate(r.dateDebut || r.date_debut)}</td>
                          <td style={{ padding: "12px", fontSize: 12, whiteSpace: "nowrap" }}>{fmtDate(r.dateFin || r.date_fin)}</td>
                          <td style={{ padding: "12px" }}>{sBadge(r.statut)}</td>
                          <td style={{ padding: "12px", fontSize: 12, color: COLORS.muted }}>{r.commentaire || <span style={{ fontStyle: "italic" }}>—</span>}</td>
                          {isAdmin && (
                            <td style={{ padding: "12px" }}>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {r.statut === "En attente" && (
                                  <>
                                    <button style={btnS} onClick={() => setModal({ reservation: r, action: "valider" })}>✓</button>
                                    <button style={btnD} onClick={() => setModal({ reservation: r, action: "refuser" })}>✗</button>
                                  </>
                                )}
                                {r.statut === "Validée" && (
                                  <>
                                    <button style={{ ...btnG, fontSize: 12, padding: "5px 10px" }} onClick={() => handleMarquerRendu(r)}>↩️ Rendu</button>
                                    <button style={{ ...btnD, fontSize: 12, padding: "5px 10px" }} onClick={() => handleAnnuler(r)}>Annuler</button>
                                  </>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </Card>
          </div>
        )}

        {!loading && tab === "materiel" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Catalogue matériel</h2>
            {Object.entries(materiel).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 15 }}>{cat}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
                  {items.map(m => (
                    <Card key={m.id}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{m.nom}</div>
                      {m.stockage && <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>📍 {m.stockage}{m.batiment ? ` · ${m.batiment}` : ""}</div>}
                      <div style={{ background: COLORS.light, borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: COLORS.muted }}>Total</span><strong>{m.qte}</strong></div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span style={{ color: COLORS.muted }}>Disponible</span><strong style={{ color: m.disponible > 0 ? COLORS.success : COLORS.danger }}>{m.disponible}</strong></div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && tab === "equipements" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 16, color: COLORS.primary }}>Équipements</h2>
            <input style={{ ...inp, width: 280, marginBottom: 16 }} placeholder="🔍 Rechercher…" value={searchEq} onChange={e => setSearchEq(e.target.value)} />
            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: COLORS.light }}>
                      {["Équipement","Catégorie","Bâtiment","Espace","N° série","État","Préventif","Fin garantie","Prestataire"].map(h => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: COLORS.muted, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEq.map(e => (
                      <tr key={e.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: "12px", fontWeight: 600 }}>{e.nom}</td>
                        <td style={{ padding: "12px" }}><Badge label={e.categorie} color="info" /></td>
                        <td style={{ padding: "12px", fontSize: 13 }}>{e.batiment || "—"}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: COLORS.muted }}>{e.espace || "—"}</td>
                        <td style={{ padding: "12px", fontSize: 12, color: COLORS.muted }}>{e.serie || "—"}</td>
                        <td style={{ padding: "12px" }}>{e.etat ? sBadge(e.etat) : "—"}</td>
                        <td style={{ padding: "12px", fontSize: 13 }}>{e.preventif || "—"}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: e.fin_garantie && new Date(e.fin_garantie) < new Date() ? COLORS.danger : COLORS.muted }}>{e.fin_garantie || "—"}</td>
                        <td style={{ padding: "12px", fontSize: 13 }}>{e.prestataire || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {!loading && tab === "espaces" && !isUser && <EspacesView />}

        {!loading && tab === "maintenance" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: COLORS.primary }}>{isUser ? "Signaler un souci" : "Maintenance"}</h2>
              <button style={btnP} onClick={() => setShowMaintForm(true)}>+ {isUser ? "Signaler" : "Planifier / Signaler"}</button>
            </div>
            {showMaintForm && (
              <Card style={{ marginBottom: 20, background: COLORS.light }}>
                <h3 style={{ margin: "0 0 16px", color: COLORS.primary }}>{isUser ? "Nouveau signalement" : "Nouvelle intervention"}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>Équipement / Espace *</label>
                    <select style={{ ...inp, marginTop: 4 }} value={newMaint.equipement} onChange={e => setNewMaint({ ...newMaint, equipement: e.target.value })}>
                      <option value="">Choisir…</option>
                      <optgroup label="Équipements">{equipements.map(eq => <option key={eq.id}>{eq.nom}</option>)}</optgroup>
                    </select>
                  </div>
                  {!isUser && <>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600 }}>Type</label>
                      <select style={{ ...inp, marginTop: 4 }} value={newMaint.type} onChange={e => setNewMaint({ ...newMaint, type: e.target.value })}>
                        <option>Curatif</option><option>Préventif</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600 }}>Priorité</label>
                      <select style={{ ...inp, marginTop: 4 }} value={newMaint.priorite} onChange={e => setNewMaint({ ...newMaint, priorite: e.target.value })}>
                        <option>Normale</option><option>Urgente</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600 }}>Prestataire</label>
                      <select style={{ ...inp, marginTop: 4 }} value={newMaint.prestataire} onChange={e => setNewMaint({ ...newMaint, prestataire: e.target.value })}>
                        <option value="">Choisir…</option>
                        {prestataires.map(p => <option key={p.id}>{p.nom}</option>)}
                      </select>
                    </div>
                  </>}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>Date *</label>
                    <input type="date" style={{ ...inp, marginTop: 4 }} value={newMaint.planifiee} onChange={e => setNewMaint({ ...newMaint, planifiee: e.target.value })} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>Description</label>
                    <textarea style={{ ...inp, marginTop: 4, minHeight: 70, resize: "vertical" }} placeholder="Décrivez ce que vous observez…" value={newMaint.description} onChange={e => setNewMaint({ ...newMaint, description: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button style={btnP} onClick={submitMaint}>Enregistrer</button>
                  <button style={btnG} onClick={() => setShowMaintForm(false)}>Annuler</button>
                </div>
              </Card>
            )}
            {maintenancesVues.length === 0
              ? <Card><p style={{ color: COLORS.muted, textAlign: "center", padding: 40 }}>Aucun signalement pour l'instant.</p></Card>
              : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {maintenancesVues.map(m => (
                  <Card key={m.id} style={{ borderLeft: `4px solid ${m.priorite === "Urgente" ? COLORS.danger : COLORS.primary}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{m.equipement}</div>
                      {m.priorite === "Urgente" && <Badge label="🔴 Urgent" color="danger" />}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.muted }}>{m.type}{m.prestataire ? ` · ${m.prestataire}` : ""}</div>
                    {m.description && <div style={{ fontSize: 13, marginTop: 6, fontStyle: "italic" }}>{m.description}</div>}
                    <div style={{ fontSize: 13, marginTop: 6 }}>📅 {m.date_planifiee || m.planifiee}</div>
                    <div style={{ marginTop: 10 }}>{sBadge(m.statut)}</div>
                  </Card>
                ))}
              </div>
            }
          </div>
        )}

        {!loading && tab === "prestataires" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Prestataires & intervenants</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 16 }}>
              {prestataires.map(p => (
                <Card key={p.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{p.nom}</div>
                    {p.specialite && <Badge label={p.specialite.substring(0, 20)} color="info" />}
                  </div>
                  <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 4, color: COLORS.muted }}>
                    {p.contact && p.contact !== "-" && <div>👤 {p.contact}</div>}
                    {p.email && <div>✉️ <a href={`mailto:${p.email}`} style={{ color: COLORS.primary }}>{p.email}</a></div>}
                    {p.tel && <div>📞 {p.tel}</div>}
                    {p.fin_contrat && <div style={{ color: new Date(p.fin_contrat) < new Date() ? COLORS.danger : COLORS.muted, marginTop: 4 }}>📋 Contrat jusqu'au {p.fin_contrat}</div>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}