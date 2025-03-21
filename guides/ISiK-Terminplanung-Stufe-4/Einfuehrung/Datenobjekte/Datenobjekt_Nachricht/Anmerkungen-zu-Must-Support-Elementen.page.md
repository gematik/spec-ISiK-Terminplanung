---
topic: ISiKNachricht-MS
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKNachricht
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

### `Communication.inResponseTo`

**Bedeutung:** Falls die Communication-Ressource in einen zeitlichen Zusammenhang mit weiteren Nachrichten gebracht werden muss, KÖNNEN die Nachrichten miteinander verknüpft werden. Neue Nachrichten MÜSSEN auf die bereits zuvor existierenden Nachrichten zeigen.

### `Communication.subject`

**Bedeutung:** Patient-Referenz als Aussage für welche Patienten die Communication verfasst wird

**Hinweis:** Ein Patientenbezug muss stets gegeben sein, soweit möglich.

### `Communication.recipient`

**Bedeutung:** Empfänger der Communication

**Hinweis:** Für Practitioner und HealthcareService muss Reference.reference angegeben werden. Für weitere Ressourcen MUSS ein Reference.display angegeben werden.

### `Communication.sender`

**Hinweis:** Für Patient, Practitioner und HealthcareService muss Reference.reference angegeben werden. Für weitere Ressourcen MUSS ein Reference.display angegeben werden.

### `Communication.payload`

**Bedeutung:** Inhalt der Communication

**Hinweis:** Ein bestätigungsrelevantes System MUSS sowohl Freitext, als auch base64-kodierte Inhalte unterstützten. Falls strukturierte Metadaten über das zu übermittelnde Dokument verfügbar sind, KANN ein bestätigungsrelevantes System es als DocumentReference-Ressource ablegen. Für die Anlage einer solchen Ressource wird auf das [ISiK Dokumentenaustausch](https://simplifier.net/guide/isik-dokumentenaustausch-v4?version=current) verwiesen. Die erzeugte Ressource SOLL anschließend durch das bestätigungsrelevante System unter dem contentReference-Element als Referenz angegeben werden. Jegliche Funktionalität bezogen auf das Modul Dokumentenaustausch ist nicht bestätigungsrelevant. Dokumente welche als Attachment angegeben werden, MÜSSEN in ihrer URL auf eine [ISiKBinary](https://simplifier.net/guide/isik-basis-v4/ImplementationGuide-markdown-Datenobjekte-Datenobjekte_Binary?version=current) Ressource verweisen. Diese Binary-Ressource SOLL per CREATE-Interaktion angelegt werden im empfangenden System.