---
topic: ISiKTerminKontaktMitGesundheitseinrichtung-MS
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminKontaktMitGesundheitseinrichtung
---

### Anmerkungen zu Must-Support-Feldern

<fql>
from
	StructureDefinition
where 
    url = %canonical
for differential.element
where mustSupport = true
select
	Feldname: id, Kurzbeschreibung: short, Hinweise: comment
</fql>

### Anmerkungen zu Must-Support-Feldern

### `Encounter.appointment`

**Bedeutung:** Verknüpfung eines Fallkontakts mit einem Termin.

**Hinweise:** Die Referenz auf Appointment ermöglicht Portalen den Fallbezug aus dem Termin zu ermitteln und Dokumente an ein KIS zu senden. 

Zur Umsetzung der Funktionalität zum Dokumentenaustausch gemäß ISiK ist der entsprechende [Implementation Guide zum Modul Dokumentenaustausch](https://simplifier.net/guide/isik-dokumentenaustausch-v4?version=current) zu beachten.