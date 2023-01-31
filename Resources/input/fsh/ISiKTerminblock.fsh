Profile: ISiKTerminblock
Parent: Slot
Id: ISiKTerminblock
* insert Meta
* obeys ISiK-slot-1
* schedule 1..1 MS
* schedule only Reference(Schedule)
* status 1..1 MS
* start 1..1 MS
* end 1..1 MS

Invariant: ISiK-slot-1
Description: "Der Endzeitpunkt eines Terminsblocks sollte nach dem Startzeitpunkt liegen"
Severity: #error
Expression: "start <= end"

Instance: ISiKTerminblockExample
InstanceOf: ISiKTerminblock
Usage: #example
* schedule = Reference(ISiKKalenderExample)
* status = #busy
* start = "2022-12-10T09:00:00Z"
* end = "2022-12-10T11:00:00Z"