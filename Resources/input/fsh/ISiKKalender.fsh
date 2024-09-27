Profile: ISiKKalender
Parent: Schedule
Id: ISiKKalender
* insert Meta
* active 1..1 MS
  * ^comment = "Begründung Kardinalität: Die Kardinalität 1..1 und das Must-Support-Flag (MS) für das 'active'-Element stellen sicher, dass jeder Kalender eindeutig als aktiv oder inaktiv gekennzeichnet ist. Dies ist entscheidend für die Ressourcenplanung und Verfügbarkeit von Terminen."
* serviceType 1..* MS
  * ^comment = "Begründung Kardinalität: Die Kardinalität 1..* und das Must-Support-Flag (MS) für das 'serviceType'-Element stellen sicher, dass jeder Kalender mindestens eine Dienstleistungsart angibt. Dies ist wichtig für die Ressourcenplanung und die Verfügbarkeit von Terminen."
* specialty 1..* MS
  * ^comment = "Hinweis: Ein Kalender kann für einen Akteur gepflegt werden. Dieser Akteur kann in einer oder mehreren Fachrichtungen agieren. Für die Ressourcenplanung (z.B. welche Akteure sind für einen Termin verfügbar) sollte auch auf die Speciality des Akteurs zurückgegriffen werden für den Fall, dass ein Kalender pro Fachbereich gepflegt wird. 
  
  Begründung Kardinalität: Die Kardinalität 1..* und das Must-Support-Flag (MS) für das 'specialty'-Element stellen sicher, dass jeder Kalender mindestens eine Fachrichtung angibt. Dies ist wichtig für die Ressourcenplanung und die Verfügbarkeit von Terminen, insbesondere wenn ein Kalender pro Fachbereich gepflegt wird.
  "
* specialty.coding 1..* MS
  * ^slicing.discriminator.type = #pattern
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
  * ^comment = "Begründung Kardinalität: Die Kardinalität der specialty.coding-Eigenschaft wird auf 1..* festgelegt, um sicherzustellen, dass mindestens eine Fachrichtungscodierung vorhanden ist. Dies ist notwendig, um die Spezialisierung des Kalenders eindeutig zu definieren und eine korrekte Zuordnung zu gewährleisten.
  
  Begründung Kardinalität Fachrichtung: Die Kardinalität der Fachrichtung-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass genau eine Fachrichtung vorhanden ist. Dies ist notwendig, um die Spezialisierung des Kalenders eindeutig zu definieren und eine korrekte Zuordnung zu gewährleisten.
  
  Begründung Kardinalität ErweiterterFachabteilungsschluessel: Die Kardinalität der ErweiterterFachabteilungsschluessel-Eigenschaft wird auf 0..1 festgelegt, um sicherzustellen, dass optional eine erweiterte Fachabteilungsschlüssel vorhanden sein kann."
* specialty.coding contains 
  Fachrichtung 1..1 MS and
  ErweiterterFachabteilungsschluessel 0..1
  * ^comment = ""
* specialty.coding[Fachrichtung] from $IHEpracticeSettingVS (required)
  * ^comment = "Die Wahl des hinterlegten ValueSets (http://ihe-d.de/ValueSets/IHEXDSpracticeSettingCode) wurde mit einem Mitglied der IHE Deutschland Arbeitsgruppe XDS ValueSets (https://www.ihe-d.de/projekte/xds-value-sets-fuer-deutschland/) sowie mit der KBV abgestimmt (Stand:13.6.2024)."
* specialty.coding[ErweiterterFachabteilungsschluessel] from $FachabteilungsschluesselErweitertVS (required)
  * ^comment = "Dieses ValueSet KANN über ein Mapping (siehe Abschnitt https://wiki.hl7.de/index.php?title=IG:Value_Sets_f%C3%BCr_XDS#DocumentEntry.practiceSettingCode) mit dem ValueSet der Fachrichtung verknüpft werden und darüber ggf. die Integration von Systemen erleichtern."  
* actor 1..* MS
  * ^comment = "Hinweis: Ein dezidierter Kalender ist für jeden Akteur zu pflegen.
  
  Begründung Kardinalität: Die Kardinalität der actor-Eigenschaft wird auf 1..* festgelegt, um sicherzustellen, dass mindestens ein Akteur vorhanden ist."
  * identifier 0..1 MS
    * ^comment = "Begründung Kardinalität: Die Kardinalität der identifier-Eigenschaft wird auf 0..1 festgelegt, um sicherzustellen, dass optional ein Identifier vorhanden ist.
  Das Must-Support-Flag (MS) für das 'identifier'-Element stellt sicher, dass Systeme in der Lage sind, einen Identifier zu unterstützen, wenn er vorhanden ist. Dies ist wichtig für die eindeutige Identifizierung und Verknüpfung von Akteuren in verschiedenen Systemen."
  * display 0..1 MS
    * ^comment = "Hinweis: Für alle Target-Ressourcen SOLL ein Displaywert für die Referenz angegeben werden, sodass Systeme eine Übersicht der am Termin beteiligten Akteure anzeigen können ohne die Referenzen auflösen zu müssen.
    
    Begründung Kardinalität: Die Kardinalität der display-Eigenschaft wird auf 0..1 festgelegt, um sicherzustellen, dass ein Displaywert eindeutig ist, falls dieser vorhanden ist."  
  * ^slicing.discriminator.type = #type
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* actor contains Akteur 0..1 MS
  * ^comment = "Begründung Kardinalität: Die Kardinalität der Akteur-Eigenschaft wird auf 0..1 festgelegt, um sicherzustellen, dass ein  Akteur eindeutig ist, falls dieser vorhanden ist."
* actor[Akteur] only Reference(Practitioner or HealthcareService or Location)
* actor[Akteur] ^comment = "Im ISIK-Kontext MUSS die referenzierte Practitioner-Ressource konform zum [ISiKPersonImGesundheitsberuf](https://gematik.de/fhir/isik/StructureDefinition/ISiKPersonImGesundheitsberuf) des Basismoduls sein. Zudem MUSS die referenzierte Location-Ressource konform zum [ISiKStandort](https://gematik.de/fhir/isik/StructureDefinition/ISiKStandort) des Basismoduls sein. Dieses Element dient dazu, um alle Akteure zu gruppieren, sodass für diese Einheit von Terminressourcen ein Terminblock herausgegeben werden kann. Unter 'Akteure' fallen hier auch Standorte und Dienstleistungen."
* actor[Akteur].reference 1..1 MS
  * ^comment = "Begründung Kardinalität: Die Kardinalität der Akteur-Eigenschaft wird auf 1..1 festgelegt, um sicherzustellen, dass ein eindeutiger Akteur vorhanden ist."
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
