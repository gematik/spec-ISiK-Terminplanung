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
* specialty contains 
  Fachrichtung 1..1 MS and
  ErweiterterFachabteilungsschluessel 0..1
* specialty[Fachrichtung] from $IHEpracticeSettingVS (required)
  * ^comment = "Die Wahl des hinterlegten ValueSets (http://ihe-d.de/ValueSets/IHEXDSpracticeSettingCode) wurde mit einem Mitglied der IHE Deutschland Arbeitsgruppe XDS ValueSets (https://www.ihe-d.de/projekte/xds-value-sets-fuer-deutschland/) abgestimmt (Stand:13.06.2024)."
* specialty[ErweiterterFachabteilungsschluessel] from $FachabteilungsschluesselErweitertCS (required)
  * ^comment = "Dieses ValueSet KANN über ein Mapping (siehe Abschnitt https://wiki.hl7.de/index.php?title=IG:Value_Sets_f%C3%BCr_XDS#DocumentEntry.practiceSettingCode) mit dem ValueSet der Fachrichtung verknüpft werden und darüber ggf. die Integration von Systemen erleichtern."  
* actor 1..* MS  
  * identifier 0..1 MS
  * display 1..1 MS
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* actor contains Akteur 0..1 MS
* actor[Akteur] only Reference(Practitioner or HealthcareService or Location)
* actor[Akteur] ^comment = "Im ISIK-Kontext MUSS die referenzierte Practitioner-Ressource konform zum [ISiKPersonImGesundheitsberuf](https://gematik.de/fhir/isik/StructureDefinition/ISiKPersonImGesundheitsberuf) des Basismoduls sein. Zudem MUSS die referenzierte Location-Ressource konform zum [ISiKStandort](https://gematik.de/fhir/isik/StructureDefinition/ISiKStandort) des Basismoduls sein. Dieses Element dient dazu, um alle Akteure zu gruppieren, sodass für diese Einheit von Terminressourcen ein Terminblock herausgegeben werden kann. Unter 'Akteure' fallen hier auch Standorte und Dienstleistungen."
* actor[Akteur].reference 1..1 MS
* extension MS
* extension contains http://hl7.org/fhir/5.0/StructureDefinition/extension-Schedule.name named KalenderName 0..1 MS
  * valueString 1..1

// This extension can be safely removed as soon as a package for R5 backport extensions is published and referenced by this project
//WIP
Extension: ScheduleName
Id: ScheduleName
* insert Meta
* ^url = "http://hl7.org/fhir/5.0/StructureDefinition/extension-Schedule.name"
* value[x] only string
* valueString 0..1

Instance: ISiKKalenderExample
InstanceOf: ISiKKalender
Usage: #example
* active = true
* serviceType = http://terminology.hl7.org/CodeSystem/service-type#124
* specialty = $IHEAerztlicheFachrichtungen#ALLG
* actor.reference = "Practitioner/example"
* actor.display = "Dr. Fleming"
