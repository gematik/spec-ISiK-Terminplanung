## {{page-title}}

Für folgende Interaktionen werden im vorliegenden Implementierungsleitfaden Vorgaben für die Umsetzung innerhalb der ISiK-Schnittstelle definiert:

---

{{render:ImplementationGuide/images/Interaktionen/1. Übermittelung Patienteninformationen - zum Termin zugehörige Vorabinformationen.png}}

Für die Auswahl eines verfügbaren Terminblocks kann es notwendig sein, dass das Termin Repository vorab durch den Termin Requestor Vorabinformationen (z.B. für die Krankenversicherung) erhält. Diese können über eine schreibende Schnittstelle an das Terminrepository übermittelt werden. Es ist zu beachten, dass das Termin Repository gegebenenfalls diese Informationen separat von eigens erstellten Datenobjekten vorhält und/oder die Information dauerhaft erst nach einer manuellen Überprüfung durch eine Benutzer:in freigibt.

Gleichermaßen können Informationen zur Patient:in vorab übermittelt werden, sodass gewisse Basisangaben bereits im Terminrepository vorliegen.

Siehe {{pagelink:Operations, text:Anlage einer Patient-Ressource}} für die technische Umsetzung.

---

{{render:ImplementationGuide/images/Interaktionen/2. Verfügbare Behandlungsleistungen abrufen.png}}

Als Einstiegspunkt in die Terminvereinbarung können durch den Termin Requester alle verfügbaren Behandlungsleistungen (HealthcareServices) abgerufen werden, für die das Termin Repository Informationen zu notwendigen Ressourcen (Räume, Personen, Geräte, etc.) bereitstellt.

Siehe {{pagelink:ISiKMedizinischeBehandlungseinheitHealthcareService.md, text: ISiKMedizinischeBehandlungseinheit (HealthcareService) - Interaktionen}} für die technische Umsetzung.

---

{{render:3.verfugbareterminlistenabrufen}}

Der Termin Requestor kann im Anschluss an die Auswahl einer Behandlungsleistung dafür verfügbare Terminlisten (Schedules) im Termin Repository abrufen. Die Terminlisten repräsentieren somit den "Kalender" in dem Termine gebucht werden können.

Siehe {{pagelink:ISiKKalenderSchedule.md, text: ISiKKalender (Schedule) - Interaktionen}} für die technische Umsetzung.

---

{{render:4.abfragevonverfubarenterminblocken}}

Für einen jeweiligen Kalendar kann der Termin Requestor die darin definierten Terminblöcke abfragen. Diese können entsprechend eines Zeitraums und/oder Status (verfügbar, belegt) gefiltert werden.

Siehe {{pagelink:ISiKTerminblockSlot.md, text: ISiKTerminblock (Slot) - Interaktionen}} für die technische Umsetzung.

---

{{render:5.terminneubuchen-buchungsmanagemnentvonverfugbarenterminen}}

Für einen durch die Benutzer:in ausgewählten Terminblock bzw. mehreren aufeinander folgenden Terminblöcken kann durch den Termin Requestor ein Termin angefragt werden. Dieser kann direkt oder erst nach manueller Bestätigung durch das Termin Repository freigegeben werden.

Es ist zu beachten, dass innerhalb dieser Aktion ein terminführendes Termin Repository die Rolle des Termin Requestors übernehmen kann und den neu-angelegten Termin in ein weiteres Terminrepository spiegelt.

Siehe {{pagelink:Operations, text:Buchung eines Termins}} für die technische Umsetzung.

---

{{render:6.1terminabsagenausgehendvomclient}}


{{render:6.2terminabsagenausgehendvomterminfuhrendensystem}}

Termine können sowohl durch den Termin Requestor als Client oder durch das Termin Repository als terminführendes System abgesagt werden.

Siehe {{pagelink:Operations, text:Aktualisierung / Absage eines Termins}} für die technische Umsetzung.

---

{{render:7.1terminverschiebenausgehendvomclient}}



{{render:7.2terminverschiebenausgehendvomterminrepository}}

Termine können sowohl durch den Termin Requestor als Client oder durch das Termin Repository als terminführendes System verschoben werden.

Siehe {{pagelink:Operations, text:Buchung eines Termins}} für die technische Umsetzung.

---

{{render:8.1terminzusatzinformationenaktualisierenausgehendvomclient}}

{{render:8.2terminzusatzinformationenaktualisierenausgehendvomterminr}}

Termine können sowohl durch den Termin Requestor als Client oder durch das Termin Repository als terminführendes System durch Zusatzinformationen (z.B. welche Teilnehmer oder Ressourcen sind Teil des Termins) erweitert werden.

Siehe {{pagelink:Operations, text:Aktualisierung / Absage eines Termins}} für die technische Umsetzung.

---

{{render:9.abfragevonverinbartenterminen}}

Der Termin Requestor oder Termin Consumer kann einen, mehrere oder alle Termine eines Termin Repository abfragen.

Siehe {{pagelink:ISiKTerminAppointment.md, text: ISiKTermin (Appointment) - Interaktionen}} für die technische Umsetzung.