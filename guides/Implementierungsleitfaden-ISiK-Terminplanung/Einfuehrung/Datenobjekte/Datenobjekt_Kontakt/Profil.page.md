---
topic: ISiKTerminKontaktMitGesundheitseinrichtung-Profil
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminKontaktMitGesundheitseinrichtung
---
## {{link}}

## ISiKTerminKontaktMitGesundheitseinrichtung [(Encounter)](https://hl7.org/fhir/R4/encounter.html)

---

### Motivation

Das Datenobjekt ISiKKontaktMitGesundheitseinrichtung dient der Verknüpfung des ISiK-Basis-Encounters (ISiKKontaktMitGesundheitseinrichtung) mit einem Termin (Appointment) und - darauf aufbauend - der Dokumentenkommunikation.

Die Anforderung dieser Verknüpfung stammt aus dem Szenario der Dokument-Übertragung zwischen Patientenportal und krankenhaus-internem Primärsystem (KIS): Dokumente liegen bei Termin-Buchung erst im Patientenportal (im Appointment) vor und werden erst mit Anlage des Encounters in das KIS (etc.) übermittelt. Dazu muss das Appointment mit dem neu angelegten Encounter verknüpft werden, um die Dokumente aus dem Patientenportal darüber zuzuordnen.

Hieraus folgt, dass das Datenobjekt nur relevant ist, falls das bestätigungsrelevante System das Datenobjekt ISiKKontaktMitGesundheitseinrichtung sowie ISiKTermin implementiert. Zu Beginn des Termins sollte das System die Verknüpfung zwischen Encounter und Appointment herstellen. Ausgenommen hiervon sind Termine, die nicht stattfinden, da für diese in der Regel keine Encounter angelegt werden.

---

### Kompabilität

Siehe {{pagelink:ImplementationGuide/markdown/UseCases/Kompatibilitaet.md, text:Kompabilität}}.

---

### FHIR-Profil

@```
from StructureDefinition where url = 'https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminKontaktMitGesundheitseinrichtung' select Name: name, Canonical: url
```

{{tree:https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminKontaktMitGesundheitseinrichtung, hybrid}}



---



### Weiteres

Siehe für weitere Anmerkungen und Vorgaben den [ISiK-Basis-Encounters (ISiKKontaktMitGesundheitseinrichtung)](https://simplifier.net/guide/isik-basis-v4/ImplementationGuide-markdown-Datenobjekte-Datenobjekte_Kontakt?version=current)
