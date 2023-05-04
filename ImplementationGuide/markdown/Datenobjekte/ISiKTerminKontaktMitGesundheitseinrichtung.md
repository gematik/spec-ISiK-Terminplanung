## ISiKTerminKontaktMitGesundheitseinrichtung [(Encounter)](http://hl7.org/fhir/encounter.html)

---

### Motivation

Das Datenobjekt ISiKKontaktMitGesundheitseinrichtung dient allein der Verknüpfung des ISiK-Basis-Encounters (ISiKKontaktGesundheitseinrichtung) mit einem Termin (Appointment).

Die Anforderung dieser Verknüpfung stammt aus dem Szenario der Dokument-Übertragung zwischen Patientenportal und krankenhaus-internem Primärsystem (KIS): Dokumente liegen bei Termin-Buchung erst im Patientenportal (im Appointment) vor und werden erst mit Anlage des Encounters in das KIS (etc.) übermittelt. Dazu muss das Appointment mit dem neu angelegten Encounter verknüpft werden, um die Dokumente aus dem Patientenportal darüber abzufragen/zuzuordnen.

---

### Kompabilität

Siehe {{pagelink:ImplementationGuide/markdown/UebergreifendeFestlegungen/Kompatibilitaet.md, text:Kompabilität}}.

---

### FHIR-Profil

@```
from StructureDefinition where url = 'https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKKontaktMitGesundheitseinrichtung' select Name: name, Canonical: url
```

{{tree:https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKKontaktMitGesundheitseinrichtung, hybrid}}

### Anmerkungen zu Must-Support-Feldern

### `Encounter.appointment`

**Bedeutung:** Verknüpfung eines Fallkontakts mit einem Termin.

**Hinweise:** Die Referenz auf Appointment bietet ermöglicht Portalen den Fallbezug aus dem Termin zu ermitteln und Dokumente an ein KIS zu senden.

---

