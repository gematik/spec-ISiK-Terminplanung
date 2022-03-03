Profile: ISiKTermin
Parent: Appointment
Id: ISiKTermin
* meta.
  * tag 0..* MS
    * ^slicing.discriminator.type = #pattern
    * ^slicing.discriminator.path = "$this"
    * ^slicing.rules = #open
  * tag contains Source 0..1 MS
  * tag[Source] from ISiKTerminSourceMock (required)
* insert Meta
* identifier 0..* MS
* status 1..1 MS
* status from ISiKTerminStatus (required)
* cancelationReason 0..1 MS
* cancelationReason from ISiKTerminCancelationReason (required)
* start 1..1 MS
* end 1..1 MS
* slot 1..* MS
* comment 0..1 MS
* patientInstruction 0..1 MS
* participant 1..* MS
  * actor 1..1 MS
  * status 1..1 MS
* specialty 1..* MS
  * ^slicing.discriminator.type = #pattern
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* specialty contains AuthorSpecialty 1..1 MS
* specialty[AuthorSpecialty] from $authorSpecialty (required)
* serviceType 1..* MS
* serviceType from ISiKTerminServiceTypeMock (extensible)