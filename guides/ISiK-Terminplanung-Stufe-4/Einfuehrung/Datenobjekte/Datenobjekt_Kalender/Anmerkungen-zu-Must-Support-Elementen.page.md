---
topic: ISiKKalender-MS
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKKalender
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


### `Schedule.extension:KalenderName`

**Bedeutung:** Gebräuchlicher Name des Kalenders

**Hinweis:** Im alltäglichen Kontext besitzen Kalender neben der Zugehörigkeit zu einer Ressource teilweise einen Namen. Dieser muss nicht zwingend ein eineindeutiger Identifier sein. Aufgrund dessen kann dieser Name zusätzlich abgebildet werden. Falls kein Name angegeben wird, kann ein Termin-Consumer einen Namen z.B. aus den Elementen "serviceType" oder "specialty" für Anzeigezwecke ableiten.

### `Schedule.active`

**Bedeutung:** Ist der Kalender in aktiver Verwendung?

**Hinweis:** Historische Kalender können ebenfalls über die ISiK-Schnittstelle ausgetauscht werden. Für diese dürfen jedoch keine Termine vereinbart werden. Das terminführende System MUSS dies bei der Buchung überprüfen.

### `Schedule.serviceType`

**Bedeutung:** Welche Besuchsgründe / Behandlungsleistungen werden durch diesen Kalender erfasst?

**Hinweis:** Die Besuchsgründe / Behandlungsleistungen SOLLEN im Schedule angegeben werden, falls unter Schedule.actor nur Referenzen mit Referenz.display angegeben werden oder direkt auf einen Practitioner referenziert wird. Im Falle, dass ein HealthcareService referenziert wird, SOLLEN die gleichen Informationen wie in HealthcareService.type angegeben werden. Seitens der aktuellen Spezifikation werden keine Vorgaben bezüglich der zu verwendenden Terminologie gemacht. Entsprechend verwendete Kataloge müssen als CodeSystem-Ressource exponiert werden.

### `Schedule.specialty`

**Bedeutung:** Welche Fachrichtung(en) führen die Behandlungsleistungen, die durch diesen Kalender erfasst werden, aus?

**Hinweis:** Die Fachrichtung(en) SOLL(EN) im Schedule angegeben werden, falls unter Schedule.actor nur Referenzen mit Referenz.display angegeben werden oder direkt auf einen Practitioner referenziert wird. Im Falle, dass ein HealthcareService referenziert wird, SOLLEN die gleichen Informationen wie in HealthcareService.specialty angegeben werden.

### `Schedule.actor`

**Bedeutung:** Für welche Akteure wird der Kalender geführt?

**Hinweis:** Nicht alle Target-Ressourcen dieser Referenz existieren als Profil innerhalb des ISiK-Basismoduls oder ISiK-Terminplanung. Für alle Target-Ressourcen SOLL ein Displaywert für die Referenz angegeben werden. Nur für HealthcareService und Practitioner MUSS Reference.reference angegeben werden.
