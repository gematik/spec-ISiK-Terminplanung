ValueSet: ISiKTerminStatus
Id: ISiKTerminStatus
Description: "Enthaelt alle erlaubten Status für einen ISiKTermin"
* insert Meta
* $appointmentStatus#proposed
* $appointmentStatus#booked
* $appointmentStatus#fulfilled
* $appointmentStatus#cancelled
* $appointmentStatus#entered-in-error
* $appointmentStatus#noshow

ValueSet: ISiKTerminCancelationReason
Id: ISiKTerminCancelationReason
Description: "Enthaelt alle erlaubten Gruende fuer eine Stornierung eines ISiKTermins"
* insert Meta
* $cancelationReason#pat
* $cancelationReason#prov
* $cancelationReason#maint
* $cancelationReason#meds-inc
* $cancelationReason#other

// This ValueSet is a mock and should be removed as soon as the actual ValueSet is finished
ValueSet: ISiKTerminSourceMock
Id: ISiKTerminSourceMock
* insert Meta

// This ValueSet is a mock and should be removed as soon as the actual ValueSet is finished
ValueSet: ISiKTerminServiceTypeMock
Id: ISiKTerminServiceTypeMock
* insert Meta
* http://terminology.hl7.org/CodeSystem/service-type#1

ValueSet: ISiKTerminPriority
Id: ISiKTerminPriority
Description: "Enthaelt alle SNOMED Codes, die eine valide Priorität für den ISiKTermin sind"
* insert Meta
* include codes from system SNOMED_CT where concept descendent-of #272125009