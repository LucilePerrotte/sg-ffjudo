import { useState, useEffect } from "react";

const SUPABASE_URL = "https://ljwqdsoqwwqetlqmoyks.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqd3Fkc29nd3dxZXRscW1veWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDAxMjEsImV4cCI6MjA5ODMxNjEyMX0.Z-ZQD87GQvxLTIzb1GPzeDG7sCI55sXZfVzaVh39wvU";

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

const USERS_DB = [
  {const USERS_DB = [
  { id: "1", nom: "Lucile Perrotte", prenom: "Lucile", email: "lucile.perrotte@ffjudo.com", role: "Admin", password: "sg2025" },
  { id: "2", nom: "Michael Argot", prenom: "Michael", email: "michael.argot@ffjudo.com", role: "Technicien", password: "tech2025" },
  { id: "3", nom: "Jacob Adjovi", prenom: "Jacob", email: "jacob.adjovi@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "4", nom: "Jérémie Alanhi", prenom: "Jérémie", email: "jeremie.alanhi@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "5", nom: "Virginie Amaté", prenom: "Virginie", email: "virginie.amate@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "6", nom: "Bertrand Amoussou", prenom: "Bertrand", email: "bertrand.amoussou@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "7", nom: "Céline Andrieux", prenom: "Céline", email: "celine.andrieux@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "8", nom: "Catherine Arnaud", prenom: "Catherine", email: "cathy.arnaud@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "9", nom: "Stéphane Auduc", prenom: "Stéphane", email: "auduc.s@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "10", nom: "Schaïnez Aurey", prenom: "Schaïnez", email: "schainez.aurey@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "11", nom: "Thimothé Baroudel", prenom: "Thimothé", email: "thimothe.baroudel@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "12", nom: "Magali Baton", prenom: "Magali", email: "magali.baton@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "13", nom: "Ihssen Ben Aicha", prenom: "Ihssen", email: "ihssen.nemri@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "14", nom: "Leïla Benaboud", prenom: "Leïla", email: "leila.benaboud@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "15", nom: "Fabien Bonal", prenom: "Fabien", email: "fabien.bonal@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "16", nom: "Pénélope Bonna", prenom: "Pénélope", email: "penelope.bonna@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "17", nom: "Astrid Boudry", prenom: "Astrid", email: "astrid.boudry@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "18", nom: "Inès Bouheben", prenom: "Inès", email: "ines.bouheben@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "19", nom: "Boris Bourgogne", prenom: "Boris", email: "bourgogne.boris@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "20", nom: "Pascal Bourouma", prenom: "Pascal", email: "pascal.bourouma@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "21", nom: "Jean-Luc Bouvier", prenom: "Jean-Luc", email: "jl.bouvier@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "22", nom: "Christophe Brunet", prenom: "Christophe", email: "christophe.brunet@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "23", nom: "Dominique Burgos", prenom: "Dominique", email: "dominique.burgos@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "24", nom: "Sophie Burguès", prenom: "Sophie", email: "sophie.burgues@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "25", nom: "Gizem Caner Wan", prenom: "Gizem", email: "gizem.caner@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "26", nom: "Thierry Caquineau", prenom: "Thierry", email: "thierry.caquineau@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "27", nom: "Pascal Caron", prenom: "Pascal", email: "pascal.caron@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "28", nom: "Olivier Cartonnet", prenom: "Olivier", email: "olivier.cartonnet@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "29", nom: "Caroline Cavenel", prenom: "Caroline", email: "caroline.cavenel@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "30", nom: "Mathias Chauvet", prenom: "Mathias", email: "mathias.chauvet@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "31", nom: "Alexane Chauvin", prenom: "Alexane", email: "alexane.chauvin@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "32", nom: "Thomas Ciapa-Carvaillo", prenom: "Thomas", email: "tciapacarvaillo@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "33", nom: "Marion Coatmeur", prenom: "Marion", email: "marion.coatmeur@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "34", nom: "Baptiste Coeur", prenom: "Baptiste", email: "baptiste.coeur@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "35", nom: "Chrystelle Cogen", prenom: "Chrystelle", email: "chrystelle.cogen@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "36", nom: "Aline Cointrel Porzucek", prenom: "Aline", email: "aline.cointrel@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "37", nom: "Laurie-Anne Cologon", prenom: "Laurie-Anne", email: "laurie-anne.huang@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "38", nom: "Paul Cueto Almaguer", prenom: "Paul", email: "paul.cueto@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "39", nom: "Mercédès De Castro", prenom: "Mercédès", email: "mercedes.decastro@sfr.fr", role: "Utilisateur", password: "2026" },
  { id: "40", nom: "Édouard De Laforcade", prenom: "Édouard", email: "edouard.delaforcade@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "41", nom: "Xavier Delepine", prenom: "Xavier", email: "xavier.delepine@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "42", nom: "Lucas Delpierre", prenom: "Lucas", email: "lucas.delpierre@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "43", nom: "Clément Delvert", prenom: "Clément", email: "clement-delvert@hotmail.fr", role: "Utilisateur", password: "2026" },
  { id: "44", nom: "Frédéric Demontfaucon", prenom: "Frédéric", email: "frederic.demontfaucon@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "45", nom: "Maeëlle Di Cintio", prenom: "Maeëlle", email: "maelle.dicintio@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "46", nom: "Jérôme Droissart", prenom: "Jérôme", email: "jerome.droissart@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "47", nom: "Bastien Dumas", prenom: "Bastien", email: "bastien.dumas@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "48", nom: "Estelle Dupetit", prenom: "Estelle", email: "estelle.dupetit@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "49", nom: "Romain Duriez", prenom: "Romain", email: "romain.duriez@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "50", nom: "Éric Fauroux", prenom: "Éric", email: "eric.fauroux@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "51", nom: "Olivier Fayolle", prenom: "Olivier", email: "olivier.fayolle@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "52", nom: "Cécilia Ferreira Goncalves", prenom: "Cécilia", email: "cecilia.goncalves@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "53", nom: "Sylvain Firmin", prenom: "Sylvain", email: "sylvain.firmin@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "54", nom: "Bertrand Flandrin", prenom: "Bertrand", email: "bertrand.flandrin@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "55", nom: "Marion Foltz", prenom: "Marion", email: "marion.foltz@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "56", nom: "Aurélie Fontaine", prenom: "Aurélie", email: "aurelie.fontaine@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "57", nom: "Nathan Ginga", prenom: "Nathan", email: "nathan.ginga@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "58", nom: "Aurore Guislain", prenom: "Aurore", email: "aurore.guislain@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "59", nom: "Amir Haddad", prenom: "Amir", email: "amir.haddad@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "60", nom: "Sabrina Hammoumraoui", prenom: "Sabrina", email: "sabrina.hammoumraoui@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "61", nom: "Emma Herminet-Chapuis", prenom: "Emma", email: "emma.chapuis@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "62", nom: "Christophe Hersant", prenom: "Christophe", email: "christophe.hersant@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "63", nom: "Jérémie Hourcan", prenom: "Jérémie", email: "jeremie.hourcan@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "64", nom: "Franck Housset", prenom: "Franck", email: "franck.housset@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "65", nom: "Automne Iddir Pavia", prenom: "Automne", email: "automne.pavia@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "66", nom: "Inès Infray", prenom: "Inès", email: "infray.ines@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "67", nom: "Arriles Issaad", prenom: "Arriles", email: "arriles.issaad@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "68", nom: "Maëlle Jarmuzek", prenom: "Maëlle", email: "maelle.jarmuzek@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "69", nom: "Benoit Joaquim", prenom: "Benoit", email: "benoit.joaquim@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "70", nom: "Ruben Ketcha", prenom: "Ruben", email: "ruben.ketcha@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "71", nom: "Corentin Koenig", prenom: "Corentin", email: "corentin.koenig@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "72", nom: "Franklin Kongbang", prenom: "Franklin", email: "franklin.kongbang@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "73", nom: "Mélanie Kouadio", prenom: "Mélanie", email: "melanie.kouadio@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "74", nom: "David Lajeuncomme", prenom: "David", email: "david.lajeuncomme@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "75", nom: "Jean-Noël Lamouroux", prenom: "Jean-Noël", email: "jean-noel.lamouroux@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "76", nom: "Jeanne Laplaud", prenom: "Jeanne", email: "jeanne.laplaud@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "77", nom: "David Larose", prenom: "David", email: "david.larose@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "78", nom: "Jean-Luc Las", prenom: "Jean-Luc", email: "jean-luc.las@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "79", nom: "Isabelle Lasnel", prenom: "Isabelle", email: "isabelle.lasnel@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "80", nom: "Natalia Le Belguet", prenom: "Natalia", email: "natalia.lebelguet@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "81", nom: "Damien Le Bour", prenom: "Damien", email: "damien.lebour@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "82", nom: "Anthony Le Flem", prenom: "Anthony", email: "anthony.leflem@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "83", nom: "Arnaud Lecellier", prenom: "Arnaud", email: "arnaud.lecellier@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "84", nom: "Clémence Lecouturier", prenom: "Clémence", email: "lecouturierclemence@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "85", nom: "Soizic Lemeteyer", prenom: "Soizic", email: "soizic.lemeteyer@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "86", nom: "Joachim Leprêtre", prenom: "Joachim", email: "lepretre.joachim@outlook.fr", role: "Utilisateur", password: "2026" },
  { id: "87", nom: "Aïcha Maali", prenom: "Aïcha", email: "aicha.maali@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "88", nom: "Aubry Mahé", prenom: "Aubry", email: "aubry.mahe@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "89", nom: "Marianne Maréchal", prenom: "Marianne", email: "marianne.marechal@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "90", nom: "Cyrille Maret", prenom: "Cyrille", email: "Maretcyrille100@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "91", nom: "Arnaud Martin", prenom: "Arnaud", email: "arnaud.martin@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "92", nom: "Amaury Martineau", prenom: "Amaury", email: "amaury.martineau@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "93", nom: "Fanny Martinet", prenom: "Fanny", email: "fanny.martinet@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "94", nom: "Olivier Melicine", prenom: "Olivier", email: "olivier.melicine@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "95", nom: "Richard Melillo", prenom: "Richard", email: "richard.melillo@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "96", nom: "Alex Metin", prenom: "Alex", email: "alex.metin@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "97", nom: "Alexandra Morais", prenom: "Alexandra", email: "alexandra.morais@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "98", nom: "Jeannette Mvondo Mvondo", prenom: "Jeannette", email: "jeannette.mvondo@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "99", nom: "Tanguy Nieto", prenom: "Tanguy", email: "tanguy.nieto@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "100", nom: "Sébastien Nolesini", prenom: "Sébastien", email: "sebastien.nolesini@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "101", nom: "Benjamin Noury", prenom: "Benjamin", email: "benjamin.noury@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "102", nom: "Julien Parrot", prenom: "Julien", email: "julien.parrot@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "103", nom: "Laurent Peronne", prenom: "Laurent", email: "laurent.peronne@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "104", nom: "Stacy Pierre-Elies", prenom: "Stacy", email: "stacy.pierre-elies@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "105", nom: "Nicolas Poursines", prenom: "Nicolas", email: "nicolas.poursines@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "106", nom: "Louis Ragoucy", prenom: "Louis", email: "louis.ragoucy@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "107", nom: "Loïs Richerd", prenom: "Loïs", email: "lois.richerd@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "108", nom: "Aurélie Rostaing", prenom: "Aurélie", email: "aurelie.rostaing@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "109", nom: "Frédéric Roualen", prenom: "Frédéric", email: "frederic.roualen@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "110", nom: "Clémence Rouyer", prenom: "Clémence", email: "clemence.rouyer@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "111", nom: "Jean-Baptiste Saelens", prenom: "Jean-Baptiste", email: "jb.saelens@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "112", nom: "Shaïnès Sagna", prenom: "Shaïnès", email: "shaines.sagna@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "113", nom: "Perrine Saint Etienne", prenom: "Perrine", email: "perrine.saintetienne@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "114", nom: "Arnaud Seguin", prenom: "Arnaud", email: "arnaud.seguin@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "115", nom: "Somchareune Somsouthi", prenom: "Somchareune", email: "somsomsouthi410@gmail.com", role: "Utilisateur", password: "2026" },
  { id: "116", nom: "Louis Tesson", prenom: "Louis", email: "louis.tesson@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "117", nom: "Jessica Uzan", prenom: "Jessica", email: "jessica.uzan@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "118", nom: "Yasin Veseli", prenom: "Yasin", email: "yasin.veseli@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "119", nom: "Nikita Vieira", prenom: "Nikita", email: "nikita.vieira@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "120", nom: "Pedro Xisto", prenom: "Pedro", email: "pedro.xisto@ffjudo.com", role: "Utilisateur", password: "2026" },
  { id: "121", nom: "Alevtina Ziacas", prenom: "Alevtina", email: "alevtina.ziacas@ffjudo.com", role: "Utilisateur", password: "2026" },
];},
];

const EVENEMENTS_CATALOGUE = [
  "Séminaire direction", "Conférence de presse", "Formation arbitres",
  "Assemblée générale", "Tournoi régional", "Réunion de bureau",
  "Événement partenaire", "Stage technique", "Autre",
];

const MATERIEL_PAR_CAT = {
  "Mobilier": [
    { id: 1, nom: "Tables pliantes 180cm", qte: 25, disponible: 25, stockage: "Local technique", batiment: "Bât. C - Dojo de Paris" },
    { id: 2, nom: "Tables pliantes 120cm", qte: 2, disponible: 2, stockage: "Local technique", batiment: "Bât. C - Dojo de Paris" },
    { id: 3, nom: "Chaises empilables", qte: 150, disponible: 150, stockage: "Local technique", batiment: "Bât. C - Dojo de Paris" },
    { id: 4, nom: "Pupitre orateur", qte: 2, disponible: 2, stockage: "Stockage -3", batiment: "Bât. C - Dojo de Paris" },
    { id: 5, nom: "Mange debout carré (Dojo)", qte: 10, disponible: 10, stockage: "Stockage -3", batiment: "Bât. C - Dojo de Paris" },
    { id: 6, nom: "Mange debout carré (VIP)", qte: 4, disponible: 4, stockage: "Espace VIP", batiment: "Grand Dôme" },
    { id: 7, nom: "Fauteuil VIP beige", qte: 6, disponible: 6, stockage: "Espace VIP", batiment: "Grand Dôme" },
    { id: 8, nom: "Table basse vitrée / or", qte: 3, disponible: 3, stockage: "Espace VIP", batiment: "Grand Dôme" },
  ],
  "AV-Technique": [
    { id: 9, nom: "Écran 75 pouces", qte: 2, disponible: 2, stockage: "", batiment: "" },
    { id: 10, nom: "Écran 55 pouces", qte: 25, disponible: 25, stockage: "Espace stockage A", batiment: "Grand Dôme" },
    { id: 11, nom: "Pied pour écran", qte: 16, disponible: 16, stockage: "Espace stockage A", batiment: "Grand Dôme" },
    { id: 12, nom: "Vidéoprojecteur", qte: 3, disponible: 3, stockage: "", batiment: "" },
    { id: 13, nom: "Écran de projection", qte: 2, disponible: 2, stockage: "", batiment: "" },
    { id: 14, nom: "Sonorisation portable (enceinte + 1 micro)", qte: 2, disponible: 2, stockage: "Stockage -3", batiment: "Bât. C - Dojo de Paris" },
    { id: 15, nom: "Rallonges électriques (lot 25m)", qte: 8, disponible: 8, stockage: "", batiment: "" },
    { id: 16, nom: "Box LED color (lot de 6)", qte: 6, disponible: 6, stockage: "Espace stockage A", batiment: "Grand Dôme" },
    { id: 17, nom: "Arbitrage vidéo (lot pour 1 tapis)", qte: 8, disponible: 8, stockage: "Espace stockage A", batiment: "Grand Dôme" },
    { id: 18, nom: "Système commissaire sportif (lot pour 1 tapis)", qte: 16, disponible: 16, stockage: "Espace stockage A", batiment: "Grand Dôme" },
  ],
  "Sportif": [
    { id: 19, nom: "Tatami rouge", qte: 200, disponible: 200, stockage: "Stockage -3", batiment: "Bât. C - Dojo de Paris" },
    { id: 20, nom: "Tatami blanc", qte: 150, disponible: 150, stockage: "Stockage -3", batiment: "Bât. C - Dojo de Paris" },
    { id: 21, nom: "Tatami bleu", qte: 200, disponible: 200, stockage: "Espace stockage A", batiment: "Grand Dôme" },
    { id: 22, nom: "Tatami jaune", qte: 200, disponible: 200, stockage: "Espace stockage A", batiment: "Grand Dôme" },
    { id: 23, nom: "Bandeaux LED", qte: 68, disponible: 68, stockage: "Espace stockage A", batiment: "Grand Dôme" },
  ],
  "Signalétique": [
    { id: 24, nom: "Barrières Vauban", qte: 100, disponible: 100, stockage: "Plateau principal", batiment: "Grand Dôme" },
    { id: 25, nom: "Kakémonos digitaux", qte: 4, disponible: 4, stockage: "Espace stockage A", batiment: "Grand Dôme" },
  ],
};

const EQUIPEMENTS_DATA = [
  { id: 1, nom: "CTA", categorie: "CVC", batiment: "", espace: "", serie: "CTA-2021-001", dateAchat: "2021-06-01", finGarantie: "2024-06-01", etat: "Bon", preventif: "Trimestriel", prestataire: "Atalian Maintenance & Energy" },
  { id: 2, nom: "Ballons eau chaude", categorie: "CVC", batiment: "", espace: "", serie: "CHAUD-2018-A", dateAchat: "2018-03-15", finGarantie: "2021-03-15", etat: "À surveiller", preventif: "Annuel", prestataire: "Powesco" },
  { id: 3, nom: "Tableau électrique SIE", categorie: "Électricité", batiment: "Bât. A – Bureaux", espace: "Siège Fédération", serie: "ELEC-TGT-A", dateAchat: "2015-01-01", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "Électricité ?" },
  { id: 4, nom: "Tableau électrique DOP", categorie: "Électricité", batiment: "Bât. C - Dojo de Paris", espace: "Dojo de Paris", serie: "ELEC-TGT-B", dateAchat: "2019-06-01", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "Électricité ?" },
  { id: 5, nom: "Tableau électrique VLB", categorie: "Électricité", batiment: "Grand Dôme", espace: "Grand Dôme de Villebon", serie: "ELEC-TGT-S2", dateAchat: "2020-11-01", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "Électricité ?" },
  { id: 6, nom: "Groupe électrogène – Bât. B", categorie: "Électricité", batiment: "", espace: "", serie: "GE-2020-001", dateAchat: "2020-05-01", finGarantie: "2023-05-01", etat: "Bon", preventif: "Semestriel", prestataire: "" },
  { id: 7, nom: "Éclairage de sécurité SIE", categorie: "Sécurité", batiment: "Bât. A – Bureaux", espace: "Siège Fédération", serie: "BAES-ESP05", dateAchat: "", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
  { id: 8, nom: "Éclairage de sécurité DOP", categorie: "Sécurité", batiment: "Bât. C - Dojo de Paris", espace: "Dojo de Paris", serie: "BAES-ESP10", dateAchat: "", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
  { id: 9, nom: "Éclairage de sécurité VLB", categorie: "Sécurité", batiment: "Grand Dôme", espace: "Grand Dôme de Villebon", serie: "BAES-ESP16", dateAchat: "", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
  { id: 10, nom: "Extincteurs DOP", categorie: "Sécurité", batiment: "Bât. C - Dojo de Paris", espace: "Dojo de Paris", serie: "EXT-A-2022", dateAchat: "2022-01-01", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
  { id: 11, nom: "Extincteurs SIE", categorie: "Sécurité", batiment: "Bât. A – Bureaux", espace: "Siège Fédération", serie: "EXT-B-2022", dateAchat: "2022-01-01", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
  { id: 12, nom: "Extincteurs VLB", categorie: "Sécurité", batiment: "Grand Dôme", espace: "Grand Dôme de Villebon", serie: "EXT-S2-2022", dateAchat: "2022-01-01", finGarantie: "", etat: "Bon", preventif: "Annuel", prestataire: "IPSI" },
  { id: 13, nom: "Robinetterie SIE", categorie: "Plomberie", batiment: "Bât. A – Bureaux", espace: "Siège Fédération", serie: "", dateAchat: "", finGarantie: "", etat: "À surveiller", preventif: "", prestataire: "DOUVENEAU" },
  { id: 14, nom: "Robinetterie DOP", categorie: "Plomberie", batiment: "Grand Dôme", espace: "", serie: "", dateAchat: "", finGarantie: "", etat: "Bon", preventif: "", prestataire: "DOUVENEAU" },
  { id: 15, nom: "Robinetterie VLB", categorie: "Plomberie", batiment: "Grand Dôme", espace: "", serie: "", dateAchat: "", finGarantie: "", etat: "Bon", preventif: "", prestataire: "DOUVENEAU" },
  { id: 16, nom: "Sonorisation Awazu", categorie: "Sportif", batiment: "Bât. B – Awazu", espace: "Dojo Awazu", serie: "SONO-2019-B", dateAchat: "2019-10-01", finGarantie: "2022-10-01", etat: "Bon", preventif: "Non", prestataire: "Magnum" },
  { id: 17, nom: "Sonorisation DOP", categorie: "Sportif", batiment: "Bât. C - Dojo de Paris", espace: "Dojo de Paris", serie: "SONO-2017-DJ", dateAchat: "2017-05-01", finGarantie: "", etat: "À surveiller", preventif: "Non", prestataire: "Magnum" },
  { id: 18, nom: "Ascenseurs SIE", categorie: "Autre", batiment: "Bât. A – Bureaux", espace: "Siège Fédération", serie: "ASC-A-2016", dateAchat: "2016-09-01", finGarantie: "", etat: "Bon", preventif: "Semestriel", prestataire: "OTIS" },
  { id: 19, nom: "Ascenseurs DOP", categorie: "Autre", batiment: "Bât. C - Dojo de Paris", espace: "Dojo de Paris", serie: "", dateAchat: "", finGarantie: "", etat: "", preventif: "", prestataire: "OTIS" },
  { id: 20, nom: "Ascenseurs Awazu", categorie: "Autre", batiment: "Bât. B – Awazu", espace: "Dojo Awazu", serie: "", dateAchat: "", finGarantie: "", etat: "", preventif: "", prestataire: "OTIS" },
  { id: 21, nom: "Nettoyeur haute pression", categorie: "Autre", batiment: "", espace: "", serie: "NHP-2022", dateAchat: "2022-08-01", finGarantie: "2024-08-01", etat: "Hors service", preventif: "Non", prestataire: "" },
  { id: 22, nom: "Autolaveuse sol", categorie: "Autre", batiment: "", espace: "", serie: "AUTOL-2019", dateAchat: "2019-04-01", finGarantie: "", etat: "À surveiller", preventif: "Non", prestataire: "" },
  { id: 23, nom: "Portail entrée", categorie: "Sécurité", batiment: "Grand Dôme", espace: "Parking", serie: "", dateAchat: "", finGarantie: "", etat: "Hors service", preventif: "", prestataire: "Secure IP" },
  { id: 24, nom: "Dalle LED 60×60 (Bon)", categorie: "Éclairage", batiment: "", espace: "", serie: "", dateAchat: "", finGarantie: "", etat: "Bon", preventif: "", prestataire: "Ledkia" },
  { id: 25, nom: "Dalle LED 60×60 (HS)", categorie: "Éclairage", batiment: "", espace: "", serie: "", dateAchat: "", finGarantie: "", etat: "Hors service", preventif: "", prestataire: "Ledkia" },
  { id: 26, nom: "Babyfoot (Awazu)", categorie: "Loisirs", batiment: "Bât. B – Awazu", espace: "Cantine Dojo Academy", serie: "", dateAchat: "", finGarantie: "", etat: "", preventif: "", prestataire: "" },
  { id: 27, nom: "Babyfoot (Bureaux)", categorie: "Loisirs", batiment: "Bât. A – Bureaux", espace: "Entresol", serie: "", dateAchat: "", finGarantie: "", etat: "", preventif: "", prestataire: "" },
];

const ESPACES_DATA = [
  { id: 1, nom: "Accueil principal", batiment: "Bât. A – Bureaux", etage: "RDC", surface: null, site: "Paris", ref: "ESP-A001", contact: "" },
  { id: 2, nom: "Bureau Mathias Chauvet", batiment: "Bât. A – Bureaux", etage: "RDC", surface: null, site: "Paris", ref: "ESP-A002", contact: "" },
  { id: 3, nom: "Bureau Cécilia", batiment: "Bât. A – Bureaux", etage: "RDC", surface: null, site: "Paris", ref: "ESP-A003", contact: "" },
  { id: 4, nom: "Reprographie", batiment: "Bât. A – Bureaux", etage: "RDC", surface: null, site: "Paris", ref: "ESP-A003", contact: "" },
  { id: 5, nom: "Sanitaires Hommes", batiment: "Bât. A – Bureaux", etage: "RDC", surface: null, site: "Paris", ref: "ESP-A004", contact: "" },
  { id: 6, nom: "Sanitaires Femmes", batiment: "Bât. A – Bureaux", etage: "RDC", surface: null, site: "Paris", ref: "ESP-A005", contact: "" },
  { id: 7, nom: "Entresol", batiment: "Bât. A – Bureaux", etage: "Entresol", surface: 300, site: "Paris", ref: "ESP-AE01", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 8, nom: "Sanitaires Hommes", batiment: "Bât. A – Bureaux", etage: "Entresol", surface: 80, site: "Paris", ref: "ESP-AE02", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 9, nom: "Sanitaires Femmes", batiment: "Bât. A – Bureaux", etage: "Entresol", surface: null, site: "Paris", ref: "ESP-AE03", contact: "" },
  { id: 10, nom: "Local CSE", batiment: "Bât. A – Bureaux", etage: "Entresol", surface: 80, site: "Paris", ref: "ESP-AE04", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 11, nom: "Salle à manger", batiment: "Bât. A – Bureaux", etage: "R+1", surface: 30, site: "Paris", ref: "ESP-A101", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 12, nom: "Cuisine", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A102", contact: "" },
  { id: 13, nom: "Bureau Larbi Benboudaoud / Bastien Puget", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A103", contact: "" },
  { id: 14, nom: "Bureau Frédérique Jossinet", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A104", contact: "" },
  { id: 15, nom: "Bureau Sébastien Nolesini", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-105", contact: "" },
  { id: 16, nom: "Bureau DTN", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-106", contact: "" },
  { id: 17, nom: "Bureau Sébastien Mansois", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A107", contact: "" },
  { id: 18, nom: "Reprographie", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A108", contact: "" },
  { id: 19, nom: "Sanitaires DTN", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A109", contact: "" },
  { id: 20, nom: "Salle de réunion Prestige", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A110", contact: "" },
  { id: 21, nom: "Bureau International", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A111", contact: "" },
  { id: 22, nom: "Bureau Margot Deniau-Rosato", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A112", contact: "" },
  { id: 23, nom: "Bureau Stéphane Nomis", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A113", contact: "" },
  { id: 24, nom: "Salon Prestige", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A114", contact: "" },
  { id: 25, nom: "Local Boissons - Salon Prestige", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A115", contact: "" },
  { id: 26, nom: "Local Stockage - Couloir", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A116", contact: "" },
  { id: 27, nom: "Salle du Conseil", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A117", contact: "" },
  { id: 28, nom: "Cave", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A118", contact: "" },
  { id: 29, nom: "Sanitaires Hommes", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A119a", contact: "" },
  { id: 30, nom: "Sanitaires Femmes", batiment: "Bât. A – Bureaux", etage: "R+1", surface: null, site: "Paris", ref: "ESP-A119b", contact: "" },
  { id: 31, nom: "Salle F1", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A201a", contact: "" },
  { id: 32, nom: "Salle F2", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A201b", contact: "" },
  { id: 33, nom: "Salle F3", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A201c", contact: "" },
  { id: 34, nom: "Sanitaires Hommes", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A202a", contact: "" },
  { id: 35, nom: "Sanitaires Femmes", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A202b", contact: "" },
  { id: 36, nom: "Salon Budapest", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A203", contact: "" },
  { id: 37, nom: "Bureau Olivier Mélicine - Lionel Bonhomme", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A204", contact: "" },
  { id: 38, nom: "Bureau Coordo Formation", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A205", contact: "" },
  { id: 39, nom: "Local stockage Formation", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A206a", contact: "" },
  { id: 40, nom: "Local serveur", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A206b", contact: "" },
  { id: 41, nom: "Local stockage SG x2", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A207", contact: "" },
  { id: 42, nom: "Bureau Virginie Amaté", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A208", contact: "" },
  { id: 43, nom: "Local stockage Sportif", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A209", contact: "" },
  { id: 44, nom: "Bureau Com-Marketing Formation", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A210", contact: "" },
  { id: 45, nom: "Bureau Admin Formation", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A211", contact: "" },
  { id: 46, nom: "Local stockage CNKDR", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A212", contact: "" },
  { id: 47, nom: "Bureau Mikael Margerit", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A213", contact: "" },
  { id: 48, nom: "Bureau Michèle Lionnet", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A214", contact: "" },
  { id: 49, nom: "Bureau Pauline Camus", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A215", contact: "" },
  { id: 50, nom: "Bureau Aline Cointrel-Porcuzek", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A216", contact: "" },
  { id: 51, nom: "Bureau Sportif", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A217", contact: "" },
  { id: 52, nom: "Bureau de passage", batiment: "Bât. A – Bureaux", etage: "R+2", surface: null, site: "Paris", ref: "ESP-A218", contact: "" },
  { id: 53, nom: "Local stockage Sec.G &", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A301", contact: "" },
  { id: 54, nom: "Kodomo", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "", contact: "" },
  { id: 55, nom: "Bureau Communication", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A302", contact: "" },
  { id: 56, nom: "Bureau Astrid Boudry", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A303", contact: "" },
  { id: 57, nom: "Bureau Sec. G & CNKDR", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A304", contact: "" },
  { id: 58, nom: "Salle de réunion com", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A305", contact: "" },
  { id: 59, nom: "Sanitaires Rotonde", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A306", contact: "" },
  { id: 60, nom: "Bureau Magali Baton", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A307", contact: "" },
  { id: 61, nom: "Bureau Edouard de Laforcade", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A308", contact: "" },
  { id: 62, nom: "Bureau Juridique", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A309", contact: "" },
  { id: 63, nom: "Bureau Lucile Perrotte", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A310", contact: "" },
  { id: 64, nom: "Bureau Boutique Officielle", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A311", contact: "" },
  { id: 65, nom: "Bureau Loïs Richerd", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A312", contact: "" },
  { id: 66, nom: "Bureau Événementiel Privé", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A313", contact: "" },
  { id: 67, nom: "Bureau Licences", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A314", contact: "" },
  { id: 68, nom: "Bureau Informatique", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A315", contact: "" },
  { id: 69, nom: "Bureau Sponsoring, Mécénat & RSE", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A316", contact: "" },
  { id: 70, nom: "Bureau Événementiel Sportif", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A317", contact: "" },
  { id: 71, nom: "Bureau Comptabilité", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A318", contact: "" },
  { id: 72, nom: "Bureau Anthony Leflem", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A319", contact: "" },
  { id: 73, nom: "Bureau Sophie Burguès", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A320", contact: "" },
  { id: 74, nom: "Bureau Marianne Maréchal", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A321", contact: "" },
  { id: 75, nom: "Bureau Sabrina Hamoumraoui", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A322", contact: "" },
  { id: 76, nom: "Bureau RH & Paie", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A323", contact: "" },
  { id: 77, nom: "Bureau Charlotte Pietri", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A324", contact: "" },
  { id: 78, nom: "Salon Paris", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A325", contact: "" },
  { id: 79, nom: "Sanitaires Hommes", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A326a", contact: "" },
  { id: 80, nom: "Sanitaires Femmes", batiment: "Bât. A – Bureaux", etage: "R+3", surface: null, site: "Paris", ref: "ESP-A326b", contact: "" },
  { id: 81, nom: "Dojo Awazu", batiment: "Bât. B – Awazu", etage: "R-1", surface: 2500, site: "Paris", ref: "ESP-BR101", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 82, nom: "Studio", batiment: "Bât. B – Awazu", etage: "R-1", surface: 800, site: "Paris", ref: "ESP-BR102", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 83, nom: "Cabinet kinésithérapie", batiment: "Bât. B – Awazu", etage: "R-1", surface: 120, site: "Paris", ref: "ESP-BR103", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 84, nom: "Vestiaires & Sanitaires", batiment: "Bât. B – Awazu", etage: "R-1", surface: 120, site: "Paris", ref: "ESP-BR104", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 85, nom: "Tribunes", batiment: "Bât. B – Awazu", etage: "R-1", surface: 600, site: "Paris", ref: "ESP-BR105", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 86, nom: "Local formation", batiment: "Bât. B – Awazu", etage: "R-1", surface: null, site: "Paris", ref: "ESP-BR106", contact: "" },
  { id: 87, nom: "Local stockage - Awazu", batiment: "Bât. B – Awazu", etage: "R-1", surface: null, site: "Paris", ref: "ESP-BR107", contact: "" },
  { id: 88, nom: "Salle de musculation", batiment: "Bât. B – Awazu", etage: "R-1", surface: null, site: "Paris", ref: "ESP-BR108", contact: "" },
  { id: 89, nom: "Atelier", batiment: "Bât. B – Awazu", etage: "R-1", surface: null, site: "Paris", ref: "ESP-BR109", contact: "" },
  { id: 90, nom: "Bureau Entraîneurs", batiment: "Bât. B – Awazu", etage: "R-1", surface: null, site: "Paris", ref: "ESP-BR109", contact: "" },
  { id: 91, nom: "Archives", batiment: "Bât. B – Awazu", etage: "R-2", surface: null, site: "Paris", ref: "ESP-BR201", contact: "" },
  { id: 92, nom: "Local Serveur", batiment: "Bât. B – Awazu", etage: "R-2", surface: null, site: "Paris", ref: "ESP-BR202", contact: "" },
  { id: 93, nom: "Accueil Awazu", batiment: "Bât. B – Awazu", etage: "RDC", surface: null, site: "Paris", ref: "ESP-B001", contact: "" },
  { id: 94, nom: "Cantine Dojo Academy", batiment: "Bât. B – Awazu", etage: "RDC", surface: null, site: "Paris", ref: "ESP-B002a", contact: "" },
  { id: 95, nom: "Sanitaires - Cantine", batiment: "Bât. B – Awazu", etage: "RDC", surface: null, site: "Paris", ref: "ESP-B002b", contact: "" },
  { id: 96, nom: "Pièce annexe - Cantine", batiment: "Bât. B – Awazu", etage: "RDC", surface: null, site: "Paris", ref: "ESP-B002c", contact: "" },
  { id: 97, nom: "Local stockage - Cantine", batiment: "Bât. B – Awazu", etage: "RDC", surface: null, site: "Paris", ref: "ESP-B002d", contact: "" },
  { id: 98, nom: "Salon - Appartement", batiment: "Bât. B – Awazu", etage: "R+1", surface: null, site: "Paris", ref: "ESP-B101", contact: "" },
  { id: 99, nom: "Cuisine - Appartement", batiment: "Bât. B – Awazu", etage: "R+1", surface: null, site: "Paris", ref: "ESP-B102", contact: "" },
  { id: 100, nom: "Chambre 1 - Appartement", batiment: "Bât. B – Awazu", etage: "R+1", surface: null, site: "Paris", ref: "ESP-B103", contact: "" },
  { id: 101, nom: "Chambre 2 - Appartement", batiment: "Bât. B – Awazu", etage: "R+1", surface: null, site: "Paris", ref: "ESP-B104", contact: "" },
  { id: 102, nom: "Chambre 3 - Appartement", batiment: "Bât. B – Awazu", etage: "R+1", surface: null, site: "Paris", ref: "ESP-B105", contact: "" },
  { id: 103, nom: "Chambre 4 - Appartement", batiment: "Bât. B – Awazu", etage: "R+1", surface: null, site: "Paris", ref: "ESP-B106", contact: "" },
  { id: 104, nom: "Hall d'accueil", batiment: "Bât. C - Dojo de Paris", etage: "RDC", surface: 50, site: "Paris", ref: "ESP-C001", contact: "Marie Dupont – 06 XX XX XX XX" },
  { id: 105, nom: "Billetterie", batiment: "Bât. C - Dojo de Paris", etage: "RDC", surface: null, site: "Paris", ref: "ESP-C002", contact: "" },
  { id: 106, nom: "PC Sécurité", batiment: "Bât. C - Dojo de Paris", etage: "RDC", surface: null, site: "Paris", ref: "ESP-C003", contact: "" },
  { id: 107, nom: "Local stockage", batiment: "Bât. C - Dojo de Paris", etage: "RDC", surface: null, site: "Paris", ref: "ESP-C004", contact: "" },
  { id: 108, nom: "Bureau Chef établissement", batiment: "Bât. C - Dojo de Paris", etage: "RDC", surface: null, site: "Paris", ref: "ESP-C005", contact: "" },
  { id: 109, nom: "Sanitaires Hommes", batiment: "Bât. C - Dojo de Paris", etage: "RDC", surface: null, site: "Paris", ref: "ESP-C006a", contact: "" },
  { id: 110, nom: "Sanitaires Femmes", batiment: "Bât. C - Dojo de Paris", etage: "RDC", surface: null, site: "Paris", ref: "ESP-C006b", contact: "" },
  { id: 111, nom: "Vestiaires & Sanitaires - Entresol", batiment: "Bât. C - Dojo de Paris", etage: "Entresol", surface: null, site: "Paris", ref: "ESP-CE01", contact: "" },
  { id: 112, nom: "Local stockage Boutique", batiment: "Bât. C - Dojo de Paris", etage: "Entresol", surface: null, site: "Paris", ref: "ESP-CE02", contact: "" },
  { id: 113, nom: "Local ménage", batiment: "Bât. C - Dojo de Paris", etage: "Entresol", surface: null, site: "Paris", ref: "ESP-CE03", contact: "" },
  { id: 114, nom: "Salle production", batiment: "Bât. C - Dojo de Paris", etage: "Entresol", surface: null, site: "Paris", ref: "ESP-CE04", contact: "" },
  { id: 115, nom: "Vestiaires & Sanitaires", batiment: "Bât. C - Dojo de Paris", etage: "R-2", surface: null, site: "Paris", ref: "ESP-CR201", contact: "" },
  { id: 116, nom: "Salle de réunion", batiment: "Bât. C - Dojo de Paris", etage: "R-2", surface: null, site: "Paris", ref: "ESP-CR202", contact: "" },
  { id: 117, nom: "Salle de pesée", batiment: "Bât. C - Dojo de Paris", etage: "R-2", surface: null, site: "Paris", ref: "ESP-CR203", contact: "" },
  { id: 118, nom: "Plateau principal", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR101", contact: "" },
  { id: 119, nom: "Sanitaires", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR102", contact: "" },
  { id: 120, nom: "Vestiaire entraîneurs", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR103", contact: "" },
  { id: 121, nom: "Local CTA", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR104", contact: "" },
  { id: 122, nom: "Local technique", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR105", contact: "" },
  { id: 123, nom: "Local autolaveuse", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR106", contact: "" },
  { id: 124, nom: "Machinerie ascenseur", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR107", contact: "" },
  { id: 125, nom: "Local ménage", batiment: "Bât. C - Dojo de Paris", etage: "R-1", surface: null, site: "Paris", ref: "ESP-CR108", contact: "" },
  { id: 126, nom: "Cuisine", batiment: "Bât. C - Dojo de Paris", etage: "R+1", surface: null, site: "Paris", ref: "ESP-C101", contact: "" },
  { id: 127, nom: "Salle de restauration", batiment: "Bât. C - Dojo de Paris", etage: "R+1", surface: null, site: "Paris", ref: "ESP-C102", contact: "" },
  { id: 128, nom: "Tribunes", batiment: "Bât. C - Dojo de Paris", etage: "R+1", surface: null, site: "Paris", ref: "ESP-C103", contact: "" },
  { id: 129, nom: "Espace VIP", batiment: "Bât. C - Dojo de Paris", etage: "R+2", surface: null, site: "Paris", ref: "ESP-C201", contact: "" },
  { id: 130, nom: "Régie", batiment: "Bât. C - Dojo de Paris", etage: "R+3", surface: null, site: "Paris", ref: "ESP-C301", contact: "" },
  { id: 131, nom: "Stockage -3", batiment: "Bât. C - Dojo de Paris", etage: "R-3", surface: null, site: "Paris", ref: "ESP-CR301", contact: "" },
  { id: 132, nom: "Hall d'entrée", batiment: "Grand Dôme", etage: "RDC", surface: 2800, site: "Villebon", ref: "ESP-V001", contact: "Jean Martin – 06 XX XX XX XX" },
  { id: 133, nom: "Billetteries", batiment: "Grand Dôme", etage: "RDC", surface: 600, site: "Villebon", ref: "ESP-V002", contact: "Jean Martin – 06 XX XX XX XX" },
  { id: 134, nom: "Bureau Privé", batiment: "Grand Dôme", etage: "RDC", surface: 120, site: "Villebon", ref: "ESP-V003a", contact: "Jean Martin – 06 XX XX XX XX" },
  { id: 135, nom: "Bureau organisation", batiment: "Grand Dôme", etage: "RDC", surface: 120, site: "Villebon", ref: "ESP-V003b", contact: "Jean Martin – 06 XX XX XX XX" },
  { id: 136, nom: "Salle de réunion", batiment: "Grand Dôme", etage: "RDC", surface: 50, site: "Villebon", ref: "ESP-V003c", contact: "Jean Martin – 06 XX XX XX XX" },
  { id: 137, nom: "Salle de réunion", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V004a", contact: "" },
  { id: 138, nom: "Vestiaires - espace prod", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V004b", contact: "" },
  { id: 139, nom: "Espace stockage", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V005", contact: "" },
  { id: 140, nom: "Salle de restauration", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V006a", contact: "" },
  { id: 141, nom: "Cuisine", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V006b", contact: "" },
  { id: 142, nom: "Arrière-cuisine", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V006c", contact: "" },
  { id: 143, nom: "Espace stockage A", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V007a", contact: "" },
  { id: 144, nom: "Espace stockage B", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V007b", contact: "" },
  { id: 145, nom: "Vestiaires & sanitaires - sportif", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V008", contact: "" },
  { id: 146, nom: "PC Sécurité", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V009", contact: "" },
  { id: 147, nom: "Espace médical principal", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V010a", contact: "" },
  { id: 148, nom: "Espace médical annexe", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V010b", contact: "" },
  { id: 149, nom: "Espace VIP", batiment: "Grand Dôme", etage: "RDC", surface: null, site: "Villebon", ref: "ESP-V011", contact: "" },
  { id: 150, nom: "Sanitaires publics - buvette", batiment: "Grand Dôme", etage: "R+1", surface: null, site: "Villebon", ref: "ESP-V112a", contact: "" },
  { id: 151, nom: "Sanitaires publics - écran", batiment: "Grand Dôme", etage: "R+1", surface: null, site: "Villebon", ref: "ESP-V112b", contact: "" },
  { id: 152, nom: "Coursive R+1", batiment: "Grand Dôme", etage: "R+1", surface: null, site: "Villebon", ref: "ESP-V113", contact: "" },
  { id: 153, nom: "Tribunes", batiment: "Grand Dôme", etage: "R+1", surface: null, site: "Villebon", ref: "ESP-V114", contact: "" },
  { id: 154, nom: "Plateau principal", batiment: "Grand Dôme", etage: "R+1", surface: null, site: "Villebon", ref: "ESP-V115", contact: "" },
  { id: 155, nom: "Régie", batiment: "Grand Dôme", etage: "R+2", surface: null, site: "Villebon", ref: "ESP-V216", contact: "" },
  { id: 156, nom: "Espaces verts", batiment: "Grand Dôme", etage: "Extérieur", surface: null, site: "Villebon", ref: "", contact: "" },
  { id: 157, nom: "Parking", batiment: "Grand Dôme", etage: "Extérieur", surface: null, site: "Villebon", ref: "", contact: "" },
  { id: 158, nom: "Grand Dôme de Villebon", batiment: "Grand Dôme", etage: "", surface: null, site: "Villebon", ref: "", contact: "" },
  { id: 159, nom: "Dojo de Paris", batiment: "Bât. C - Dojo de Paris", etage: "", surface: null, site: "Paris", ref: "", contact: "" },
];

const PRESTATAIRES_DATA = [
  { id: 1, nom: "Adere", specialite: "Réseau", contact: "", email: "", tel: "", finContrat: "" },
  { id: 2, nom: "Arkonia", specialite: "Tous travaux", contact: "Jérémy Granger", email: "contact@arkonia.fr", tel: "06 36 48 36 71", finContrat: "" },
  { id: 3, nom: "Atalian Maintenance & Energy", specialite: "Maintenance GTB/CVC", contact: "Romain Milia", email: "", tel: "", finContrat: "" },
  { id: 4, nom: "CS+", specialite: "Manutention gros volumes - signalétique - transport", contact: "Tony Persehais", email: "tony.persehais@cs-plus.fr", tel: "06 46 30 92 21", finContrat: "" },
  { id: 5, nom: "DOUVENEAU", specialite: "Plomberie – chauffage", contact: "A Douveneau", email: "adouveaneau@gmail.com", tel: "06 32 67 44 61", finContrat: "" },
  { id: 6, nom: "Électricité ?", specialite: "Électricité – tableaux – mise en conformité", contact: "Karim Benali", email: "k.benali@egif.fr", tel: "06 XX XX XX XX", finContrat: "2025-06-30" },
  { id: 7, nom: "ETS - En toute sécurité", specialite: "Sécurité - surveillance", contact: "", email: "", tel: "", finContrat: "" },
  { id: 8, nom: "Green Recup", specialite: "Collecte déchets", contact: "-", email: "", tel: "01 48 03 26 78", finContrat: "" },
  { id: 9, nom: "GRP", specialite: "Nettoyage industriel – entretien", contact: "Sophie Blanc", email: "s.blanc@nps.fr", tel: "01 XX XX XX XX", finContrat: "2025-09-30" },
  { id: 10, nom: "IPSI", specialite: "Sécurité incendie – extincteurs – BAES", contact: "Pierre Lemaire", email: "p.lemaire@sfif.fr", tel: "01 XX XX XX XX", finContrat: "2025-12-31" },
  { id: 11, nom: "Ledkia", specialite: "Fourniture lumière", contact: "", email: "", tel: "", finContrat: "" },
  { id: 12, nom: "Magnum", specialite: "Sonorisation – audiovisuel – scénique", contact: "Gaetan", email: "f.dubois@sonoevent.fr", tel: "06 XX XX XX XX", finContrat: "2025-01-31" },
  { id: 13, nom: "OTIS", specialite: "Ascenseurs – maintenance réglementaire", contact: "Service client", email: "contrats@tkelevator.fr", tel: "0800 XX XX XX", finContrat: "2026-03-31" },
  { id: 14, nom: "Powesco", specialite: "CVC – climatisation – chauffage", contact: "Nathalie Roy", email: "n.roy@climasud.fr", tel: "06 XX XX XX XX", finContrat: "2024-12-31" },
  { id: 15, nom: "Secure IP", specialite: "Contrôle d'accès – interphonie – portails", contact: "David Chen", email: "d.chen@acp.fr", tel: "01 XX XX XX XX", finContrat: "2024-09-30" },
  { id: 16, nom: "SOCOTEC", specialite: "", contact: "", email: "", tel: "", finContrat: "" },
  { id: 17, nom: "Starnet Multiservices", specialite: "Nettoyage", contact: "Ricardo", email: "starnetmultiservices@outlook.com", tel: "06 13 96 35 35", finContrat: "2025-12-31" },
  { id: 18, nom: "Michael Argot", specialite: "Technicien polyvalent", contact: "", email: "michael.argot@ffjudo.com", tel: "", finContrat: "" },
];

const Badge = ({ label, color }) => {
  const c = { success: ["#dcfce7","#16a34a"], warning: ["#fef9c3","#b45309"], danger: ["#fee2e2","#dc2626"], info: ["#dbeafe","#1d4ed8"], muted: ["#f3f4f6","#6b7280"], orange: ["#ffedd5","#c2410c"] }[color] || ["#f3f4f6","#6b7280"];
  return <span style={{ background: c[0], color: c[1], padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{label}</span>;
};
const sBadge = (s) => {
  if (["Validée","Terminée","Bon"].includes(s)) return <Badge label={s} color="success" />;
  if (["En attente","Planifiée"].includes(s)) return <Badge label={s} color="info" />;
  if (s === "Refusée") return <Badge label={s} color="danger" />;
  if (["En cours","En maintenance","À surveiller"].includes(s)) return <Badge label={s} color="orange" />;
  if (s === "Hors service") return <Badge label={s} color="danger" />;
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

const FormulaireReservation = ({ currentUser, onSubmit, onClose }) => {
  const [evenement, setEvenement] = useState("");
  const [autreEvt, setAutreEvt] = useState("");
  const [site, setSite] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [selection, setSelection] = useState({});
  const [catOuverte, setCatOuverte] = useState(null);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async () => {
    if (!valid) return;
    setSaving(true);
    try {
      const res = await db.insert("reservations", {
        demandeur: currentUser.nom,
        user_id: null,
        evenement: evtFinal,
        site,
        date_debut: dateDebut,
        date_fin: dateFin,
        statut: "En attente",
        commentaire: "",
      });
      if (res && res[0]) {
        const resId = res[0].id;
        for (const l of lignes) {
          await db.insert("lignes_reservation", { reservation_id: resId, materiel_nom: l.nom, quantite: l.qte });
        }
        onSubmit({ ...res[0], lignes });
      }
    } catch(e) { console.error(e); }
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
            {Object.entries(MATERIEL_PAR_CAT).map(([cat, items]) => (
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
                      <button onClick={() => setQte(item.id, (selection[item.id] || 0) - 1)} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16 }}>−</button>
                      <span style={{ width: 32, textAlign: "center", fontWeight: 700, color: selection[item.id] ? COLORS.primary : COLORS.muted }}>{selection[item.id] || 0}</span>
                      <button onClick={() => setQte(item.id, Math.min((selection[item.id] || 0) + 1, item.disponible))} disabled={(selection[item.id] || 0) >= item.disponible}
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
          <button style={{ ...btnP, opacity: (valid && !saving) ? 1 : 0.5 }} disabled={!valid || saving} onClick={handleSubmit}>
            {saving ? "Envoi…" : "Envoyer la demande"}
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
      const [res, maint] = await Promise.all([
        db.get("reservations"),
        db.get("maintenances"),
      ]);
      // Charger les lignes pour chaque réservation
      const lignesAll = await db.get("lignes_reservation");
      const resAvecLignes = (res || []).map(r => ({
        ...r,
        lignes: (lignesAll || []).filter(l => l.reservation_id === r.id).map(l => ({ nom: l.materiel_nom, qte: l.quantite })),
        dateDebut: r.date_debut,
        dateFin: r.date_fin,
        commentaire: r.commentaire || "",
        statut: r.statut,
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
    setReservations(r => r.map(x => x.id === modal.reservation.id ? { ...x, statut: newStatut, commentaire: comment } : x));
    setModal(null);
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
  const filteredEq = EQUIPEMENTS_DATA.filter(e => e.nom.toLowerCase().includes(searchEq.toLowerCase()));
  const roleColor = { Admin: COLORS.accent, Technicien: "#7c3aed", Utilisateur: COLORS.success }[currentUser.role] || COLORS.muted;

  const EspacesView = () => {
    const [vue, setVue] = useState("liste");
    const [searchEsp, setSearchEsp] = useState("");
    const [filterBat, setFilterBat] = useState("Tous");
    const batiments = ["Tous", ...Array.from(new Set(ESPACES_DATA.map(e => e.batiment))).filter(Boolean)];
    const filtered = ESPACES_DATA.filter(e => (filterBat === "Tous" || e.batiment === filterBat) && e.nom.toLowerCase().includes(searchEsp.toLowerCase()));
    const parBatiment = batiments.filter(b => b !== "Tous").map(bat => ({ bat, espaces: ESPACES_DATA.filter(e => e.batiment === bat), site: ESPACES_DATA.find(e => e.batiment === bat)?.site || "" }));

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ margin: 0, color: COLORS.primary }}>Espaces & bâtiments <span style={{ fontSize: 14, color: COLORS.muted, fontWeight: 400 }}>({ESPACES_DATA.length} espaces)</span></h2>
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
                      {["Nom","Bâtiment","Site","Étage","Surface","Référence","Contact","Actions"].map(h => (
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
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button style={{ ...btnG, fontSize: 11, padding: "3px 8px" }}>📷</button>
                            <button style={{ ...btnG, fontSize: 11, padding: "3px 8px" }}>🔧</button>
                          </div>
                        </td>
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
      {showReservForm && <FormulaireReservation currentUser={currentUser} onSubmit={(d) => { setReservations(r => [...r, d]); setShowReservForm(false); }} onClose={() => setShowReservForm(false)} />}

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

        {!loading && tab === "materiel" && !isUser && (
          <div>
            <h2 style={{ marginBottom: 20, color: COLORS.primary }}>Catalogue matériel</h2>
            {Object.entries(MATERIEL_PAR_CAT).map(([cat, items]) => (
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
                        <td style={{ padding: "12px", fontSize: 13, color: e.finGarantie && new Date(e.finGarantie) < new Date() ? COLORS.danger : COLORS.muted }}>{e.finGarantie || "—"}</td>
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
                      <optgroup label="Équipements">{EQUIPEMENTS_DATA.map(eq => <option key={eq.id}>{eq.nom}</option>)}</optgroup>
                      <optgroup label="Espaces">{ESPACES_DATA.filter(e => e.ref).slice(0, 30).map(es => <option key={"e"+es.id}>{es.nom}</option>)}</optgroup>
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
              {PRESTATAIRES_DATA.map(p => (
                <Card key={p.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{p.nom}</div>
                    {p.specialite && <Badge label={p.specialite.substring(0, 20)} color="info" />}
                  </div>
                  <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 4, color: COLORS.muted }}>
                    {p.contact && p.contact !== "-" && <div>👤 {p.contact}</div>}
                    {p.email && <div>✉️ <a href={`mailto:${p.email}`} style={{ color: COLORS.primary }}>{p.email}</a></div>}
                    {p.tel && <div>📞 {p.tel}</div>}
                    {p.finContrat && <div style={{ color: new Date(p.finContrat) < new Date() ? COLORS.danger : COLORS.muted, marginTop: 4 }}>📋 Contrat jusqu'au {p.finContrat}</div>}
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