Profile: ISiKNachricht
Parent: Communication
Id: ISiKNachricht
* insert Meta
* inResponseTo MS
* status MS
* subject 1..1 MS
* subject only Reference(Patient)
* sent MS
* recipient 1..* MS
  * identifier 0..1 MS
  * display 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* recipient contains ISiKRecipient 1.. MS
* recipient[ISiKRecipient] only Reference(Practitioner or HealthcareService)
* recipient[ISiKRecipient].reference 1..1 MS
* payload 1..* MS
  * content[x] MS
  * contentString MS
  * contentAttachment MS
    * contentType 1.. MS
    * data 0..0
    * url 1.. MS
    * creation 1.. MS
* sender 1.. MS
  * identifier 0..1 MS
  * display 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* sender contains ISiKSender 1.. MS
* sender[ISiKSender] only Reference(Patient or Practitioner or HealthcareService)
* sender[ISiKSender].reference 1..1 MS

Instance: ISiKNachrichtExample
InstanceOf: ISiKNachricht
Usage: #example
* status = #completed
* subject.reference = "Patient/ISiKPatientExample"
* recipient.display = "Dr. Martina Musterfrau"
* recipient.reference = "Practitioner/ISiKPractitionerExample"
* sender.display = "Dr. Erika Gabler"
* sender.reference = "Patient/ISiKPatientExample"
* payload.contentString = "Dies ist eine Testnachricht!"