## ISiKTermin [(Appointment)](http://hl7.org/fhir/appointment.html)

---

### Motivation

Das Datenobjekte ISiKTermin repräsentiert einen gebuchten Termin, sowie einen Terminvorschlag.

---

### Kompabilität

Siehe {{pagelink:ImplementationGuide/markdown/UebergreifendeFestlegungen/Kompatibilitaet.md, text:Kompabilität}}.

---

### FHIR-Profil

@```
from StructureDefinition where url = 'https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKTermin' select Name: name, Canonical: url
```

{{tree:https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKTermin, hybrid}}

Folgende FHIRPath-Constraints sind im Profil zu beachten:

@``` from StructureDefinition where url = 'https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKTermin' for differential.element.constraint select key, severity, human, expression```

---

**Terminology Bindings**

@```
from StructureDefinition
where url in ('https://gematik.de/fhir/isik/v3/Terminplanung/StructureDefinition/ISiKTermin' )
for differential.element
select
Path: path,
join binding.where(valueSet.exists())
{
  Name: valueSet.substring((9 + valueSet.indexOf('ValueSet/'))),
  Strength: strength,
  URL: valueSet
}
```

---

### Anmerkungen zu Must-Support-Feldern

### `Appointment.meta.tag`

**Bedeutung:** Herkunft der Termnins

**Hinweis:** Angabe, ob der Termin durch einen externen Termin Requestor eingestellt wurde. Falls das Datenobjekt dauerhaft in das Termin Repository gespeichert wird, MUSS der Tag entfernt werden. Des Weiteren gelten die Vorgaben des ISiK Basismoduls zur [CREATE-Interaktion](https://simplifier.net/guide/isik-basismodul-stufe2/UebergreifendeFestlegungenRest).

### `Appointment.extension:Nachricht`

**Bedeutung:** Kommunikation mit dem Patienten

**Hinweis:** Für die Kommunikation mit dem Patienten sind Communication-Ressourcen zu verwenden. Für den Termin relevante Kommentare oder Anhänge MÜSSEN angegeben werden. Zudem kann die Communication-Ressource auch für die Kommunikation zwischen Leistungserbringer verwendet werden. Es ist zu beachten, dass in diesem Fall Kommentare vor der Herausgabe an die Patien:in gefiltert werden sollten.

### `Appointment.extension:replaces`

**Bedeutung:** Angabe eines abgesagten / verschobenen Termins

**Hinweis:** Im Falle, dass per $book-Operation ein verschobener / abgesagter Termin angegeben wird, MUSS dieser für die Rückverfolgbarkeit referenziert werden.

### `Appointment.status`

**Bedeutung:** Differenzierung zwischen Terminwunsch und gebuchten Termin

**Hinweis:** Ein Termin Requestor kann im Status entsprechend wählen, sodass der Termin als Terminwunsch zu interpretieren ist. Nachdem der Termin bestätigt wurde, ist der Terminstatus durch das Terminrepository anzupassen.

Alle Statuswerte MÜSSEN durch ein bestätigungsrelevantes System unterstüzt werden, insbesondere der Status "proposed" und "booked".

### `Appointment.cancelationReason`

**Bedeutung:** Grund für die Absage eines Termins

**Hinweis:** Eine minimale Kodierung MUSS mittels des vorgeschlagenen Bindings vorliegen. Granularere Differenzierungen können durch weitere Codings erfolgen.

### `Appointment.serviceType`

**Bedeutung:** Kodierung der Behandlungsleistung des Termins

**Hinweis:** Dies SOLLTE der Kodierung des serviceType eines Schedules entsprechen, der innerhalb des Termins gebucht wird.

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

**Hinweis:** Die Referenzierung des Schedules kann durch einen oder mehrere Slots erfolgen. Falls mehrere Slots referenziert werden, MÜSSEN diese den gleichen Schedule referenzieren. Es kann keine Reihenfolge durch die Angabe der Slots abgeleitet werden.

**Hinweis:** In der Vergangenheit liegende Slots, welche nicht verknüpft wurden, dürfen nicht mehr abrufbar sein. Jegliche andere Slots müssen auch per id, herausgegeben werden. Sobald die id einmalig per Search herausgeben wurde, müssen diese gleichbleibend abrufbar sein.

### `Appointment.patientInstruction`

**Bedeutung:** Handlungsanweisungen für die Patienten in Vorbereitung auf den Termin

### `Appointment.participant`

**Bedeutung:** TeilnehmerInnen des Termins

**Hinweis:** Mindestens eine Patient-Referenz MUSS angegeben werden. Dies MUSS durch das Termin-Repository während der Buchung des Termins geprüft werden. Weitere Leistungserbringer KÖNNEN angegeben werden.

---

### Interaktionen

Für die Ressource Appointment MUSS die REST-Interaktion "READ" und "PATCH" implementiert werden.

1. Der Suchparameter "_id" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?_id=103270```

    Anwendungshinweise: Weitere Informationen zur Suche nach "_id" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Parameters for all resources"](http://hl7.org/fhir/R4/search.html#all).

1. Der Suchparameter "status" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?status=booked```

    Anwendungshinweise: Weitere Informationen zur Suche nach "Appointment.status" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Token Search"](http://hl7.org/fhir/R4/search.html#token).

1. Der Suchparameter "service-type" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?service-type=http://example.org/fhir/CodeSystem/ScheduleServiceType|CT```

    Anwendungshinweise: Bei einer Suche mit dem ":not"-Modifier MÜSSEN Ressourcen, die keinen Wert für "Appointment.serviceType" enthalten, im Suchergebnis enthalten sein. Bei einer Suche ohne den ":not"-Modifier DÜRFEN Ressourcen, die keinen Wert für "Appointment.serviceType" enthalten, NICHT im Suchergebnis enthalten sein. Weitere Informationen zur Suche nach "Appointment.serviceType" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Token Search"](http://hl7.org/fhir/R4/search.html#token).

1. Der Suchparameter "specialty" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?specialty=urn:oid:1.2.276.0.76.5.114|535```

    Anwendungshinweise: Bei einer Suche mit dem ":not"-Modifier MÜSSEN Ressourcen, die keinen Wert für "Appointment.speciality" enthalten, im Suchergebnis enthalten sein. Bei einer Suche ohne den ":not"-Modifier DÜRFEN Ressourcen, die keinen Wert für "Appointment.speciality" enthalten, NICHT im Suchergebnis enthalten sein. Weitere Informationen zur Suche nach "Appointment.specialty" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Token Search"](http://hl7.org/fhir/R4/search.html#token).


1. Der Suchparameter "date" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?date=2022-12-10T09:00:00Z```

    Anwendungshinweise: Die Suche wird gegen das Element "Appointment.start" ausgewertet. Weitere Informationen zur Suche nach "Appointment.start" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Date Search"](http://hl7.org/fhir/R4/search.html#date).

1. Der Suchparameter "slot" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?slot=Slot/ISiKSlotExample```

    Anwendungshinweise: Weitere Informationen zur Suche nach "Appointment.slot" finden sich in der [FHIR-Basisspezifikation - Abschnitt "reference"](http://hl7.org/fhir/R4/search.html#reference).

1. Der Suchparameter "actor" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Appointment?actor=Patient/ISiKPatientExample```

    Anwendungshinweise: Weitere Informationen zur Suche nach "Appointment.participant.actor" finden sich in der [FHIR-Basisspezifikation - Abschnitt "reference"](http://hl7.org/fhir/R4/search.html#reference).

---

### Beispiele

{{json:ISiKTerminExample}}