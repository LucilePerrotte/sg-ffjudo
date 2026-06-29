import { useState } from "react";

const COLORS = {
  primary: "#003087", accent: "#E8001D", light: "#f0f4ff", border: "#dde3f0",
  text: "#1a1a2e", muted: "#6b7280", success: "#16a34a", warning: "#d97706",
  danger: "#dc2626", white: "#ffffff",
};

const USERS_DB = [
  { id: 1, nom: "Lucile Perrotte", prenom: "Lucile", email: "lucile.perrotte@ffjudo.com", role: "Admin", password: "sg2025" },
  { id: 2, nom: "Michael Argot", prenom: "Michael", email: "michael.argot@ffjudo.com", role: "Technicien", password: "tech2025" },
  { id: 3, nom: "Utilisateur", prenom: "Utilisateur", email: "user@ffjudo.com", role: "Utilisateur", password: "user2025" },
  { id: 4, nom: "Paul Renard", prenom: "Paul", email: "paul@ffjudo.com", role: "Utilisateur", password: "user2025" },
];

const EVENEMENTS_CATALOGUE = [
  "Séminaire direction", "Conférence de presse", "Formation arbitres",
  "Assemblée générale", "Tournoi régional", "Réunion de bureau",
  "Événement partenaire", "Stage technique", "Autre",
];

const MATERIEL_PAR_CAT = {
  "Mobilier": [
    { id: 1, nom: "Table pliante", qte: 20, disponible: 18 },
    { id: 2, nom: "Chaise empilable", qte: 80, disponible: 72 },
    { id: 3, nom: "Mange-debout", qte: 10, disponible: 10 },
  ],
  "Audiovisuel": [
    { id: 4, nom: "Vidéoprojecteur", qte: 4, disponible: 3 },
    { id: 5, nom: "Écran de projection", qte: 3, disponible: 3 },
    { id: 6, nom: "Sono portable", qte: 2, disponible: 1 },
    { id: 7, nom: "Micro HF", qte: 6, disponible: 5 },
  ],
  "Informatique": [
    { id: 8, nom: "Câble HDMI", qte: 15, disponible: 12 },
    { id: 9, nom: "Rallonge multiprise", qte: 10, disponible: 9 },
    { id: 10, nom: "Webcam USB", qte: 4, disponible: 4 },
  ],
  "Événementiel": [
    { id: 11, nom: "Barrière Vauban", qte: 30, disponible: 30 },
    { id: 12, nom: "Kakémono FFJudo", qte: 8, disponible: 7 },
    { id: 13, nom: "Nappe blanche", qte: 20, disponible: 18 },
  ],
};

const EQUIPEMENTS_DATA = [
  { id: 1, nom: "CTA Toiture R+5", categorie: "CVC", batiment: "Institut du Judo", espace: "Toiture R+5", serie: "CTA-IJ-01", dateAchat: "2020-01-15", finGarantie: "2026-06-30", etat: "Bon", preventif: "Semestriel", prestataire: "Engie Cofely" },
  { id: 2, nom: "Fan coil Bureau 301", categorie: "CVC", batiment: "Institut du Judo", espace: "Bureau 301", serie: "FC-301", dateAchat: "2019-06-01", finGarantie: "2024-12-31", etat: "En maintenance", preventif: "Annuel", prestataire: "Engie Cofely" },
  { id: 3, nom: "Groupe électrogène", categorie: "Électrique", batiment: "Grand Dôme", espace: "Local technique", serie: "GE-GD-01", dateAchat: "2021-03-10", finGarantie: "2027-03-15", etat: "Bon", preventif: "Mensuel", prestataire: "Engie Cofely" },
  { id: 4, nom: "Éclairage secours Dojo", categorie: "Sécurité", batiment: "Dojo de Paris", espace: "Dojo principal", serie: "ES-DP-12", dateAchat: "2018-09-01", finGarantie: "2025-09-01", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
  { id: 5, nom: "Ascenseur principal", categorie: "Élévation", batiment: "Institut du Judo", espace: "Hall RDC", serie: "ASC-IJ-01", dateAchat: "2017-01-01", finGarantie: "2028-01-01", etat: "Bon", preventif: "Mensuel", prestataire: "Schindler" },
  { id: 6, nom: "SSI Centrale", categorie: "Sécurité", batiment: "Institut du Judo", espace: "Local sécurité", serie: "SSI-IJ-01", dateAchat: "2019-01-01", finGarantie: "2026-01-01", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
];

const ESPACES_DATA = [
  { id: 1, nom: "Salle de réunion A", batiment: "Institut du Judo", etage: "3", surface: 28, site: "Paris 13e", ref: "IJ-SR-A" },
  { id: 2, nom: "Salle de réunion B", batiment: "Institut du Judo", etage: "3", surface: 35, site: "Paris 13e", ref: "IJ-SR-B" },
  { id: 3, nom: "Grand Dojo", batiment: "Dojo de Paris", etage: "RDC", surface: 600, site: "Paris", ref: "DP-DJ-01" },
  { id: 4, nom: "Espace cocktail", batiment: "Grand Dôme", etage: "1", surface: 400, site: "Villebon-sur-Yvette", ref: "GD-CK-01" },
  { id: 5, nom: "Hall d'accueil", batiment: "Institut du Judo", etage: "RDC", surface: 120, site: "Paris 13e", ref: "IJ-HA-01" },
];

const PRESTATAIRES_DATA = [
  { id: 1, nom: "IPSI", specialite: "SSI / Désenfumage", contact: "", email: "", tel: "", finContrat: "" },
  { id: 2, nom: "Schindler", specialite: "Ascenseurs", contact: "", email: "", tel: "", finContrat: "2026-06-30" },
  { id: 3, nom: "Engie Cofely", specialite: "CVC / GTB", contact: "", email: "", tel: "", finContrat: "2025-09-30" },
];

const RESERVATIONS_INIT = [
  { id: 1, demandeur: "Sophie Dupont", userId: 3, evenement: "Séminaire direction", lignes: [{ nom: "Table pliante", qte: 10 }, { nom: "Chaise empilable", qte: 40 }], dateDebut: "2025-07-10T09:00", dateFin: "2025-07-10T18:00", statut: "En attente", site: "Institut du Judo", commentaire: "" },
  { id: 2, demandeur: "Paul Renard", userId: 4, evenement: "Conférence de presse", lignes: [{ nom: "Vidéoprojecteur", qte: 1 }, { nom: "Écran de projection", qte: 1 }], dateDebut: "2025-07-15T14:00", dateFin: "2025-07-15T17:00", statut: "Validée", site: "Grand Dôme", commentaire: "Récupération à l'accueil, contacter Lucile." },
  { id: 3, demandeur: "Sophie Dupont", userId: 3, evenement: "Formation arbitres", lignes: [{ nom: "Sono portable", qte: 1 }], dateDebut: "2025-07-08T08:00", dateFin: "2025-07-09T12:00", statut: "Refusée", site: "Dojo de Paris", commentaire: "Sono déjà réservée sur cette période." },
];

const MAINTENANCES_INIT = [
  { id: 1, equipement: "CTA Toiture R+5", type: "Préventif", planifiee: "2025-07-15", prestataire: "Engie Cofely", statut: "Planifiée", priorite: "Normale", description: "", userId: 1 },
  { id: 2, equipement: "Fan coil Bureau 301", type: "Curatif", planifiee: "2025-07-03", prestataire: "Engie Cofely", statut: "En cours", priorite: "Urgente", description: "Fuite détectée sous le bac", userId: 1 },
  { id: 3, equipement: "Groupe électrogène", type: "Préventif", planifiee: "2025-07-01", prestataire: "Engie Cofely", statut: "Terminée", priorite: "Normale", description: "", userId: 1 },
];

const Badge = ({ label, color }) => {
  const c = { success: ["#dcfce7","#16a34a"], warning: ["#fef9c3","#b45309"], danger: ["#fee2e2","#dc2626"], info: ["#dbeafe","#1d4ed8"], muted: ["#f3f4f6","#6b7280"], orange: ["#ffedd5","#c2410c"] }[color] || ["#f3f4f6","#6b7280"];
  return <span style={{ background: c[0], color: c[1], padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{label}</span>;
};
const sBadge = (s) => {
  if (["Validée","Terminée","Bon"].includes(s)) return <Badge label={s} color="success" />;
  if (["En attente","Planifiée"].includes(s)) return <Badge label={s} color="info" />;
  if (s === "Refusée") return <Badge label={s} color="danger" />;
  if (["En cours","En maintenance"].includes(s)) return <Badge label={s} color="orange" />;
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
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setErr(""); setLoading(true);
    setTimeout(() => {
      const u = USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (u) onLogin(u);
      else { setErr("Email ou mot de passe incorrect."); setLoading(false); }
    }, 600);
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
          <input style={inp} type="email" placeholder="prenom.nom@ffjudo.com" value={email}
            onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Mot de passe</label>
          <input style={inp} type="password" placeholder="••••••••" value={password}
            onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>

        {err && <div style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>⚠️ {err}</div>}

        <button style={{ ...btnP, width: "100%", padding: "12px", fontSize: 15, opacity: loading ? 0.7 : 1 }} onClick={submit} disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: COLORS.muted }}>
          🔒 Connexion Microsoft SSO à venir (Azure Entra ID)
        </div>
      </div>
    </div>
  );
};

const ModalValidation = ({ reservation, action, onConfirm, onClose }) => {
  const [comment, setComment] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 460, boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 8px", color: action === "valider" ? COLORS.success : COLORS.danger, fontSize: 18 }}>
          {action === "valider" ? "✓ Valider la réservation" : "✗ Refuser la réservation"}
        </h3>
        <p style={{ fontSize: 14, color: COLORS.muted, margin: "0 0 16px" }}>
          <strong>{reservation.evenement}</strong> — {reservation.demandeur}
        </p>
        <label style={{ fontSize: 13, fontWeight: 600 }}>
          {action === "valider" ? "Commentaire (ex : lieu de récupération, contact…)" : "Motif du refus *"}
        </label>
        <textarea value={comment} onChange={e => setComment(e.target.value)}
          style={{ ...inp, marginTop: 6, minHeight: 90, resize: "vertical" }}
          placeholder={action === "valider" ? "Ex : Récupération à l'accueil RDC, contacter Lucile." : "Ex : Matériel déjà réservé sur cette période."} />
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

const FormulaireReservation = ({ currentUser, onSubmit, onClose }) => {
  const [evenement, setEvenement] = useState("");
  const [autreEvt, setAutreEvt] = useState("");
  const [site, setSite] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [selection, setSelection] = useState({});
  const [catOuverte, setCatOuverte] = useState(null);

  const evtFinal = evenement === "Autre" ? autreEvt : evenement;
  const setQte = (id, val) => {
    const n = Math.max(0, parseInt(val) || 0);
    if (n === 0) { const s = { ...selection }; delete s[id]; setSelection(s); }
    else setSelection({ ...selection, [id]: n });
  };
  const lignes = Object.entries(selection).map(([id, qte]) => {
    const mat = Object.values(MATERIEL_PAR_CAT).flat().find(m => m.id === parseInt(id));
    return { nom: mat?.nom, qte };
  }).filter(l => l.qte > 0 && l.nom);

  const valid = evtFinal && dateDebut && dateFin && lignes.length > 0;

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

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Site</label>
          <select style={{ ...inp, marginTop: 4 }} value={site} onChange={e => setSite(e.target.value)}>
            <option value="">Choisir un site…</option>
            <option>Institut du Judo</option><option>Grand Dôme</option><option>Dojo de Paris</option>
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
            {Object.entries(MATERIEL_PAR_CAT).map(([cat, items]) => (
              <div key={cat}>
                <button onClick={() => setCatOuverte(catOuverte === cat ? null : cat)}
                  style={{ width: "100%", padding: "11px 14px", background: catOuverte === cat ? COLORS.light : "#fafafa", border: "none", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer", textAlign: "left", fontWeight: 600, fontSize: 13, display: "flex", justifyContent: "space-between" }}>
                  <span>{cat}</span>
                  <span style={{ fontSize: 11, color: COLORS.muted }}>
                    {items.some(i => selection[i.id]) ? `${items.filter(i => selection[i.id]).length} sélectionné(s) · ` : ""}
                    {catOuverte === cat ? "▲" : "▼"}
                  </span>
                </button>
                {catOuverte === cat && items.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", padding: "10px 14px", gap: 12, borderBottom: `1px solid ${COLORS.border}`, background: selection[item.id] ? "#f0fdf4" : "#fff" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{item.nom}</div>
                      <div style={{ fontSize: 12, color: item.disponible > 0 ? COLORS.success : COLORS.danger }}>
                        {item.disponible} disponible(s) / {item.qte} au total
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button onClick={() => setQte(item.id, (selection[item.id] || 0) - 1)}
                        style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16 }}>−</button>
                      <span style={{ width: 32, textAlign: "center", fontWeight: 700, color: selection[item.id] ? COLORS.primary : COLORS.muted }}>
                        {selection[item.id] || 0}
                      </span>
                      <button onClick={() => setQte(item.id, Math.min((selection[item.id] || 0) + 1, item.disponible))}
                        disabled={(selection[item.id] || 0) >= item.disponible}
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

        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...btnP, opacity: valid ? 1 : 0.5 }} disabled={!valid}
            onClick={() => onSubmit({ demandeur: currentUser.nom, userId: currentUser.id, evenement: evtFinal, lignes, dateDebut, dateFin, site, statut: "En attente", commentaire: "" })}>
            Envoyer la demande
          </button>
          <button style={btnG} onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [reservations, setReservations] = useState(RESERVATIONS_INIT);
  const [maintenances, setMaintenances] = useState(MAINTENANCES_INIT);
  const [showReservForm, setShowReservForm] = useState(false);
  const [showMaintForm, setShowMaintForm] = useState(false);
  const [modal, setModal] = useState(null);
  const [newMaint, setNewMaint] = useState({ equipement: "", type: "Curatif", planifiee: "", prestataire: "", priorite: "Normale", description: "" });
  const [searchEq, setSearchEq] = useState("");

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

  const handleConfirm = (comment) => {
    setReservations(r => r.map(x => x.id === modal.reservation.id ? { ...x, statut: modal.action === "valider" ? "Validée" : "Refusée", commentaire: comment } : x));
    setModal(null);
  };

  const submitMaint = () => {
    if (!newMaint.equipement || !newMaint.planifiee) return;
    setMaintenances(m => [...m, { ...newMaint, id: m.length + 1, statut: "Planifiée", userId: currentUser.id }]);
    setShowMaintForm(false);
    setNewMaint({ equipement: "", type: "Curatif", planifiee: "", prestataire: "", priorite: "Normale", description: "" });
  };

  const reservationsVues = isUser ? reservations.filter(r => r.userId === currentUser.id) : reservations;
  const maintenancesVues = isUser ? maintenances.filter(m => m.userId === currentUser.id) : maintenances;
  const filteredEq = EQUIPEMENTS_DATA.filter(e => e.nom.toLowerCase().includes(searchEq.toLowerCase()));
  const roleColor = { Admin: COLORS.accent, Technicien: "#7c3aed", Utilisateur: COLORS.success }[currentUser.role] || COLORS.muted;
  const roleIcon = { Admin: "👑", Technicien: "🔧", Utilisateur: "👤" }[currentUser.role];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f5f7fb", minHeight: "100vh", color: COLORS.text }}>
      {modal && <ModalValidation reservation={modal.reservation} action={modal.action} onConfirm={handleConfirm} onClose={() => setModal(null)} />}
      {showReservForm && <FormulaireReservation currentUser={currentUser} onSubmit={(d) => { setReservations(r => [...r, { ...d, id: r.length + 1 }]); setShowReservForm(false); }} onClose={() => setShowReservForm(false)} />}

      <div style={{ background: COLORS.primary, padding: "0 24px", display: "flex", alignItems: "center", gap: 12, height: 56 }}>
        <div style={{ background: "#fff", borderRadius: 8, width: 44, height: 34, display: "flex", alignItems: "center", justifyContent: "center", padding: "2px 4px" }}>
          <img src={LOGO_URL} alt="France Judo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        </div>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Services Généraux — France Judo</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{currentUser.prenom}</div>
            <div style={{ fontSize: 11, color: "#93c5fd" }}>{roleIcon} {currentUser.role}</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: roleColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>
            {currentUser.prenom[0]}
          </div>
          <button onClick={() => { setCurrentUser(null); setTab("dashboard"); }}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, color: "#fff", padding: "4px 10px", cursor: "pointer", fontSize: 12 }}>
            Déconnexion
          </button>
        </div>
      </div>

      <div style={{ background: COLORS.white, borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px", display: "flex", gap: 2, overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "14px 16px", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? COLORS.primary : COLORS.muted, borderBottom: tab === t.id ? `3px solid ${COLORS.primary}` : "3px solid transparent", whiteSpace: "nowrap" }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>

        {tab === "dashboard" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Tableau de bord</h2>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                { label: "En attente de validation", value: reservations.filter(r => r.statut === "En attente").length, color: COLORS.warning, icon: "⏳" },
                { label: "Articles en catalogue", value: Object.values(MATERIEL_PAR_CAT).flat().length, color: COLORS.primary, icon: "📦" },
                { label: "Équipements suivis", value: EQUIPEMENTS_DATA.length, color: COLORS.primary, icon: "🔧" },
                { label: "Maintenances urgentes", value: maintenances.filter(m => m.priorite === "Urgente" && m.statut !== "Terminée").length, color: COLORS.danger, icon: "🔴" },
              ].map(s => (
                <Card key={s.label} style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.muted, marginTop: 2 }}>{s.label}</div>
                </Card>
              ))}
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <Card style={{ flex: 2, minWidth: 300 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Dernières réservations</h3>
                {reservations.slice(-5).reverse().map(r => (
                  <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{r.evenement}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>{r.demandeur} · {fmtDate(r.dateDebut)}</div>
                    </div>
                    {sBadge(r.statut)}
                  </div>
                ))}
              </Card>
              <Card style={{ flex: 1, minWidth: 240 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Maintenances actives</h3>
                {maintenances.filter(m => m.statut !== "Terminée").map(m => (
                  <div key={m.id} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{m.equipement}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>{m.planifiee} · {m.type}</div>
                    <div style={{ marginTop: 4 }}>{sBadge(m.statut)}</div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}

        {tab === "reservations" && (
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
                          {!isUser && <td style={{ padding: "12px", fontWeight: 500 }}>{r.demandeur}</td>}
                          <td style={{ padding: "12px", fontWeight: 600 }}>{r.evenement}</td>
                          <td style={{ padding: "12px", fontSize: 12, color: COLORS.muted }}>{r.lignes?.map((l, i) => <div key={i}>{l.nom} × {l.qte}</div>)}</td>
                          <td style={{ padding: "12px", fontSize: 13 }}>{r.site}</td>
                          <td style={{ padding: "12px", fontSize: 12, whiteSpace: "nowrap" }}>{fmtDate(r.dateDebut)}</td>
                          <td style={{ padding: "12px", fontSize: 12, whiteSpace: "nowrap" }}>{fmtDate(r.dateFin)}</td>
                          <td style={{ padding: "12px" }}>{sBadge(r.statut)}</td>
                          <td style={{ padding: "12px", fontSize: 12, color: COLORS.muted, maxWidth: 200 }}>{r.commentaire || <span style={{ fontStyle: "italic" }}>—</span>}</td>
                          {isAdmin && (
                            <td style={{ padding: "12px" }}>
                              {r.statut === "En attente" && (
                                <div style={{ display: "flex", gap: 6 }}>
                                  <button style={btnS} onClick={() => setModal({ reservation: r, action: "valider" })}>✓</button>
                                  <button style={btnD} onClick={() => setModal({ reservation: r, action: "refuser" })}>✗</button>
                                </div>
                              )}
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

        {tab === "materiel" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Catalogue matériel</h2>
            {Object.entries(MATERIEL_PAR_CAT).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 15 }}>{cat}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
                  {items.map(m => (
                    <Card key={m.id}>
                      <div style={{ fontWeight: 700, marginBottom: 10 }}>{m.nom}</div>
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

        {tab === "equipements" && !isUser && (
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
                        <td style={{ padding: "12px", fontSize: 13 }}>{e.batiment}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: COLORS.muted }}>{e.espace}</td>
                        <td style={{ padding: "12px", fontSize: 12, color: COLORS.muted }}>{e.serie}</td>
                        <td style={{ padding: "12px" }}>{sBadge(e.etat)}</td>
                        <td style={{ padding: "12px", fontSize: 13 }}>{e.preventif}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: new Date(e.finGarantie) < new Date() ? COLORS.danger : COLORS.muted }}>{e.finGarantie}</td>
                        <td style={{ padding: "12px", fontSize: 13 }}>{e.prestataire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {tab === "espaces" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Espaces & bâtiments</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {ESPACES_DATA.map(e => (
                <Card key={e.id}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{e.nom}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>{e.batiment} · {e.site} · Réf. {e.ref}</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <div style={{ background: COLORS.light, borderRadius: 8, padding: "6px 12px", flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary }}>{e.surface}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>m²</div>
                    </div>
                    <div style={{ background: COLORS.light, borderRadius: 8, padding: "6px 12px", flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary }}>{e.etage}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>Étage</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ ...btnG, fontSize: 12, padding: "5px 10px", flex: 1 }}>📷 Photos</button>
                    <button style={{ ...btnG, fontSize: 12, padding: "5px 10px", flex: 1 }}>🔧 Interventions</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === "maintenance" && (
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
                      <optgroup label="Équipements">{EQUIPEMENTS_DATA.map(eq => <option key={eq.id}>{eq.nom}</option>)}</optgroup>
                      <optgroup label="Espaces">{ESPACES_DATA.map(es => <option key={"e"+es.id}>{es.nom}</option>)}</optgroup>
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
                        {PRESTATAIRES_DATA.map(p => <option key={p.id}>{p.nom}</option>)}
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
                    <div style={{ fontSize: 13, marginTop: 6 }}>📅 {m.planifiee}</div>
                    <div style={{ marginTop: 10 }}>{sBadge(m.statut)}</div>
                  </Card>
                ))}
              </div>
            }
          </div>
        )}

        {tab === "prestataires" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Prestataires & intervenants</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 16 }}>
              {PRESTATAIRES_DATA.map(p => (
                <Card key={p.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{p.nom}</div>
                    <Badge label={p.specialite} color="info" />
                  </div>
                  <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 4, color: COLORS.muted }}>
                    {p.contact && <div>👤 {p.contact}</div>}
                    {p.email && <div>✉️ <a href={`mailto:${p.email}`} style={{ color: COLORS.primary }}>{p.email}</a></div>}
                    {p.tel && <div>📞 {p.tel}</div>}
                    {p.finContrat && <div style={{ color: new Date(p.finContrat) < new Date() ? COLORS.danger : COLORS.muted, marginTop: 4 }}>📋 Contrat jusqu'au {p.finContrat}</div>}
                  </div>
                </Card>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 12, background: "#fef9c3", borderRadius: 8, fontSize: 13, color: "#92400e" }}>
              ℹ️ Les 18 prestataires seront chargés depuis le fichier Excel SharePoint (LOGICIEL_SG.xlsx) une fois la connexion Microsoft activée.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}