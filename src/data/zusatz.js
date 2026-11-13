// Steckbrief und Aufnahmeweg je Supplement. Wird in supplements.js an die Einträge gehängt.

export const ROLLEN = {
  aufnahme: 'Aufnahme ins Blut',
  umbau: 'Umbau',
  passage: 'Durchgang',
  transport: 'Transport',
  wirkung: 'Wirkort',
  raus: 'Abbau & Ausscheidung',
};

export const ORTE = {
  mund: 'Mund',
  magen: 'Magen',
  duenndarm: 'Dünndarm',
  dickdarm: 'Dickdarm',
  leber: 'Leber',
  blut: 'Blut',
  gehirn: 'Gehirn',
  muskel: 'Muskel',
  niere: 'Niere',
};

const ERLAUBT = 'Erlaubt – steht nicht auf der WADA-Verbotsliste.';

export const zusatz = {
  // ───────────────────────────────────────────────────────── KOFFEIN
  koffein: {
    farbe: '#1f8f80',
    steckbrief: {
      was: 'Ein Alkaloid aus Kaffeebohne, Tee, Kakao und Guaraná (chemisch 1,3,7-Trimethylxanthin). Dem körpereigenen Adenosin ähnlich genug, um dessen Rezeptoren zu besetzen.',
      formen: 'Tablette oder Kapsel (genau dosierbar), Kaffee (Gehalt schwankt stark), Gel und Sportgetränk (praktisch im Rennen), Kaugummi (am schnellsten im Blut).',
      nahrung: 'Richtwerte: Tasse Filterkaffee ~80 mg, Dose Energydrink (250 ml) 80 mg, 0,33 l Cola ~35 mg.',
      nebenwirkungen: 'Herzklopfen, Zittern, Nervosität, Magen-Darm, Harndrang, schlechter Schlaf – vor allem bei hohen Dosen. Die EFSA nennt für gesunde Erwachsene 200 mg als Einzeldosis und 400 mg am Tag als unbedenklich; die Sportdosis liegt oft darüber. Also für Rennen und Schlüsseleinheiten, nicht für jeden Tag.',
      kombi: 'Verträgt sich mit Kohlenhydraten (Koffein-Gel), Nitrat und Bicarbonat. Jede Kombi erst einzeln, dann zusammen im Training testen.',
      fuerWen: 'Rennrad: Zeitfahren, Bergfahrten, lange Rennen (im letzten Drittel nachlegen). HYROX: ja – Ausdauer und wiederholte Kraftleistung profitieren beide.',
      doping: 'Erlaubt. Seit 2004 nicht mehr verboten; die WADA beobachtet den Gebrauch nur noch im Monitoring-Programm.',
    },
    aufnahme: {
      kurz: 'Geht fast komplett ins Blut – vor allem über den Dünndarm, ein wenig schon über den Magen. Über die Mundschleimhaut nur, wenn es lange im Mund bleibt (Kaugummi).',
      kennzahlen: [
        ['Wo', 'Dünndarm (+ Magen)'],
        ['Wie viel kommt an', '≈ 99 %'],
        ['Peak im Blut', '30–120 min'],
        ['Halbwertszeit', '≈ 4–6 h'],
      ],
      weg: [
        { ort: 'mund', rolle: 'passage', text: 'Tablette oder Kaffee rauschen durch. Ausnahme Kaugummi: Da geht ein Teil direkt über die Mundschleimhaut ins Blut – im Vergleich war der Spitzenspiegel nach 44–80 statt 84–120 Minuten erreicht.' },
        { ort: 'magen', rolle: 'aufnahme', text: 'Ein kleiner Teil wird schon hier aufgenommen. Ein voller Magen bremst die Weiterreise und damit den Wirkungseintritt.' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Hier passiert der Löwenanteil. Koffein ist klein und fettlöslich und wandert einfach durch die Darmwand: rund 99 % sind binnen etwa 45 Minuten aufgenommen.' },
        { ort: 'blut', rolle: 'transport', text: 'Der Spiegel erreicht meist nach 30–120 Minuten sein Maximum, typisch nach rund einer Stunde.' },
        { ort: 'gehirn', rolle: 'wirkung', text: 'Koffein passiert die Blut-Hirn-Schranke problemlos und besetzt dort die Adenosin-Rezeptoren (siehe Abb. 2).' },
        { ort: 'leber', rolle: 'raus', text: 'Das Leberenzym CYP1A2 baut Koffein ab, vor allem zu Paraxanthin. Wie schnell, ist stark genetisch: Die Halbwertszeit liegt meist bei 4–6 Stunden, die Spanne reicht von etwa 1,5 bis 10 Stunden.' },
        { ort: 'niere', rolle: 'raus', text: 'Die Abbauprodukte verlassen den Körper über den Urin.' },
      ],
    },
    quellen: [
      { kurz: 'Kamimori et al. 2002', titel: 'The rate of absorption and relative bioavailability of caffeine administered in chewing gum versus capsules to normal healthy volunteers', journal: 'Int J Pharm 234:159–167', url: 'https://doi.org/10.1016/S0378-5173(01)00958-9' },
      { kurz: 'EFSA 2015', titel: 'Scientific Opinion on the safety of caffeine', journal: 'EFSA Journal 13:4102', url: 'https://doi.org/10.2903/j.efsa.2015.4102' },
    ],
  },

  // ───────────────────────────────────────────────────────── NITRAT
  nitrat: {
    farbe: '#c2255c',
    steckbrief: {
      was: 'Nitrat (NO₃⁻) ist ein Salz-Anion, das Pflanzen aus dem Boden speichern. Der Körper nutzt es als Reserve, aus der er Stickstoffmonoxid (NO) herstellen kann.',
      formen: 'Konzentrierter Rote-Bete-Shot (standardisierter Gehalt), Saft, Pulver oder schlicht nitratreiches Gemüse. Reine Nitratsalze empfiehlt das Experten-Panel aus Sicherheitsgründen nicht.',
      nahrung: 'Rucola, Spinat, Mangold, Kopfsalat und Rote Bete – Blattgemüse liefert am meisten.',
      nebenwirkungen: 'Roter Urin und Stuhl (harmlos), gelegentlich Magen-Darm. Der Blutdruck sinkt leicht – relevant, wenn er ohnehin niedrig ist oder du Blutdrucksenker nimmst.',
      kombi: 'Kein antibakterielles Mundwasser rund um die Einnahme. Mit Koffein kombinierbar.',
      fuerWen: 'Rennrad: kurze Zeitfahren, Bergsprints, Kriterien – vor allem unterhalb des Elite-Niveaus. HYROX: vom Belastungsprofil her plausibel, aber nicht direkt untersucht.',
      doping: ERLAUBT,
    },
    aufnahme: {
      kurz: 'Aufgenommen wird Nitrat im oberen Dünndarm. Wirksam wird es aber erst nach einer Ehrenrunde: zurück in den Mund, dort von Bakterien zu Nitrit umgebaut, wieder geschluckt.',
      kennzahlen: [
        ['Wo', 'oberer Dünndarm'],
        ['Umbau', 'Zungenbakterien'],
        ['Peak im Blut', 'Nitrat ~1 h · Nitrit 2–3 h'],
        ['Halbwertszeit', 'Nitrat ≈ 5–8 h'],
      ],
      weg: [
        { ort: 'mund', rolle: 'passage', text: 'Beim Trinken passiert noch nichts Entscheidendes – der Shot ist zu kurz im Mund.' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Nitrat wird im oberen Verdauungstrakt zügig ins Blut aufgenommen. Der Nitrat-Spiegel ist nach etwa einer Stunde am höchsten.' },
        { ort: 'blut', rolle: 'transport', text: 'Nitrat selbst kann im Körper wenig. Rund ein Viertel davon fischen die Speicheldrüsen aus dem Blut und konzentrieren es im Speichel.' },
        { ort: 'mund', rolle: 'umbau', text: 'Zweite Runde: Bakterien auf dem Zungenrücken machen aus dem Speichel-Nitrat Nitrit. Ohne sie läuft nichts – deshalb kein antibakterielles Mundwasser.' },
        { ort: 'magen', rolle: 'umbau', text: 'Du schluckst das Nitrit. Im sauren Magen wird ein Teil direkt zu NO, der Rest wandert weiter.' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Nitrit geht ins Blut. Sein Spiegel erreicht erst 2–3 Stunden nach dem Shot das Maximum – daher das Timing.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'Im arbeitenden Muskel (sauer, sauerstoffarm) wird Nitrit zu NO reduziert (siehe Abb. 2).' },
        { ort: 'niere', rolle: 'raus', text: 'Der größte Teil des Nitrats verlässt den Körper über den Urin; die Halbwertszeit im Blut liegt bei etwa 5–8 Stunden.' },
      ],
    },
    quellen: [
      { kurz: 'Jones et al. 2021', titel: 'Dietary nitrate and nitric oxide metabolism: mouth, circulation, skeletal muscle, and exercise performance', journal: 'Med Sci Sports Exerc 53:280–294', url: 'https://doi.org/10.1249/MSS.0000000000002470' },
    ],
  },

  // ───────────────────────────────────────────────────────── BICARBONAT
  bicarbonat: {
    farbe: '#2b6cb0',
    steckbrief: {
      was: 'Natriumhydrogencarbonat (NaHCO₃) – schlicht Natron. Bicarbonat ist der wichtigste Säurepuffer deines Blutes; mit dem Supplement füllst du ihn von außen auf.',
      formen: 'Pulver in Wasser (billig, hart für den Magen), Gelatinekapseln, magensaftresistente Kapseln oder Hydrogel mit Mini-Tabletten (Maurten).',
      nahrung: 'Keine relevante Quelle. Selbst hydrogencarbonatreiches Mineralwasser liefert nur einen Bruchteil der Sportdosis.',
      nebenwirkungen: 'Blähungen, Aufstoßen, Übelkeit, Durchfall – der häufigste Grund, warum Athleten es wieder lassen. Dazu eine große Portion Natrium.',
      kombi: 'Ergänzt sich mit Beta-Alanin (Puffer in der Zelle plus Puffer im Blut). Koffein dazu ist möglich.',
      fuerWen: 'Rennrad: Verfolgung, Kriterium, kurzes Bergzeitfahren, hartes Finale. HYROX: passt vom Profil (wiederholt hochintensiv) – die Magenverträglichkeit vorher im Training klären.',
      doping: ERLAUBT,
    },
    aufnahme: {
      kurz: 'Die Problemzone ist der Magen: Dort reagiert ein Teil mit der Magensäure zu CO₂-Gas. Was durchkommt, geht im Dünndarm ins Blut – und nur dort, im Blut, wirkt es.',
      kennzahlen: [
        ['Wo', 'Dünndarm'],
        ['Hürde', 'Magensäure'],
        ['Peak im Blut', '60–180 min (individuell)'],
        ['Wirkt', 'im Blut, nicht in der Zelle'],
      ],
      weg: [
        { ort: 'magen', rolle: 'umbau', text: 'Bicarbonat trifft auf Salzsäure: Es entstehen Kochsalz, Wasser und CO₂-Gas. Daher Aufstoßen, Blähbauch und Übelkeit. Magensaftresistente Kapseln oder Hydrogel schleusen es an der Säure vorbei.' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Hier werden Bicarbonat und Natrium ins Blut aufgenommen. Kommt zu viel auf einmal an, zieht es Wasser in den Darm – Durchfall.' },
        { ort: 'blut', rolle: 'wirkung', text: 'Der Bicarbonat-Spiegel steigt und bleibt für einige Zeit erhöht. Wann der Gipfel kommt, ist sehr individuell – grob 60 bis 180 Minuten nach der Einnahme.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'In die Muskelzelle gelangt Bicarbonat kaum. Es wirkt von außen als Sog für H⁺ und Laktat (siehe Abb. 2).' },
        { ort: 'niere', rolle: 'raus', text: 'Die Niere scheidet den Überschuss wieder aus; das abgefangene H⁺ atmest du als CO₂ über die Lunge ab.' },
      ],
    },
    quellen: [],
  },

  // ───────────────────────────────────────────────────────── BETA-ALANIN
  'beta-alanin': {
    farbe: '#b7791f',
    steckbrief: {
      was: 'Eine Aminosäure, die nicht in Proteine eingebaut wird. Für sich genommen wirkungslos – sie ist der knappe Baustein für das Dipeptid Carnosin im Muskel.',
      formen: 'Pulver, Kapseln oder Retard-Tabletten (geben langsam ab, kribbeln weniger).',
      nahrung: 'Fleisch und Fisch liefern Carnosin und verwandte Dipeptide, aus denen Beta-Alanin frei wird.',
      nebenwirkungen: 'Kribbeln auf der Haut (Parästhesie), meist an Gesicht, Hals und Händen, etwa eine Stunde lang. Harmlos, lässt sich mit kleinen Einzeldosen vermeiden.',
      kombi: 'Mit Natriumbicarbonat war der Effekt in der Meta-Analyse am größten.',
      fuerWen: 'Rennrad: Kriterium, Bahn, Cross, kurze steile Anstiege. HYROX: passt gut – viele harte Blöcke von wenigen Minuten.',
      doping: ERLAUBT,
    },
    aufnahme: {
      kurz: 'Wird im Dünndarm aufgenommen, ist nach 30–45 Minuten im Blut am höchsten und schnell wieder weg. Das Entscheidende passiert danach, langsam, im Muskel.',
      kennzahlen: [
        ['Wo', 'Dünndarm'],
        ['Peak im Blut', '30–45 min'],
        ['Speicher voll', 'nach ≥ 4 Wochen'],
        ['Speicher leert sich', '≈ 2 % pro Woche'],
      ],
      weg: [
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Aminosäure-Transporter in der Darmwand schleusen Beta-Alanin ins Blut.' },
        { ort: 'blut', rolle: 'transport', text: 'Spitzenspiegel nach 30–45 Minuten. Schießt er hoch, reizt Beta-Alanin Nervenenden in der Haut – das ist das Kribbeln. Retard-Tabletten machen die Kurve flacher.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'Der Transporter TauT holt Beta-Alanin in die Faser, dort wird es mit Histidin zu Carnosin verbaut (siehe Abb. 2). Nur ein kleiner Teil der geschluckten Menge landet am Ende im Carnosin-Speicher.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'Carnosin bleibt lange: Nach dem Absetzen sinkt der Speicher nur um etwa 2 % pro Woche. Eine Pause von ein paar Tagen ist also egal.' },
        { ort: 'leber', rolle: 'raus', text: 'Was der Muskel nicht einbaut, wird im Stoffwechsel abgebaut; im Urin landet nur wenig.' },
      ],
    },
    quellen: [
      { kurz: 'Harris et al. 2006', titel: 'The absorption of orally supplied β-alanine and its effect on muscle carnosine synthesis in human vastus lateralis', journal: 'Amino Acids 30:279–289', url: 'https://doi.org/10.1007/s00726-006-0299-9' },
      { kurz: 'Stellingwerff et al. 2012', titel: 'Optimizing human in vivo dosing and delivery of β-alanine supplements for muscle carnosine synthesis', journal: 'Amino Acids 43:57–65', url: 'https://doi.org/10.1007/s00726-012-1245-7' },
    ],
  },

  // ───────────────────────────────────────────────────────── KREATIN
  kreatin: {
    farbe: '#4c5fd0',
    steckbrief: {
      was: 'Eine körpereigene Verbindung, die Leber und Niere aus den Aminosäuren Arginin, Glycin und Methionin bauen. Den Tagesbedarf deckt der Körper etwa zur Hälfte selbst, den Rest über die Nahrung.',
      formen: 'Kreatin-Monohydrat ist der Standard und am besten untersucht. Andere Formen (HCl, Ethylester, gepuffert) sind teurer, aber nicht besser belegt.',
      nahrung: 'Fleisch und Fisch. Wer vegetarisch oder vegan isst, startet mit niedrigeren Speichern und spricht oft stärker an.',
      nebenwirkungen: 'Meist 1–2 kg mehr Gewicht durch Wasser im Muskel. In der Ladephase gelegentlich Magen-Darm. Der Kreatinin-Wert im Blut kann leicht steigen – beim Arzt erwähnen, damit er nicht falsch gedeutet wird.',
      kombi: 'Zusammen mit Kohlenhydraten (und Protein) wird mehr eingelagert.',
      fuerWen: 'Rennrad: Sprinter, Kriterium, Cross; Bergfahrer eher in der Off-Season. HYROX: klares Ja – Schlitten, Wall Balls und Ausfallschritte leben von Kraftausdauer.',
      doping: ERLAUBT,
    },
    aufnahme: {
      kurz: 'Übersteht den Magen, wird im Dünndarm aktiv aufgenommen und vom Muskel aus dem Blut „eingefangen“. Dort bleibt es wochenlang.',
      kennzahlen: [
        ['Wo', 'Dünndarm (aktiv)'],
        ['Peak im Blut', '≈ 1–2 h'],
        ['Speicherort', '≈ 95 % im Muskel'],
        ['Speicher leert sich', 'in 4–6 Wochen'],
      ],
      weg: [
        { ort: 'magen', rolle: 'passage', text: 'Monohydrat übersteht die Magensäure praktisch unbeschadet.' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Kreatin wird sehr wahrscheinlich aktiv aufgenommen, ähnlich wie Aminosäuren.' },
        { ort: 'blut', rolle: 'transport', text: 'Nach einer Einzeldosis ist der Spiegel nach etwa 1–2 Stunden am höchsten.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'Der Transporter CreaT zieht Kreatin in die Faser; rund 95 % des Körper-Kreatins sitzen im Skelettmuskel. Der Speicher hat eine Obergrenze – ist er voll, bleibt mehr im Blut und geht über die Niere raus.' },
        { ort: 'niere', rolle: 'raus', text: 'Täglich zerfallen 1–2 % des Speichers zu Kreatinin, das über den Urin ausgeschieden wird. Nach dem Absetzen sind die Speicher in 4–6 Wochen wieder auf Ausgangsniveau.' },
      ],
    },
    quellen: [
      { kurz: 'Persky et al. 2003', titel: 'Pharmacokinetics of the dietary supplement creatine', journal: 'Clin Pharmacokinet 42:557–574', url: 'https://doi.org/10.2165/00003088-200342060-00005' },
    ],
  },

  // ───────────────────────────────────────────────────────── KOHLENHYDRATE
  kohlenhydrate: {
    farbe: '#b8860b',
    steckbrief: {
      was: 'Glukose (Traubenzucker; Maltodextrin ist eine Kette aus Glukose) und Fruktose (Fruchtzucker). Haushaltszucker besteht je zur Hälfte aus beiden.',
      formen: 'Drink, Gel, Fruchtgummi, Riegel oder selbst gemischt – für die Verwertung macht die Form keinen messbaren Unterschied.',
      nahrung: 'Bananen, Datteln, Reiskuchen, Gummibärchen, Weißbrot mit Honig – alles, was schnell verfügbar und wenig faser- und fettreich ist.',
      nebenwirkungen: 'Zu viel oder zu konzentriert: Blähungen, Krämpfe, Durchfall. Auf Dauer leiden die Zähne – nach dem Training mit Wasser nachspülen.',
      kombi: 'Etwas Natrium gehört dazu (SGLT1 nimmt Glukose nur mit Natrium). Koffein passt gut. Der Darm lässt sich trainieren.',
      fuerWen: 'Rennrad: alles über 90 Minuten. HYROX (60–90 min): volle Speicher vorher zählen mehr; unterwegs reicht ein Gel oder eine Mundspülung.',
      doping: 'Erlaubt – das ist Essen.',
    },
    aufnahme: {
      kurz: 'Ins Blut geht Zucker erst im Dünndarm. Der Mund nimmt nichts auf, meldet aber schon „Energie kommt“ ans Gehirn.',
      kennzahlen: [
        ['Wo', 'Dünndarm'],
        ['Transporter', 'SGLT1 · GLUT5 · GLUT2'],
        ['Engpass', '~60 g/h je Zuckerart'],
        ['Im Mund', 'nur Signal ans Gehirn'],
      ],
      weg: [
        { ort: 'mund', rolle: 'wirkung', text: 'Aufgenommen wird hier nichts. Aber Rezeptoren im Mund melden dem Gehirn die Kohlenhydrate – in einem einstündigen Zeitfahren machte bloßes Spülen und Ausspucken die Fahrer rund 3 % schneller. Außerdem beginnt die Speichel-Amylase, Stärke zu zerlegen.' },
        { ort: 'magen', rolle: 'passage', text: 'Der Magen ist nur Zwischenlager. Sehr konzentrierte Drinks verlassen ihn langsamer – genug Wasser dazu trinken.' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Hier fällt die Entscheidung: Glukose geht über SGLT1, Fruktose über GLUT5 in die Darmzelle, beide über GLUT2 weiter ins Blut (siehe Abb. 2).' },
        { ort: 'leber', rolle: 'umbau', text: 'Über die Pfortader landet alles zuerst in der Leber. Fruktose wird dort größtenteils zu Glukose und Laktat umgebaut, bevor der Muskel sie nutzen kann.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'Der Muskel verbrennt den Zucker sofort und schont so sein Glykogen.' },
        { ort: 'dickdarm', rolle: 'passage', text: 'Was der Dünndarm nicht schafft, landet hier, zieht Wasser und wird von Bakterien vergoren: Blähungen und Durchfall.' },
      ],
    },
    quellen: [
      { kurz: 'Carter et al. 2004', titel: 'The effect of carbohydrate mouth rinse on 1-h cycle time trial performance', journal: 'Med Sci Sports Exerc 36:2107–2111', url: 'https://doi.org/10.1249/01.MSS.0000147585.65709.6F' },
    ],
  },

  // ───────────────────────────────────────────────────────── ITC
  itc: {
    farbe: '#5a8f1f',
    steckbrief: {
      was: 'Isothiocyanate (ITC) sind scharfe Schwefelverbindungen aus Kreuzblütlern wie Brokkoli, Senf und Kresse. In der Pflanze liegen sie als inaktive Vorstufe vor (Glucosinolate); der bekannteste Vertreter ist Sulforaphan aus Glucoraphanin.',
      formen: 'Fertiger Shot (Nomio), frische Sprossen, Sprossenpulver oder Kapseln. Entscheidend ist, ob das Enzym Myrosinase noch aktiv ist – sonst kommt wenig an.',
      nahrung: 'Brokkolisprossen enthalten ein Vielfaches von ausgewachsenem Brokkoli. Kochen zerstört die Myrosinase; roh oder kurz gedämpft bleibt mehr.',
      nebenwirkungen: 'Aufstoßen, Blähungen, gewöhnungsbedürftiger Geschmack. Langzeitdaten zu täglichen hohen Dosen bei Sportlern fehlen.',
      kombi: 'Zu Kombinationen mit anderen Supplementen gibt es keine belastbaren Daten.',
      fuerWen: 'Für Experimentierfreudige mit Laktatmessung, in harten Intervallblöcken. Zu HYROX gibt es keine Daten.',
      doping: ERLAUBT,
    },
    aufnahme: {
      kurz: 'Der Wirkstoff entsteht erst beim Zerkleinern: Das Pflanzenenzym Myrosinase macht aus der Vorstufe das aktive ITC. Aufgenommen wird dann im Dünndarm.',
      kennzahlen: [
        ['Wo', 'Dünndarm'],
        ['Aktivierung', 'Myrosinase (Kauen, Mixen)'],
        ['Mit aktivem Enzym', '70–90 % kommen an'],
        ['Ohne Enzym', '≈ 10 % (1–40 %)'],
      ],
      weg: [
        { ort: 'mund', rolle: 'umbau', text: 'Kauen oder Mixen bringt Vorstufe (Glucoraphanin) und Enzym (Myrosinase) zusammen – erst jetzt entsteht ITC, zum Beispiel Sulforaphan.' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Fertiges ITC ist klein und fettlöslich und geht schnell durch die Darmwand. Von fertigem Sulforaphan tauchen 70–90 % als Abbauprodukte im Urin auf – es wird also fast alles aufgenommen.' },
        { ort: 'dickdarm', rolle: 'umbau', text: 'Fehlt die aktive Myrosinase (gekocht, viele Kapseln), müssen Darmbakterien die Umwandlung übernehmen. Das klappt sehr unterschiedlich: im Schnitt etwa 10 %, je nach Mensch 1 bis 40 %.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'In der Zelle hängt sich ITC an den Sensor KEAP1 und setzt NRF2 frei (siehe Abb. 2).' },
        { ort: 'niere', rolle: 'raus', text: 'Die Zellen koppeln ITC an Glutathion; die Abbauprodukte werden über die Niere ausgeschieden.' },
      ],
    },
    quellen: [
      { kurz: 'Fahey et al. 2015', titel: 'Sulforaphane bioavailability from glucoraphanin-rich broccoli: control by active endogenous myrosinase', journal: 'PLoS One 10:e0140963', url: 'https://doi.org/10.1371/journal.pone.0140963' },
    ],
  },

  // ───────────────────────────────────────────────────────── KETONESTER
  ketonester: {
    farbe: '#7b4fc4',
    steckbrief: {
      was: 'Ein Ester aus dem Ketonkörper β-Hydroxybutyrat (βHB) und Butandiol. Ketonkörper stellt die Leber sonst nur beim Fasten oder bei ketogener Ernährung her.',
      formen: 'Ketonmonoester hebt den βHB-Spiegel deutlich (im Vergleich 2,8 mmol/l). Ketonsalze schaffen bei gleicher Menge nur etwa 1,0 mmol/l und bringen viel Salz mit.',
      nahrung: 'Keine. Über die Ernährung geht es nur per Fasten oder ketogener Kost – mit eigenen Nachteilen für die Leistung.',
      nebenwirkungen: 'Übelkeit, Magen-Darm, sehr bitterer Geschmack. Der Blut-pH sinkt messbar.',
      kombi: 'Bicarbonat gleicht die Säurelast aus; ein verlässlicher Leistungsvorteil daraus ist nicht bestätigt.',
      fuerWen: 'Wenn überhaupt: zur Erholung in Etappenrennen oder im Trainingslager. Für HYROX nicht sinnvoll.',
      doping: 'Nicht verboten. Die Teamvereinigung MPCC rät ihren Mitgliedern allerdings von Ketonen ab.',
    },
    aufnahme: {
      kurz: 'Der Ester wird in Darmwand, Blut und Leber gespalten. Im Blut kommt βHB an – schnell, und für 3–4 Stunden.',
      kennzahlen: [
        ['Wo', 'Dünndarm'],
        ['Peak im Blut', '≈ 3 mmol/l βHB (nüchtern)'],
        ['Mit Mahlzeit', 'etwa ein Drittel weniger'],
        ['Wieder normal', 'nach 3–4 h'],
      ],
      weg: [
        { ort: 'magen', rolle: 'passage', text: 'Rauscht durch. Ein voller Magen senkt den späteren Spitzenspiegel um etwa ein Drittel (2,2 statt 3,3 mmol/l).' },
        { ort: 'duenndarm', rolle: 'aufnahme', text: 'Esterasen in der Darmwand spalten den Ester in βHB und Butandiol; beides geht ins Blut.' },
        { ort: 'leber', rolle: 'umbau', text: 'Die Leber wandelt das Butandiol ebenfalls in Ketonkörper um.' },
        { ort: 'blut', rolle: 'transport', text: 'Der βHB-Spiegel steigt rasch auf Werte wie nach tagelangem Fasten und ist nach 3–4 Stunden wieder am Ausgangswert.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'βHB gelangt über MCT-Transporter in die Zelle und wird im Mitochondrium verbrannt (siehe Abb. 2).' },
        { ort: 'niere', rolle: 'raus', text: 'Fast alles wird verstoffwechselt: Weniger als 1,5 % landen im Urin.' },
      ],
    },
    quellen: [
      { kurz: 'Stubbs et al. 2017', titel: 'On the metabolism of exogenous ketones in humans', journal: 'Front Physiol 8:848', url: 'https://doi.org/10.3389/fphys.2017.00848' },
    ],
  },

  // ───────────────────────────────────────────────────────── SAUERKIRSCHE
  sauerkirsche: {
    farbe: '#b0304f',
    steckbrief: {
      was: 'Konzentrat aus Montmorency-Sauerkirschen, reich an Anthocyanen (den roten Pflanzenfarbstoffen) und anderen Polyphenolen.',
      formen: 'Konzentrat zum Verdünnen (am besten untersucht), Saft, Pulver oder Kapseln.',
      nahrung: 'Sauerkirschen selbst. Andere dunkle Beeren haben ein anderes Polyphenol-Profil und sind für diesen Zweck weniger untersucht.',
      nebenwirkungen: 'Konzentrat bringt Zucker und Kalorien mit; bei Empfindlichen gelegentlich Magen-Darm.',
      kombi: 'Keine besonderen Kombinationen belegt.',
      fuerWen: 'Rennrad: Etappenrennen, Wettkampfwochenenden, Trainingslager. HYROX: rund um den Wettkampf zur Erholung plausibel.',
      doping: ERLAUBT,
    },
    aufnahme: {
      kurz: 'Von den Anthocyanen selbst kommt wenig im Blut an. Messbar sind vor allem ihre Abbauprodukte – mit Höchstwert nach 1–2 Stunden.',
      kennzahlen: [
        ['Wo', 'Magen, Dünn- und Dickdarm'],
        ['Im Blut', 'vor allem Abbauprodukte'],
        ['Peak im Blut', '1–2 h'],
        ['Nach 8 h', 'nur noch Spuren'],
      ],
      weg: [
        { ort: 'magen', rolle: 'aufnahme', text: 'Ein kleiner Teil der Anthocyane wird schon in Magen und oberem Dünndarm aufgenommen. Insgesamt gilt ihre Bioverfügbarkeit als gering.' },
        { ort: 'duenndarm', rolle: 'umbau', text: 'Anthocyane sind instabil: Schon im Darm zerfallen sie zu kleineren Phenolsäuren, die leichter aufgenommen werden.' },
        { ort: 'dickdarm', rolle: 'umbau', text: 'Was oben nicht aufgenommen wurde, bauen Darmbakterien nach heutigem Stand weiter zu Phenolsäuren um, die ebenfalls ins Blut gehen.' },
        { ort: 'blut', rolle: 'transport', text: 'Nach Sauerkirsch-Konzentrat wurden Protocatechusäure und Vanillinsäure im Blut gefunden – am meisten nach 1–2 Stunden, nach 8 Stunden nur noch Spuren. Deshalb zwei Portionen am Tag.' },
        { ort: 'muskel', rolle: 'wirkung', text: 'Wahrscheinlich sind es diese Abbauprodukte, die in Muskel und Gefäßen wirken (siehe Abb. 2).' },
        { ort: 'niere', rolle: 'raus', text: 'Ausscheidung über den Urin.' },
      ],
    },
    quellen: [
      { kurz: 'Keane et al. 2016', titel: 'Phytochemical uptake following human consumption of Montmorency tart cherry (L. Prunus cerasus) and influence of phenolic acids on vascular smooth muscle cells in vitro', journal: 'Eur J Nutr 55:1695–1705', url: 'https://doi.org/10.1007/s00394-015-0988-9' },
    ],
  },
};
