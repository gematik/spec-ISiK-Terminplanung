Profile: ISiKTermin
Parent: Appointment
Id: ISiKTermin
* obeys ISiK-app-1
* meta MS
  * tag 0..* MS
    * ^slicing.discriminator.type = #pattern
    * ^slicing.discriminator.path = "$this"
    * ^slicing.rules = #open
  * tag contains Source 0..1 MS
  * tag[Source] from http://fhir.de/ValueSet/common-meta-tag-de (required)
* insert Meta
* extension MS
* status 1..1 MS
* status from ISiKTerminStatus (required)
* cancelationReason 0..1 MS
* cancelationReason from ISiKTerminCancelationReason (required)
* start 1..1 MS
* end 1..1 MS
* slot 0..* MS
* comment 0..1 MS
* patientInstruction 0..1 MS
* participant 1..* MS
  * actor 1..1 MS
  * status 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "actor"
  * ^slicing.rules = #open
* participant contains AkteurPatient 1.. MS
* participant[AkteurPatient].actor only Reference(Patient)
* participant[AkteurPatient].actor.reference 1..1 MS
* participant contains AkteurLeistungserbringer 0.. MS
* participant[AkteurLeistungserbringer].actor only Reference(Practitioner or HealthcareService)
* participant[AkteurLeistungserbringer].actor.reference 1..1 MS
* specialty 1..* MS
  * ^slicing.discriminator.type = #pattern
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* specialty contains Fachrichtung 1..1 MS
* specialty[Fachrichtung] from $authorSpecialtyVS (required)
* serviceType 1..* MS
* priority MS
* priority.extension MS
* priority.extension contains ISiKTerminPriorityExtension named Priority 0..1 MS
* extension contains ISiKNachrichtExtension named Nachricht 0..* MS

Extension: ISiKNachrichtExtension
Id: ISiKNachrichtExtension
* value[x] only Reference(ISiKNachricht)

Extension: ISiKTerminPriorityExtension
Id: ISiKTerminPriorityExtension
* value[x] only CodeableConcept
* valueCodeableConcept 1..1 MS
* valueCodeableConcept from ISiKTerminPriority (required)

Invariant: ISiK-app-1
Description: "Der Endzeitpunkt eines Termins sollte nach dem Startzeitpunkt liegen"
Severity: #error
Expression: "start <= end"

Instance: ISiKTerminExample
InstanceOf: ISiKTermin
Usage: #example
* meta
  * tag = http://fhir.de/CodeSystem/common-meta-tag-de#external
* extension[ISiKNachrichtExtension].valueReference = Reference(ISiKNachrichtExample)
* status = $appointmentStatus#booked
* start = "2022-12-10T09:00:00Z"
* end = "2022-12-10T11:00:00Z"
* slot = Reference(ISiKSlotExample)
* priority
  * extension[ISiKTerminPriorityExtension].valueCodeableConcept = http://snomed.info/sct#25876001
* comment = "Dies ist ein Test Kommentar!"
* serviceType = http://terminology.hl7.org/CodeSystem/service-type#124
* specialty = urn:oid:1.2.276.0.76.5.114#010
* participant
  * actor.reference = "Patient/example"
  * status = #proposed