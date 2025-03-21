---
topic: ISiKMedizinischeBehandlungseinheit-MS
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKMedizinischeBehandlungseinheit
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

### `HealthcareService.active`

**Bedeutung:** Ist der HealthcareService in aktiver Verwendung.

**Hinweis:** Historische HealthcareServices können ebenfalls über die ISiK-Schnittstelle ausgetauscht werden. Für diese dürfen jedoch keine Termine vereinbart werden. Das terminführende System MUSS dies bei der Buchung überprüfen.

### `HealthcareService.type`

**Bedeutung:** Klassifikation der Behandlungsleistung welche durch den HealthcareService erbracht wird

**Hinweis:** Diese Klassifikation SOLL stets auch in Appointment.serviceType und Schedule.serviceType angegeben werden. Seitens der aktuellen Spezifikation werden keine Vorgaben bezüglich der zu verwendenden Terminologie gemacht. Entsprechend verwendete Kataloge müssen als CodeSystem- und ValueSet-Ressourcen exponiert werden. Siehe [Suchparameter "context-type-value" in ISiK Basis - Datenobjekt ValueSet](https://simplifier.net/guide/isik-basis-v4/ImplementationGuide-markdown-Datenobjekte-Datenobjekte_ValueSet?version=current).

### `HealthcareService.specialty`

**Bedeutung:** Fachrichtung der Behandlungsleistung welche durch den HealthcareService erbracht wird

**Hinweis:** Diese Fachrichtung SOLL stets auch in Appointment.specialty und Schedule.specialty angegeben werden.

### `HealthcareService.name`

**Bedeutung:** Informeller Name der Behandlungseinheit

**Hinweis:** Es wird im Rahmen dieser Spezifikation davon ausgegangen, dass für einen HealthcareService keine natürlichen Identifier vorliegen, die in einem realen Kontext vergeben werden. Somit kann durch den Namen ein informeller, jedoch identifizierender Bezeichner vergeben werden.