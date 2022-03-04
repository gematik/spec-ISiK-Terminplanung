Profile: ISiKKalender
Parent: Schedule
Id: ISiKKalender
* insert Meta
* active 1..1 MS
* serviceType 1..* MS 
* serviceType from ISiKTerminServiceTypeMock (extensible)
* specialty 1..* MS
  * ^slicing.discriminator.type = #pattern
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* specialty contains Fachrichtung 1..1 MS
* specialty[Fachrichtung] from $authorSpecialty (required)
* actor 1..* MS
  * display 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* actor contains Akteur 1..1 MS
* actor[Akteur] only Reference(Practitioner or HealthcareService)
* actor[Akteur].reference 1..1 MS
* extension contains ISiKKalenderNameExtension named Name 0..1 MS

Extension: ISiKKalenderNameExtension
Id: ISiKKalenderNameExtension
* value[x] only string
* valueString 1..1 MS