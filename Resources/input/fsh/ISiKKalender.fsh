Profile: ISiKKalender
Parent: Schedule
Id: ISiKKalender
* insert Meta
* active 1..1 MS
* serviceType 1..* MS
* specialty 1..* MS
  * ^slicing.discriminator.type = #pattern
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* specialty contains Fachrichtung 1..1 MS
* specialty[Fachrichtung] from $authorSpecialtyVS (required)
* actor 1..* MS  
  * identifier 0..1 MS
  * display 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* actor contains Akteur 1..1 MS
* actor[Akteur] only Reference(Practitioner or HealthcareService)
* actor[Akteur].reference 1..1 MS
* extension MS
* extension contains ISiKKalenderNameExtension named Name 0..1 MS

Extension: ISiKKalenderNameExtension
Id: ISiKKalenderNameExtension
* value[x] only string
* valueString 1..1 MS

Instance: ISiKKalenderExample
InstanceOf: ISiKKalender
Usage: #example
* active = true
* serviceType = http://terminology.hl7.org/CodeSystem/service-type#124
* specialty = urn:oid:1.2.276.0.76.5.114#010
* actor.reference = "Practitioner/example"
* actor.display = "Dr. Fleming"