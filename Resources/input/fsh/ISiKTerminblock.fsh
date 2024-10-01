//TODO add documentation
Profile: ISiKTerminblock
Parent: Slot
Id: ISiKTerminblock
* insert Meta
* obeys ISiK-slot-1
* schedule 1..1 MS
* schedule only Reference(Schedule)
  * reference 1.. MS 
* schedule ^comment = "Hinweis: Zur Referenzierung auf eine Schedule-Ressource MUSS eine Reference.reference mit einer URL verwendet werden. Das Termin-Repository muss so gestaltet sein, dass es aus Perspektive des Clients nur eine Service-BaseUrl gibt.

Begründung Kardinalität: Die Kardinalität der schedule-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass ein Terminblock immer auf genau einen Kalender verweist. Dies ist wichtig, um die Verfügbarkeit von Terminen zu gewährleisten. Die Kardinalität der reference-Eigenschaft wird auf 1..* festgelegt, um sicherzustellen, dass ein Kalender eindeutig referenziert und identifiziert werden kann. Verschiedene Referenzierungs-Arten (z.B. mit Business-Identifiern) sind ggf. nicht interoperabel."
* status 1..1 MS
* status ^comment = "Begründung Kardinalität: Die Kardinalität der status-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass der Status eines Terminblocks immer angegeben wird. Dies ist wichtig, um die Verfügbarkeit von Terminen zu gewährleisten."
* start 1..1 MS
* start ^comment = "Begründung Kardinalität: Die Kardinalität der start-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass der Startzeitpunkt eines Terminsblocks immer angegeben wird. Dies ist wichtig, um die Verfügbarkeit von Terminen zu gewährleisten."
* end 1..1 MS
* end ^comment = "Begründung Kardinalität: Die Kardinalität der end-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass der Endzeitpunkt eines Terminsblocks immer angegeben wird. Dies ist wichtig, um die Verfügbarkeit von Terminen zu gewährleisten."

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