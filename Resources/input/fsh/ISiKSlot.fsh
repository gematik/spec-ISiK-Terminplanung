Profile: ISiKSlot
Parent: Slot
Id: ISiKSlot
* insert Meta
* obeys ISiK-app-1
* schedule 1..1 MS
* schedule only Reference(ISiKKalender)
* status 1..1 MS
* start 1..1 MS
* end 1..1 MS

Instance: ISiKSlotExample
InstanceOf: ISiKSlot
Usage: #example
* schedule = Reference(ISiKKalenderExample)
* status = #active
* start = "2022-12-10T09:00:00Z"
* end = "2022-12-10T11:00:00Z"