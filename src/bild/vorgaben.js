// Fachliche Vorgaben je Zell-Abbildung (Abb. 2) für das Lastenheft und für Lieferanten.
// elemente: Was im Bild zu sehen und beschriftet sein muss.
// stroeme:  Bedeutung jedes animierten Teilchenwegs (Name = data-strom in der SVG-Datei).

export const vorgaben = {
  koffein: {
    elemente: [
      'Raum zwischen Nervenzellen (synaptischer Spalt), Zone beschriftet',
      'Zellmembran der Nervenzelle als Lipid-Doppelschicht',
      'Drei Adenosin-Rezeptoren in der Membran, Bindetasche nach außen, einer beschriftet „Adenosin-Rezeptor“',
      'Hemmendes Signal („Bremssignal“) unter jedem Rezeptor ins Zellinnere, nur in Schritt 1–2',
      'Signalweiterleitung der Nervenzelle (Dopamin, Noradrenalin) als Band oder Leitung im Zellinneren',
      'Adenosin in der Bindetasche (Schritt 1–2), Koffein in der Bindetasche (Schritt 3–4)',
    ],
    stroeme: {
      adeno: 'Adenosin wandert aus dem Spalt in die freie Bindetasche und bindet.',
      abprall: 'Adenosin nähert sich der besetzten Tasche, prallt ab und entfernt sich wieder.',
      kof: 'Koffein kommt (aus dem Blut) heran und besetzt die Bindetasche.',
      bremse: 'Hemmendes Signal läuft vom Rezeptor ins Zellinnere (ohne Pfeilspitze, Punktfolge).',
      impuls: 'Nervenimpuls / Transmitter-Signal läuft entlang der Zelle; Dichte zeigt die Aktivität.',
    },
  },
  nitrat: {
    elemente: [
      'Zungenrücken (Mundraum) mit Papillen-Oberfläche',
      'Mehrere Nitrat-reduzierende Bakterien auf der Zunge, beschriftet „Bakterien“',
      'Blutgefäß im Längsschnitt mit Erythrozyten; in Schritt 4 sichtbar geweitet',
      'Zellmembran der Muskelzelle als Lipid-Doppelschicht',
      'Mitochondrium mit Cristae, beschriftet',
      'Muskelfaser (quergestreift), beschriftet',
    ],
    stroeme: {
      no3: 'Nitrat aus dem Speichel gelangt zu den Bakterien auf dem Zungenrücken.',
      no2: 'Nitrit von den Bakterien wird geschluckt, gelangt ins Blut und in die Muskelzelle.',
      no: 'Im Muskel entsteht NO; ein Weg zum Mitochondrium, einer zum Blutgefäß.',
      o2: 'Sauerstoff aus dem Blut ins Mitochondrium (in Schritt 4 weniger nötig).',
      atp: 'ATP vom Mitochondrium zur Muskelfaser.',
    },
  },
  bicarbonat: {
    elemente: [
      'Blut (Zone beschriftet)',
      'Zellmembran der Muskelzelle als Lipid-Doppelschicht',
      'Zwei MCT-Transporter in der Membran, einer beschriftet „MCT-Transporter“',
      'Muskelfaser bei Belastung (quergestreift)',
      'Reaktionsgleichung H⁺ + HCO₃⁻ → H₂CO₃ → H₂O + CO₂ und Hinweis „→ Lunge“, nur Schritt 4',
    ],
    stroeme: {
      hInnen: 'H⁺ entsteht in der Muskelfaser und wandert zu den Transportern.',
      hRaus: 'H⁺ wird durch die MCT-Transporter ins Blut geschleust.',
      lakRaus: 'Laktat geht gemeinsam mit H⁺ durch die MCT-Transporter ins Blut.',
      hco3: 'Bicarbonat zirkuliert im Blut (Menge zeigt den Pufferstand).',
      co2: 'CO₂ entsteht im Blut und wird Richtung Lunge abtransportiert.',
    },
  },
  'beta-alanin': {
    elemente: [
      'Blut (Zone beschriftet)',
      'Zellmembran der Muskelzelle mit Transporter, beschriftet „Transporter TauT“',
      'Enzym Carnosin-Synthase, beschriftet',
      'Carnosin-Speicher als Bereich, der sich über die Schritte füllt (3 → 5 → 12 Einheiten)',
      'Hinweis „nach 4 Wochen: +40–60 %“ nur Schritt 3',
      'Muskelfaser (quergestreift), in Schritt 4 Säure-Quelle',
    ],
    stroeme: {
      ba: 'Beta-Alanin aus dem Blut durch TauT zur Carnosin-Synthase.',
      his: 'Histidin (bereits in der Zelle) zur Carnosin-Synthase.',
      carn: 'Fertiges Carnosin von der Synthase in den Speicher.',
      saeure: 'H⁺ aus der arbeitenden Faser wird vom Carnosin im Speicher abgefangen.',
    },
  },
  kreatin: {
    elemente: [
      'Blut (Zone beschriftet)',
      'Zellmembran der Muskelzelle mit Transporter, beschriftet „Transporter CreaT“',
      'Mitochondrium mit Cristae, beschriftet',
      'Je eine Kreatinkinase am Mitochondrium und an der Muskelfaser, gemeinsam beschriftet',
      'Muskelfaser (hochkant, quergestreift), beschriftet',
      'Gleichung ADP + PCr → ATP + Cr, nur Schritt 4',
    ],
    stroeme: {
      rein: 'Kreatin aus dem Blut durch CreaT zum Mitochondrium.',
      pcr: 'Phosphokreatin vom Mitochondrium zur Muskelfaser (oberer Bogen).',
      zurueck: 'Kreatin von der Muskelfaser zurück zum Mitochondrium (unterer Bogen).',
      atp: 'ATP-Bereitstellung entlang der Muskelfaser.',
    },
  },
  kohlenhydrate: {
    elemente: [
      'Darminneres (Zone beschriftet)',
      'Darmzelle zwischen zwei Lipid-Doppelschichten: oben zum Darm (apikal), unten zum Blut (basolateral)',
      'Zwei SGLT1-Transporter oben, beschriftet',
      'Zwei GLUT5-Transporter oben, beschriftet',
      'Drei GLUT2-Transporter unten, beschriftet',
      'Blutgefäß unten mit Erythrozyten',
      'Stau aus wartender Glukose vor SGLT1 und Hinweis „max. ~60 g/h“ ab Schritt 2',
    ],
    stroeme: {
      glu: 'Glukose aus dem Darm durch SGLT1, durch die Zelle, durch GLUT2 ins Blut.',
      na: 'Natrium fährt mit der Glukose durch SGLT1 in die Zelle.',
      fru: 'Fruktose aus dem Darm durch GLUT5, durch die Zelle, durch GLUT2 ins Blut.',
    },
  },
  itc: {
    elemente: [
      'Außenraum und Zellmembran (Lipid-Doppelschicht)',
      'KEAP1 (zwei Untereinheiten), beschriftet; ab Schritt 2 mit gebundenem ITC und Hinweis „Sensor klemmt“',
      'NRF2 an KEAP1 gebunden (Schritt 1–2), danach frei',
      'Proteasom (Fass aus Ringen), beschriftet, mit Abbau-Bruchstücken in Schritt 1–2',
      'Zellkern mit Doppelmembran, DNA-Helix und ARE-Abschnitt, alle beschriftet',
      'NRF2 mit Partner (sMAF) am ARE ab Schritt 3',
      'ROS als Zacken-Symbole; ab Schritt 4 deutlich weniger',
    ],
    stroeme: {
      abbau: 'NRF2 wird von KEAP1 zum Proteasom geschickt und abgebaut.',
      itc: 'ITC dringt durch die Membran und bindet an KEAP1.',
      nrf2: 'Freies NRF2 wandert in den Zellkern zum ARE.',
      enzyme: 'Schutz-Enzyme verlassen den Kern ins Zytoplasma.',
    },
  },
  ketonester: {
    elemente: [
      'Blut (Zone beschriftet) mit Esterase, beschriftet',
      'Zellmembran der Muskelzelle mit MCT-Transporter, beschriftet',
      'Mitochondrium mit Citratzyklus als Kreis, beides beschriftet',
      'Glykolyse als senkrechter Weg Glukose → Pyruvat; in Schritt 4 „gebremst“',
      'Hinweis „Blut-pH sinkt“ nur Schritt 4',
    ],
    stroeme: {
      ke: 'Ketonester erreicht die Esterase.',
      bhb: 'βHB von der Esterase durch den MCT-Transporter ins Mitochondrium.',
      zyklus: 'Acetyl-CoA kreist im Citratzyklus (ohne Pfeilspitze).',
      atp: 'ATP verlässt das Mitochondrium.',
      saeure: 'H⁺ im Blut nimmt zu (Säurelast).',
      glyko: 'Glukose-Abbau Glukose → Pyruvat; Dichte zeigt die Aktivität.',
    },
  },
  sauerkirsche: {
    elemente: [
      'Blut (Zone beschriftet) und Zellmembran',
      'NF-κB, beschriftet; in Schritt 1 mit Bremse IκB (beschriftet), in Schritt 4 „weniger aktiv“',
      'Zellkern mit DNA und Abschnitt „Entzündungs-Gene“; in Schritt 2–3 rot (aktiv)',
      'Muskelfaser mit Mikrorissen, beschriftet',
      'ROS als Zacken-Symbole; in Schritt 4 deutlich weniger',
    ],
    stroeme: {
      nfkb: 'NF-κB wandert in den Zellkern zu den Entzündungs-Genen.',
      signal: 'Entzündungssignale verlassen die Zelle nach außen.',
      poly: 'Polyphenol-Abbauprodukte aus dem Blut gelangen in die Zelle.',
    },
  },
};
