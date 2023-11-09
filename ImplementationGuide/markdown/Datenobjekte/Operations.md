### {{page-title}}

Es gelten die allgemeinen Vorgaben der FHIR-Kernspezifikation für die Ausführung von [Custom Operations](https://www.hl7.org/fhir/R4/operations.html).

---

### Buchung eines Termins

{{render:ISiKAppointmentBookOperation}}

### Übersicht Interaktion Termin Requestor mit Termin Repository

Folgende Schritte KÖNNEN notwendig sein, sodass ein Termin durch einen Termin Requestor innerhalb eines Termin Repository eingestellt wird. Es ist zu beachten, dass für spezielle Implementierungen nicht alle Schritte hiervon relevant sind und übersprungen werden können.

Generell wird darauf hingewiesen, dass abhängig davon, welcher Client oder Benutzer eine Interaktion ausführt, unterschiedliche Ergebnisse zurückgeliefert werden können. Die vorliegende Spezifikation macht keine Vorgaben, wie eine Authentifizierung zu implementieren ist. Es wird als Best-Practice auf das [ISiK-Modul 'Sicherheit'](https://simplifier.net/guide/implementierungsleitfadenisik-basismodul/ImplementationGuide-markdown-Einfuehrung?version=current) verwiesen.

1. Abfrage aller Kodierungen der Behandlungsleistungen durch den Termin-Requestor: `GET https://example.org/fhir/CodeSystem?context-type-value=https://gematik.de/fhir/isik/v2/Terminplanung/CodeSystem/ContextType|ResourceUsage$http://hl7.org/fhir/resource-types|HealthcareService`

Das Termin-Repository MUSS alle CodeSysteme exponieren, welche für die Kodierung eines HealthcareService relevant sind. Die Anfrage ist nicht auf HealthcareService beschränkt, weitere Ressourcen-Kontexte können abgefragt werden. Alle verwendeten CodeSysteme MÜSSEN exponiert werden, insoweit diese sich als CodeSystem-Ressourcen ausdrücken lassen.

Hinweis: Diese Abfrage ist für eine Initialisierung des Termin-Requestors gedacht. Es ist davon auszugehen, dass diese Auswahlliste nicht dynamisch angepasst wird durch das Termin-Repository und nicht bei jeder Terminbuchung erneut abgefragt werden muss.

2. Abfrage aller verfügbaren Kalender: `GET https://example.org/fhir/Schedule`

Der Termin-Requestor KANN durch die Abfrage aller verfügbaren Kalender alle Ressourcen abfragen, für die eine Termin-Buchung zur Verfügung steht.

3. Abfrage aller verfügbaren Slots für einen Kalender durch den Termin-Requestor: `GET https://example.org/fhir/Slot?schedule=<Schedule/ISiKKalenderExample>&status=free`

In diesem Fall ist auch ein Chaining auf weitere verknüpfte Akteure möglich: `GET https://example.org/fhir/Slot?schedule.actor:HealthcareService.type=http://dicom.nema.org/resources/ontology/DCM|CT`

4. Anlage einer Patient-Ressource: `POST https://example.org/fhir/Patient`

```json
{
    "resourceType": "Patient",
    "meta": {
        "tag": [
            {
                "system": "http://fhir.de/CodeSystem/common-meta-tag-de",
                "code": "external"
            }
        ]
    }
    [...]
}
```

5. Aufruf der $book-Operation: `POST https://example.org/fhir/Appointment/$book`

```json
{
    "resourceType": "Parameters",
    "parameters": [
        {
            "name": "appt-resource",
            "resource": {
                "resourceType": "Appointment",
                "status": "proposed",
                "start": "2022-12-10T09:00:00Z",
                "end": "2022-12-10T11:00:00Z",
                "slot":  [
                    {
                        "reference": "ISiKSlotExample"
                    }
                ],
                "specialty":  [
                    {
                        "coding":  [
                            {
                                "code": "010",
                                "system": "urn:oid:1.2.276.0.76.5.114"
                            }
                        ]
                    }
                ],
                "participant":  [
                    {
                        "actor": {
                            "display": "Test Patient",
                            "reference": "Patient/example"
                        },
                        "status": "accepted"
                    }
                ]
            }
        }
    ]
}
```

Antwort:

```json
{
    "resourceType": "Bundle",
    "type": "searchset",
    "entry": [
        {
            "fullUrl": "https://example.org/fhir/Appointment/ISiKAppointmentTest",
            "resource":         {
            "name": "appt-resource",
            "resource": {
                "resourceType": "Appointment",
                "status": "booked",
                "start": "2022-12-10T09:00:00Z",
                "end": "2022-12-10T11:00:00Z",
                "slot":  [
                    {
                        "reference": "ISiKSlotExample"
                    }
                ],
                "specialty":  [
                    {
                        "coding":  [
                            {
                                "code": "010",
                                "system": "urn:oid:1.2.276.0.76.5.114"
                            }
                        ]
                    }
                ],
                "participant":  [
                    {
                        "actor": {
                            "display": "Test Patient",
                            "reference": "Patient/example"
                        },
                        "status": "accepted"
                    }
                ]
            }
        }
        }
    ]
}
```

---

### Aktualisierung / Absage eines Termins

Es ist zu beachten, dass es aus Effizienzgründen für bestimmte Implementierungen sinnvoll sein kann, dass Updates einer Appointment-Ressource ausgelöst durch das Termin-Repository mittels eines Push-Mechanismus an Termin-Consumer / Termin-Requestor übermittelt werden. Im Standard-Fall müssen diese Akteure die Ressourcen mittels des entsprechenden Endpunktes eigenständig abfragen und auf Updates überprüfen. Für einen Push-Mechanismus wird auf [FHIR Subscriptions](https://www.hl7.org/fhir/R4/subscription.html) verwiesen. Die vorliegende Spezifikation macht jedoch KEINE Vorgaben für die Verwendung einer solchen Methodik.

Eine Aktualisierung der Ressource erfolgt mittels einer [HTTP PATCH-Interaktion](https://www.hl7.org/fhir/R4/http.html#patch). Updates einer Appointment-Ressource MUSS das Termin Repository unterstützen. Es MUSS mindestens die PATCH-Interaktion auf Basis einer FHIRPath-Patch-Parameter Ressource unterstüzt werden.

Folgende Elemente DÜRFEN NICHT durch ein Update der Ressourcen verändert werden:

- Appointment.slot
- Appointment.start
- Appointment.end
- Appointment.participant.actor.where(resolve() is Patient)

**Hinweis:** Hinweis: Ein Termin Repository MUSS einen Termin ablehnen, falls der Termin auf einen nicht vorhandenen (gelöscht oder inkativ) Patienten referenziert. Dies gilt insbesondere auch nachträglich für vorläufig angelegte Patienten-Ressourcen.

Sollte die PATCH-Parameter-Ressource eins dieser Elemente verändern, MUSS die Operation mit einem Status Code "HTTP 400 - Bad Request" zurückgewiesen werden. Eine OperationOutcome Ressource MUSS zurückgegeben werden, die in kodierter Form den entsprechenden Fehler beschreibt.

Beispiel: Absage eines Termins

```json
{
    "resourceType": "Parameters",
    "parameter": [{
        "name": "operation",
        "part": [
            {
                "name": "type",
                "valueCode": "replace"
            },
            {
                "name": "path",
                "valueString": "Appointment.status"
            },
            {
                "name": "value",
                "valueCode": "canceled"
            }
        ]
    }]
}
```

---

### Anlage einer Patient-Ressource

Ein Termin Repository MUSS die Anlage (Create-Interaktion) einer Patient-Ressource entsprechend der Vorgaben des [ISiK-Basismoduls](https://simplifier.net/guide/implementierungsleitfadenisik-basismodul/I-markdown-UebergreifendeFestlegungen-UebergreifendeFestlegungen-Rest?version=current) unterstützen.


---

### Asynchrone Ausführung $book

Die Operation zur Buchung eines Termin MUSS ebenfalls asynchron ausgeführt werden können, für den Fall, dass ein Termin-Repository keine Terminbestätigung als direkte Antwort versenden kann. Beispielsweise kann dies der Fall sein, falls ein Termin zunächst manuell im Termin-Repository bestätigt werden muss. Es gelten die Regeln der [FHIR Kernspezifikation - Abschnitt 3.2.0.7 Executing an Operation Asynchronously](https://www.hl7.org/fhir/R4/operations.html):

- Der Aufruf der $book-Operation erfolgte auch im asynchronen Fall durch einen POST-Request
- Ein HTTP-Header mit dem Namen "Prefer" und dem Inhalt "respond-async" MUSS im Aufruf der Operation enthalten sein
- Als HTTP-Status-Code MUSS das Termin-Repository 202 - Accepted zurückgeben
- Im Fehlerfall MUSS ein 4XX- oder 5XX-HTTP-Status-Code zurückgeben werden
- Zudem MUSS das Termin-Repository einen "Content-Location"-Header zurückliefern indem eine valide absolute URL enthalten ist unter welcher das oben beschriebene Suchbundle inkl. Appointment-Ressource als Antwort auf die Buchung des Termins abgerufen werden kann
