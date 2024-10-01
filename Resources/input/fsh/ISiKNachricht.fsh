Profile: ISiKNachricht
Parent: Communication
Id: ISiKNachricht
* insert Meta
* inResponseTo MS
* status MS
* subject 1.. MS
* subject ^comment = "Begründung Kardinalität: Das Element 'subject' ist obligatorisch (1..1) und muss immer angegeben werden, um sicherzustellen, dass jede Nachricht eindeutig auf einen Patienten bezogen wird."
* subject only Reference(Patient)
* subject ^comment = "Im ISIK-Kontext MUSS der referenzierte Patient konform zum [ISIKPatient](https://gematik.de/fhir/isik/v3/Basismodul/StructureDefinition/ISiKPatient) des Basismoduls sein."
* sent MS
* recipient 1..* MS
  * ^comment = "Begründung Kardinalität: Die Kardinalität der recipient-Eigenschaft wird auf 1..* festgelegt, um sicherzustellen, dass mindestens ein Empfänger vorhanden ist." 
  * identifier 0..1 MS
    * ^comment = "Begründung Kardinalität und Must Support: Die Kardinalität der identifier-Eigenschaft wird auf 0..1 festgelegt, um sicherzustellen, dass ein Empfänger eindeutig identifiziert werden kann. Das Must Support wird auf 'true' gesetzt, um sicherzustellen, dass Systeme in der Lage sind, einen Identifier zu unterstützen, wenn er vorhanden ist."
  * display 1..1 MS
    * ^comment = "Begründung Kardinalität und Must Support: Die Kardinalität der display-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass ein Empfänger immer eindeutig benannt wird. Das Must Support wird auf 'true' gesetzt, um sicherzustellen, dass Systeme in der Lage sind, einen Empfänger anzuzeigen, wenn er vorhanden ist." 
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* recipient contains ISiKRecipient 1.. MS
* recipient[ISiKRecipient] only Reference(Practitioner or HealthcareService)
* recipient[ISiKRecipient].reference 1..1 MS
* recipient ^comment = "Im ISIK-Kontext MUSS die referenzierte Practitioner-Ressource konform zum [ISiKPersonImGesundheitsberuf](https://gematik.de/fhir/isik/v3/Basismodul/StructureDefinition/ISiKPersonImGesundheitsberuf) des Basismoduls sein."
* payload 1..* MS
  * ^comment = "Begründung Kardinalität und Must Support: Die Kardinalität der payload-Eigenschaft wird auf 1..* festgelegt, um sicherzustellen, dass ein Inhalt vorhanden ist. Das Must Support wird auf 'true' gesetzt, um sicherzustellen, dass Systeme in der Lage sind, einen Inhalt zu unterstützen, wenn er vorhanden ist."
  * content[x] MS
  * contentString MS
  * contentAttachment MS
    * contentType 1.. MS
    * data 0..0
    * url 1.. MS
    * creation 1.. MS
* sender 1.. MS
  * ^comment = "Begründung Kardinalität und Must Support: Die Kardinalität der sender-Eigenschaft wird auf 1..* festgelegt, um sicherzustellen, dass mindestens ein Sender vorhanden ist. Das Must Support wird auf 'true' gesetzt, um sicherzustellen, dass Systeme in der Lage sind, einen Sender zu unterstützen, wenn er vorhanden ist."
  * reference 1..1 MS
    * ^comment = "Begründung Kardinalität und Must Support: Die Kardinalität der reference-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass ein Sender eindeutig referenziert und identifiziert werden kann. Das Must Support wird auf 'true' gesetzt, um sicherzustellen, dass Systeme in der Lage sind, einen Sender zu unterstützen."

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
