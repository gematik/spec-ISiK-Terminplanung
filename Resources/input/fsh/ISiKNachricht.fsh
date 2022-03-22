Profile: ISiKNachricht
Parent: Communication
Id: ISiKNachricht
* insert Meta
* subject 1..1 MS
* subject only Reference(Patient)
* recipient 1..* MS
  * identifier 0..1 MS
  * display 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* recipient contains ISiKRecipient 1.. MS
* actor[ISiKRecipient] only Reference(Practitioner or HealthcareService)
* actor[ISiKRecipient].reference 1..1 MS
* payload 1..* MS
  * content[x] MS
  * contentString MS
  * contentAttachment MS