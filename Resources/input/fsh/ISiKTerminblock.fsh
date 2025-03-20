Profile: ISiKTerminblock
Parent: Slot
Id: ISiKTerminblock
Description: "Die Slot-Ressource repräsentiert die Verbindung eines Termins (Appointment) und den dazugehörigen Ressourcen (z.B. HealthcareService, Device, Practitioner). Für diese Ressourcen können separate Kalender (Schedules) verwaltet werden. Der Slot agiert als Verbindungsstück zwischen diesen Ressourcen."
* insert Meta
* obeys ISiK-slot-1
* schedule MS
* schedule only Reference(Schedule)
  * reference 1.. MS 
* schedule 
  * ^short = "Verknüpfung einer Termins / Terminblocks und den dazugehörigen Terminlisten bzw. deren Ressourcen."
  * ^comment = "Die Referenz auf Schedule bietet die Möglichkeit der Abfrage eines Appointments / Slots auf Basis einer Verknüpfung mit einem Schedule bzw. eines Schedules für eine bestimmte Ressource (Schedule.actor).

Begründung Kardinalität und MS: Die Kardinalität der reference-Eigenschaft wird auf 1..* festgelegt, um sicherzustellen, dass ein Kalender eindeutig referenziert und identifiziert werden kann."
* status MS
* status 
  * ^short = "Indikator ob ein Slot verwendbar ist für die Buchung eines Appointments."
  * ^comment = "Insbesondere eine Differenzierung des Status 'busy' ermöglicht es einem Termin Requestor passende Termine einem Benutzer zur Verfügung zu stellen. Durch entsprechende Kombinationen können somit Termine in einer passenden Länge gebucht werden.

Begründung Must Support: Dies ist wichtig, um die Verfügbarkeit von Terminen zu gewährleisten, eine Überbuchung zu verhindern und zudem einem Termin-Requestor die Möglichkeit zu bieten, nur freie Termine bei der Terminbuchung anzuzeigen."
* start MS
* start 
  * ^short = "Startdatum des Slots (sekundengenau)."
  * ^comment = "Falls sich ein Appointment über mehrere Slots erstreckt, kann mit Hilfe des Startdatums der Beginn eines zu vereinbarenden Termins gefunden werden.

Begründung Must Support: Dies ist wichtig, um den Zeitpunkt des Termins an einen Termin-Requestor / Termin-Consumer zu kommunizieren."
* end MS
* end 
  * ^short = "Enddatum des Slots (sekundengenau)."
  * ^comment = "Falls sich ein Appointment über mehrere Slots erstreckt, kann mit Hilfe des Enddatums der Slot gefunden werden, welcher als nächster innerhalb einer Reihe gebucht werden muss, sodass das Appointment eine gewünschte Länge erreicht.

Begründung Must Support: Dies ist wichtig, um die Länge des Termins an einen Termin-Requestor / Termin-Consumer zu kommunizieren."

Invariant: ISiK-slot-1
Description: "Der Endzeitpunkt eines Terminsblocks MUSS nach dem Startzeitpunkt liegen"
Severity: #error
Expression: "start <= end"

Instance: ISiKTerminblockExample
InstanceOf: ISiKTerminblock
Usage: #example
* schedule = Reference(ISiKKalenderExample)
* status = #busy
* start = "2022-12-10T09:00:00Z"
* end = "2022-12-10T11:00:00Z"
