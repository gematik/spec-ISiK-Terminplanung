---
topic: ISiKTermin-MS
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKTermin
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

### `Appointment.meta.tag`

**Bedeutung:** Herkunft der Termins

**Hinweis:** Angabe, ob der Termin durch einen externen Termin Requestor eingestellt wurde. Falls das Datenobjekt dauerhaft in das Termin Repository gespeichert wird, KANN der Tag entfernt werden. Für die weitere Prozesssteuerung kann eine Unterscheidung, ob es sich um einen intern oder extern erstellten Termin handelt, notwendig sein, sodass aus Gründen der Nachvollziehbarkeit der Tag bestehen bleiben sollte. Des Weiteren gelten die Vorgaben des ISiK Basismoduls zur [CREATE-Interaktion](https://simplifier.net/guide/isik-basis-v4/markdown-UebergreifendeFestlegungen-UebergreifendeFestlegungen_Rest?version=current).

### `Appointment.extension:Nachricht`

**Bedeutung:** Kommunikation mit dem Patienten

**Hinweis:** Für die Kommunikation mit dem Patienten sind Communication-Ressourcen zu verwenden. Für den Termin relevante Kommentare oder Anhänge MÜSSEN angegeben werden. Zudem kann die Communication-Ressource auch für die Kommunikation zwischen Leistungserbringer verwendet werden. Es ist zu beachten, dass in diesem Fall Kommentare vor der Herausgabe an die Patient:in gefiltert werden sollten.

### `Appointment.extension:replaces`

**Bedeutung:** Angabe eines abgesagten / verschobenen Termins

**Hinweis:** Im Falle, dass per $book-Operation ein verschobener / abgesagter Termin angegeben wird, MUSS dieser für die Rückverfolgbarkeit referenziert werden.

### `Appointment.status`

**Bedeutung:** Differenzierung zwischen Terminwunsch und gebuchten Termin

**Hinweis:** Ein Termin Requestor kann im Status entsprechend wählen, sodass der Termin als Terminwunsch zu interpretieren ist. Nachdem der Termin bestätigt wurde, ist der Terminstatus durch das Termin-Repository anzupassen.

Alle Statuswerte MÜSSEN durch ein bestätigungsrelevantes System unterstützt werden, insbesondere der Status "proposed" und "booked". 

### `Appointment.cancelationReason`

**Bedeutung:** Grund für die Absage eines Termins

**Hinweis:** Eine minimale Kodierung MUSS mittels des vorgeschlagenen Bindings vorliegen. Differenzierungen mit feinerer Granularität können durch weitere Codings erfolgen.

### `Appointment.serviceType`

**Bedeutung:** Kodierung der Behandlungsleistung des Termins

**Hinweis:** Dies SOLL der Kodierung des serviceType eines Schedules entsprechen, der innerhalb des Termins gebucht wird. Ein Termin-Repository SOLL einen Termin abweisen, falls unbekannte Kodierungen in .serviceType durch den Termin-Requestor übermittelt werden, sodass ein Termin-Repository sicherstellen kann, dass alle Ressourcen für die Behandlungsleistung(en) bereitgestellt werden können. Hierzu ist eine Interpretation der Behandlungsleistung notwendig. Ein Termin KANN für mehrere Behandlungsleistungen gebucht werden, falls dies durch die Fachlogik des Termin-Repositories unterstützt wird.

### `Appointment.specialty`

**Bedeutung:** Kodierung der Fachrichtung des Termins

**Hinweis:** Sofern aus den auf der Appointment-Ressource aufsetzenden Anwendungsfällen eine weitere Verarbeitung der Ressource durch einen menschlichen Nutzer nicht ausgeschlossen werden kann, MUSS das bestätigungsrelevante System mit dem Termin verbundenen Ressourcen (insb. `Appointment.slot`, `Appointment.slot.schedule`, `Appointment.participant:AkteurMedizinischeBehandlungseinheit.actor`) oder aus dem spezifischen Kontext verfügbare Informationen auswerten und das Element `Appointment.specialty` mit einem sinnvollen Wert kodieren (eine Ausnahme bildet hier zum Beispiel die fachrichtungs-unabhängige Terminplanung durch krankenhausinterne, zentrale Organisationseinheiten).
Insbesondere ist die Kodierung der Fachrichtung des Termins notwendig im Kontext der Bereitstellung einer graphischen Oberfläche, wie sie Endnutzenden in einem Zuweiserportal/Patientenportal zur Ansicht gebracht wird.

### `Appointment.priority.extension:Priority`

**Bedeutung:** Kodierte Angabe der Priorität des Termins

**Hinweis:** Anstelle der numerischen Priorität MUSS in ISiK eine kodierte Priorität angegeben werden.

### `Appointment.start`

**Bedeutung:** Startzeitpunkt des Termins

**Hinweis:** Sofern der Termin an einen Slot gebunden ist, SOLL der Startzeitpunkt des Termins dem Startzeitpunkt des ersten Slots des Termins entsprechen.

### `Appointment.end`

**Bedeutung:** Endzeitpunkt des Termins

**Hinweis:** Sofern der Termin an einen Slot gebunden ist, SOLL der Endzeitpunkt des Termins dem Endzeitpunkt des letzten Slots des Termins entsprechen.

### `Appointment.slot`

**Bedeutung:** Referenzierung der Slots für die Verknüpfung des Termins mit einem Schedule

**Hinweis:** Die Referenzierung des Schedules kann durch einen oder mehrere Slots erfolgen. Es kann keine Reihenfolge durch die Angabe der Slots abgeleitet werden.

**Hinweis:** In der Vergangenheit liegende Slots, welche nicht verknüpft wurden, dürfen nicht mehr abrufbar sein. Jegliche andere Slots müssen auch per id, herausgegeben werden. Sobald die id einmalig per Search herausgeben wurde, müssen diese gleichbleibend abrufbar sein.

### `Appointment.patientInstruction`

**Bedeutung:** Handlungsanweisungen für die Patienten in Vorbereitung auf den Termin

### `Appointment.participant`

**Bedeutung:** Teilnehmer des Termins

**Hinweis:** Mindestens eine Patient-Referenz MUSS angegeben werden. Dies MUSS durch das Termin-Repository während der Buchung des Termins geprüft werden. Weitere Leistungserbringer KÖNNEN angegeben werden.