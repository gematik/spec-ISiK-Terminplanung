ValueSet: ISiKTerminCancelationReason
Id: ISiKTerminCancelationReason
Description: "Enthaelt alle erlaubten Gruende fuer eine Stornierung eines ISiKTermins"
* insert Meta
* $cancelationReason#pat
* $cancelationReason#prov
* $cancelationReason#maint
* $cancelationReason#meds-inc
* $cancelationReason#other

ValueSet: ISiKTerminPriority
Id: ISiKTerminPriority
Description: "Enthaelt alle SNOMED Codes, die eine valide Priorität für den ISiKTermin sind"
* insert Meta
* include codes from system SNOMED_CT where concept descendent-of #272125009