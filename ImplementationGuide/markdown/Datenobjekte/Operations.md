### {{page-title}}

Es gelten die allgemeinen Vorgaben der FHIR-Kernspezifikation für die Ausführung von [Custom Operations](https://www.hl7.org/fhir/operations.html).

---

### Buchung eines Termins

{{render:ISiKAppointmentBookOperation}}

### Übersicht Interaktion Termin Requestor mit Termin Repository

Folgende Schritte KÖNNEN notwendig sein, sodass ein Termin durch einen Termin Requestor innerhalb eines Termin Repository eingestellt wird. Es ist zu beachten, dass für spezielle Implementierungen nicht alle Schritte hiervon relevant sind und übersprungen werden können.

Generell wird darauf hingewiesen, dass abhängig davon, welcher Client oder Benutzer eine Interaktion ausführt, unterschiedliche Ergebnisse zurückgeliefert werden können. Die vorliegende Spezifikation macht keine Vorgaben, wie eine Authentifizierung und Autorisierung zu implementieren ist. Es wird hierzu auf das [ISiK-Modul 'Sicherheit'](https://simplifier.net/guide/implementierungsleitfadenisik-sicherheit) verwiesen.

1. Abfrage aller Kodierungen der Behandlungsleistungen: `GET https://example.org/fhir/CodeSystem?context-type-value=https://gematik.de/fhir/isik/v3/Terminplanung/CodeSystem/ContextType|ResourceUsage$http://hl7.org/fhir/definition-resource-types|HealthcareService`

Das Termin-Repository MUSS alle CodeSysteme exponieren, welche für die Kodierung eines HealthcareService relevant sind. Die Anfrage ist nicht auf HealthcareService beschränkt, weitere Ressourcen-Kontexte können abgefragt werden. Alle verwendeten CodeSysteme MÜSSEN exponiert werden, insoweit diese sich als CodeSystem-Ressourcen ausdrücken lassen.

2. Abfrage aller verfügbaren Kalender: `GET https://example.org/fhir/Schedule`

Der Termin-Requestor KANN durch die Abfrage aller verfügbaren Kalender alle Ressourcen abfragen, für die eine Termin-Buchung zur Verfügung steht.

3. Abfrage aller verfügbaren Slots für einen Kalender: `GET https://example.org/fhir/Slot?schedule=<Schedule/ISiKKalenderExampple>`

In diesem Fall ist auch ein Chaining auf weitere verknüpfte Akteure möglich: `GET https://example.org/fhir/Slot?schedule.actor:HealthcareService.type=https://example.org/fhir/CodeSystem/Behandlungsleistung|CT`

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

Für den Fall, dass ein Terminrepository zum aktuellen Zeitpunkt keine Terminbestätigung geben kann, wird in der Antwortnachricht zurückgegebenen Appointment-Ressource der Wert von "Appointment.status" auf "pending" gesetzt. Als HTTP-Status-Code MUSS das Terminrepository "202 - Accepted" zurückgeben.
Beispielsweise kann dies der Fall sein, falls ein Termin zunächst manuell im Terminrepository bestätigt werden muss. Sobald ein Termin im Status "pending" seitens des Terminrepository bestätigt oder abgesagt wurde, MUSS das Terminrepository den Status des Termins auf "booked" bzw. "canceled" stellen. Sofern dieses unterstützt wird, SOLL eine Benachrichtigung des Termin-Consumers per Push-Mechanismus erfolgen (siehe auch nächster Abschnitt). In jedem Fall MUSS der Termin-Consumer über eine Lese- oder Such-Anfrage jederzeit den aktuellen Status der Terminbuchung ermitteln können.

---

### Aktualisierung / Absage eines Termins

Es ist zu beachten, dass es aus Effizienzgründen für bestimmte Implementierungen sinnvoll sein kann, dass Updates einer Appointment-Ressource ausgelöst durch das Termin-Repository mittels eines Push-Mechanismus an Termin-Consumer / Termin-Requestor übermittelt werden. Im Standard-Fall müssen diese Akteure die Ressourcen mittels des entsprechenden Endpunktes eigenständig abfragen und auf Updates überprüfen. Für einen Push-Mechanismus wird auf [FHIR Subscriptions](https://www.hl7.org/fhir/subscription.html) verwiesen. Die vorliegende Spezifikation macht jedoch KEINE Vorgaben für die Verwendung einer solchen Methodik.

Eine Aktualisierung der Ressource erfolgt mittels einer [HTTP PATCH-Interaktion](https://www.hl7.org/fhir/http.html#patch). Updates einer Appointment-Ressource MUSS das Termin Repository untersützen. Es MUSS mindestens die PATCH-Interaktion auf Basis einer FHIRPath-Patch-Parameter Ressource unterstüzt werden.

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

Ein Termin Repository MUSS die Anlage (Create-Interaktion) einer Patient-Ressource entsprechend der Vorgaben des [ISiK-Basismoduls](https://simplifier.net/guide/implementierungsleitfadenisik-basismodul/I-UebergreifendeFestlegungen-UebergreifendeFestlegungen-Rest?version=current) unterstützen.


---

### Asynchrone Ausführung $book

Die Operation zur Buchung eines Termin MUSS ebenfalls asychron ausgeführt werden können, für den Fall, dass ein Terminrepository keine Zusagen zu Antwortzeiten machen kann und so dass Problem besteht, dass der Client in einen Timeout läuft. Beispielsweise kann dies der Fall sein, wenn die Buchungsanfrage im Terminrepository asynchrone Anfragen an andere Systeme auslöst und der Termin erst bestätigt werden kann, wenn diese durchgelaufen sind. Es gelten die Regeln der [FHIR Kernspezifikation - Abschnitt 3.2.0.7 Executing an Operation Asynchronously](https://www.hl7.org/fhir/r4/operations.html):

- Der Aufruf der $book-Operation erfolgte auch im asynchronen Fall durch einen POST-Request
- Ein HTTP-Header mit dem Namen "Prefer" und dem Inhalt "respond-async" MUSS im Aufruf der Operation enthalten sein
- Als HTTP-Status-Code MUSS das Terminrepository 202 - Accepted zurückgeben
- Im Fehlerfall MUSS ein 4XX- oder 5XX-HTTP-Status-Code zurückgeben werden
- Zudem MUSS das Terminrepository einen "Content-Location"-Header zurückliefern indem eine valide absolute URL enthalten ist unter welcher das oben beschriebene Suchbundle inkl. Appointment-Ressource als Antwort auf die Buchung des Termins abgerufen werden kann

