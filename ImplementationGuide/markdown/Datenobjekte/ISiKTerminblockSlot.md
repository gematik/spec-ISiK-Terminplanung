## ISiKTerminblock [(Slot)](https://hl7.org/fhir/R4/slot.html)

---

### Motivation

Die Slot-Ressource repräsentiert die Verbindung eines Termins (Appointment) und den dazugehörigen Ressourcen (z.B. HealthcareService, Device, Practitioner). Für diese Ressourcen können separate Kalender (Schedules) verwaltet werden. Der Slot agiert als Verbindungsstück zwischen diesen Ressourcen.

---

### Kompabilität

Siehe {{pagelink:ImplementationGuide/markdown/UebergreifendeFestlegungen/Kompatibilitaet.md, text:Kompabilität}}.

---

### Profil

@```
from StructureDefinition where url = 'https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminblock' select Name: name, Canonical: url
```

{{tree:https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminblock, hybrid}}

Folgende FHIRPath-Constraints sind im Profil zu beachten:

@``` from StructureDefinition where url = 'https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminblock' for differential.element.constraint select key, severity, human, expression```

---

### Anmerkungen zu Must-Support-Feldern

### `Slot.schedule`

**Bedeutung:** Verknüpfung einer Termins / Terminblocks und den dazugehörigen Terminlisten bzw. deren Ressourcen.

**Hinweise:** Die Referenz auf Schedule bietet die Möglichkeit der Abfrage eines Appointments / Slots auf Basis einer Verknüpfung mit einem Schedule bzw. eines Schedules für eine bestimmte Ressource (Schedule.actor).

### `Slot.status`

**Bedeutung:** Indikator ob ein Slot verwendbar ist für die Buchung eines Appointments.

**Hinweise:** Inbesondere eine Differenzierung des Status "busy" ermöglicht es einem Termin Requestor passende Termine einer BenutzerIn zur Verfügung zu stellen. Durch entsprechende Kombinationen können somit Termine in einer passenden Länge gebucht werden.

### `Slot.start`

**Bedeutung:** Startdatum des Slots (sekundengenau).

**Hinweise:** Falls sich ein Appoinment über mehrere Slots erstreckt, kann mit Hilfe des Startdatums der Beginn eines zu vereinbarenden Termins gefunden werden.

### `Slot.end`

**Bedeutung:** Enddatum des Slots (sekundengenau).

**Hinweise:** Falls sich ein Appoinment über mehrere Slots erstreckt, kann mit Hilfe des Enddatums der Slot gefunden werden, welcher als nächste innerhalb einer Reihe gebucht werden muss, sodass das Appointment eine gewünschte Länge erreicht.

---

### Beispiele

Ein valides Beispiel für das Profil ISiKTerminblock ist:

{{json:isikterminblockexample}}


### Interaktionen

Für die Ressource Slot MUSS die REST-Interaktion "READ" implementiert werden.

1. Der Suchparameter "_id" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Slot?_id=103270```

    Anwendungshinweise: Weitere Informationen zur Suche nach "_id" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Parameters for all resources"](https://hl7.org/fhir/R4/search.html#all).

2. Der Suchparameter "schedule" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Slot?schedule=Schedule/ISiKKalenderExample```

    Anwendungshinweise: Weitere Informationen zur Suche nach "Slot.schedule" finden sich in der [FHIR-Basisspezifikation - Abschnitt "reference"](https://hl7.org/fhir/R4/search.html#reference).

3. Der Suchparameter "status" MUSS in Kombination ('&') mit einer Abfrage auf Schedule unterstützt werden:

    Beispiele:

    ```GET [base]/Slot?status=free&schedule=Schedule/ISiKTerminExample```


    Anwendungshinweise: Der Suchparameter MUSS NICHT alleinstehend unterstützt werden. Weitere Informationen zur Suche nach "Slot.status" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Token Search"](https://hl7.org/fhir/R4/search.html#token).

4. Der Suchparameter "start" MUSS in Kombination ('&') mit einer Parameter-Abfrage auf Schedule unterstützt werden:

    Beispiele:

    ```GET [base]/Slot?start=2022-12-10T09:00:00Z&schedule=Schedule/ISiKTerminExample```

    Anwendungshinweise: Der Suchparameter MUSS NICHT alleinstehend unterstützt werden. Weitere Informationen zur Suche nach "Slot.start" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Date Search"](https://hl7.org/fhir/R4/search.html#date).

---

### Verkettete Suchparameter (Chaining und Reverse Chaining)

Auch die verketteten Suchparameter MÜSSEN unterstützt werden und sind mit entsprechenden Referenzen im CapabilityStatement unter ```CapabilityStatement.rest.resource.searchInclude``` bzw. ```CapabilityStatement.rest.resource.searchRevInclude``` angegeben. Siehe {{pagelink:ImplementationGuide/markdown/CapabilityStatement.md}}

Informationen und Beispiele zur Suche nach verketteten Parametern finden sich [im Basismodul](https://simplifier.net/guide/isik-basis-v4/UebergreifendeFestlegungen-UebergreifendeFestlegungen_Suchparameter) und in der FHIR-Basisspezifikation im [Abschnitt "Chained Parameters"](https://hl7.org/fhir/R4/search.html#chaining) und im [Abschnitt "Reverse Chaining"](https://hl7.org/fhir/R4/search.html#has).

Die folgenden Suchparameter des Profils ```Slot``` KÖNNEN die Angabe von weiteren Chaining-Parametern untersützen. Sie hängen dann wie folgt mit den festgelegten {{pagelink:ImplementationGuide/markdown/UseCasesAnwendung/UseCases.md, text:Anwendungsfällen (Use Cases)}} zusammen:

1. Der Suchparameter "schedule" KANN Ausgangspunkt für eine Angabe von weiteren Chaining-Parametern sein:

    Um in der Versorgung eine {{pagelink:ImplementationGuide/markdown/UseCasesAnwendung/UseCases.md, text:Verwechslung}} zwischen verschiedenen Patienten vermeiden und die {{pagelink:ImplementationGuide/markdown/UseCasesAnwendung/UseCases.md, text:benötigte Expertise}} durch den Leistungserbringer sicherheitzustellen.

    Beispiele:

    ```GET [base]/Slot?schedule.actor:HealthcareService.type=https://example.org/fhir/CodeSystem/Behandlungsleistung|CT```

2. Der Suchparameter "status" KANN Ausgangspunkt für eine Angabe von weiteren Chaining-Parametern sein:
    
    Um sicherzustellen, dass die {{pagelink:ImplementationGuide/markdown/UseCasesAnwendung/UseCases.md, text:benötigte Expertise}} durch einen entsprechenden Leistungserbringer aus der aktuellen {{pagelink:ImplementationGuide/markdown/UseCasesAnwendung/UseCases.md, text:Schicht}} abgedeckt werden kann.
    
    Beispiele:

    ```GET [base]/Slot?status=free&schedule.actor:Practitioner.name=Musterarzt```

3. Der Suchparameter "start" KANN Ausgangspunkt für eine Angabe von weiteren Chaining-Parametern sein:

    Um sicherzustellen, dass die {{pagelink:ImplementationGuide/markdown/UseCasesAnwendung/UseCases.md, text:benötigte Expertise}} des Leistungserbringers zum Start des Termins nicht {{pagelink:ImplementationGuide/markdown/UseCasesAnwendung/UseCases.md, text:mehrfach belegt}} ist.
    
    Beispiele:

    ```GET [base]/Slot?start=2022-12-10T09:00:00Z&schedule.actor:Practitioner.name=Musterarzt```
