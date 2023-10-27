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
* extension contains ISiKNachrichtExtension named Nachricht 0..* MS
* extension contains http://hl7.org/fhir/5.0/StructureDefinition/extension-Appointment.replaces named replaces 0..1 MS
* status 1..1 MS
* cancelationReason 0..1 MS
* cancelationReason from ISiKTerminCancelationReason (required)
* start 1..1 MS
* end 1..1 MS
* slot 0..* MS
  * reference 1.. MS
* slot ^comment = "Zur Referenzierung auf eine Slot-Ressource MUSS eine Reference.reference mit einer URL verwendet werden. Das Termin-Repository muss so gestaltet sein, dass es aus Perspektive des Clients nur eine Service-BaseUrl gibt." //Zur Begründung: verschiedene Referenzierungs-Arten (z.B. mit Business-Identifiern) sind ggf. nicht interoperabel
* patientInstruction 0..1 MS
* participant 1..* MS
  * actor 1..1 MS
  * actor.display 1..1 MS
  * status 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "actor.resolve()"
  * ^slicing.rules = #open
* participant contains AkteurPatient 1.. MS
* participant[AkteurPatient].actor only Reference(Patient)
* participant[AkteurPatient].actor MS
* participant[AkteurPatient].actor.reference 1..1 MS
* participant contains AkteurPersonImGesundheitsberuf 0.. MS
* participant[AkteurPersonImGesundheitsberuf].actor only Reference(Practitioner)
* participant[AkteurPersonImGesundheitsberuf].actor MS
* participant[AkteurPersonImGesundheitsberuf].actor.reference 1..1 MS
* participant contains AkteurMedizinischeBehandlungseinheit 0.. MS
* participant[AkteurMedizinischeBehandlungseinheit].actor only Reference(HealthcareService)
* participant[AkteurMedizinischeBehandlungseinheit].actor MS
* participant[AkteurMedizinischeBehandlungseinheit].actor.reference 1..1 MS
* specialty 0..* MS
  * ^slicing.discriminator.type = #pattern
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* specialty contains Fachrichtung 0..1 MS
* specialty[Fachrichtung] from $authorSpecialtyVS (required)
* serviceType 1..* MS 
* priority MS
* priority.extension MS
* priority.extension contains ISiKTerminPriorityExtension named Priority 0..1 MS

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
* status = $appointmentStatus#proposed
* start = "2022-12-10T09:00:00Z"
* end = "2022-12-10T11:00:00Z"
* slot = Reference(ISiKSlotExample)
* priority
  * extension[ISiKTerminPriorityExtension].valueCodeableConcept = http://snomed.info/sct#25876001
* comment = "Dies ist ein Test Kommentar!"
* serviceType = http://terminology.hl7.org/CodeSystem/service-type#124
* specialty = urn:oid:1.2.276.0.76.5.114#010
* participant
  * actor.display = "Test Patient"
  * actor.reference = "Patient/example"
  * status = #accepted

// This extension can be safely removed as soon as a package for R5 backport extensions is published and referenced by this project
Extension: AppointmentReplaces
Id: AppointmentReplaces
* ^url = "http://hl7.org/fhir/5.0/StructureDefinition/extension-Appointment.replaces"
* value[x] only Reference(Appointment)
