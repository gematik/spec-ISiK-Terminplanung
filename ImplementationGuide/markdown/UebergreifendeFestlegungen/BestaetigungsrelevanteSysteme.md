# Bestätigungsrelevante Systeme

Hier folgt die Festlegung der Deutschen Krankenhausgesellschaft e. V. wie [hier](https://www.dkgev.de/themen/digitalisierung-daten/elektronische-datenuebermittlung/datenuebermittlung-nach-373-sgb-v-informationssysteme-im-krankenhaus/) aufgeführt

## Festlegung der Deutschen Krankenhausgesellschaft e. V. aus dem Jahr 2022

Die im Folgenden definierten Subsysteme müssen gemäß § 373 Abs. 2 SGB V nach
zweijähriger Übergangsfrist im Krankenhaus um die Schnittstelle erweitert sein, die
das ISIK-Modul bzw. die Datenobjekte der gematik jeweils beschreiben. Die Festlegung der Systeme zu den einzelnen ISiK-Modulen ist um Erläuterungen in eckigen
Klammern ergänzt.

ISiK-Basismodul (Stufe 1 und Stufe 2)
- Krankenhaus-Informationssystem (KIS)

ISiK-Modul Vitalwerte und Körpermaße
- KIS mit Funktion elektronische Kurve bzw. entsprechendes KIS-Modul
- Patientendaten-Managementsystem (PDMS) [z.B. für Intensivbereiche]
- Elektronische Kurve [z.B. für die Verwendung auf Normal-Stationen]

ISiK-Modul Dokumentenaustausch
- KIS
- Dokumentenmanagementsystem (DMS)
- Archivsystem
- Telekonsil-Modul gemäß § 31a BMV-Ä [Ziel ist die clientseitige Implementierung für die Suche nach Dokumenten anhand von Metadaten,
Verarbeitung von Suchergebnissen und Dokumentenzugriff zur Verwendung in Telekonsilien], hierbei keine Umsetzung einer Funktion zum Abruf von Dokumenten aus dem Telekonsil-Modul
- KIM-Client-Anwendungssoftware [die Anwendungsintegration, nicht der
KIM-Client, Implementierung für die Ablage von Dokumenten aus KIM-Nachrichten und den Versand von Dokumenten mit KIM-Nachrichten],
hierbei keine Umsetzung einer Funktion zum Abruf von Dokumenten aus
der KIM-Client-Anwendungssoftware

ISiK-Modul Medication
- KIS
- PDMS [Anwendungsfallbeispiel: Medikationsdaten in das KIS übertragen bei Verlegung vom Intensivbereich auf Normal-Station]
- Software für digitales Medikationsmanagement [z.B. für die Umsetzung
von KHZG Fördertatbestand 5]
- E-Therapieplan-System für Zytostatika-Behandlung mit Verarbeitung
von Verordnungs- und Medikationsinformationen [teilweise Grundlage
für onkologische Verordnungsdaten], gemäß diesen Festlegungen keine
Umsetzung des ISIK-Datenobjekts MedikationsVerabreichung notwendig
- Herstellungssystem mit Verarbeitung von Verordnungs- und Medikationsinformationen [in KH-Apotheke, z.B. für Zytostatika], gemäß diesen
Festlegungen keine Umsetzung des ISIK-Datenobjekts MedikationsVerabreichung notwendig
- E-Rezept-Modul für Herstellungen [eRezept an Fachdienst in TI übertragen]
- Taxierungssoftware [in KH-Apotheke]

ISiK-Modul Terminplanung [z.B. für die Umsetzung von KHZG Fördertatbestand 2]
- KIS
- Patientenportal-Terminmodul

Hinweise und Rückfragen zu den bestätigungsrelevante Systemen können an die [DKG-Geschäftsstelle](https://www.dkgev.de/dkg/verband-auf-einen-blick/geschaeftsstelle/) gerichtet werden.