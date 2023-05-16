## ISiKTerminKontaktMitGesundheitseinrichtung [(Encounter)](http://hl7.org/fhir/encounter.html)

---

### Motivation

Das Datenobjekt ISiKKontaktMitGesundheitseinrichtung dient der Verknüpfung des ISiK-Basis-Encounters (ISiKKontaktGesundheitseinrichtung) mit einem Termin (Appointment) und - darauf aufbauend - der Dokumentenkommunikation.

Die Anforderung dieser Verknüpfung stammt aus dem Szenario der Dokument-Übertragung zwischen Patientenportal und krankenhaus-internem Primärsystem (KIS): Dokumente liegen bei Termin-Buchung erst im Patientenportal (im Appointment) vor und werden erst mit Anlage des Encounters in das KIS (etc.) übermittelt. Dazu muss das Appointment mit dem neu angelegten Encounter verknüpft werden, um die Dokumente aus dem Patientenportal darüber abzufragen/zuzuordnen.

---

### Kompabilität

Siehe {{pagelink:ImplementationGuide/markdown/UebergreifendeFestlegungen/Kompatibilitaet.md, text:Kompabilität}}.

---

### FHIR-Profil

@```
from StructureDefinition where url = 'https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKTerminKontaktMitGesundheitseinrichtung' select Name: name, Canonical: url
```

{{tree:https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKTerminKontaktMitGesundheitseinrichtung, hybrid}}

### Anmerkungen zu Must-Support-Feldern

### `Encounter.appointment`

**Bedeutung:** Verknüpfung eines Fallkontakts mit einem Termin.

**Hinweise:** Die Referenz auf Appointment ermöglicht Portalen den Fallbezug aus dem Termin zu ermitteln und Dokumente an ein KIS zu senden. 

Zur Umsetzung der Funktionalität zum Dokumentenaustausch gemäß ISiK ist der entsprechende [Implementation Guide zum Modul Dokumentenaustausch](https://simplifier.net/guide/Implementierungsleitfaden%20ISiK-Modul%20Dokumentenaustausch/ImplementationGuide-markdown-Einfuehrung?version=current) zu beachten.

---

### Interaktionen

Für die Ressource Appointment MUSS die REST-Interaktion "READ" implementiert werden:

Der Suchparameter "encounter" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?encounter=Encounter/123```

    Anwendungshinweise: Weitere Informationen zur Suche nach "encounter" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Reference Search"](https://www.hl7.org/fhir/search.html#reference).

### Weitere

Siehe für weitere Anmerkungen und Vorgaben den [ISiK-Basis-Encounters (ISiKKontaktGesundheitseinrichtung)](https://simplifier.net/guide/Implementierungsleitfaden-ISiK-Basismodul-Stufe-3/ImplementationGuide-markdown-Datenobjekte-Datenobjekte-Kontakt?version=current)