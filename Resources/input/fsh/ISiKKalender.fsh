Profile: ISiKKalender
Parent: Schedule
Id: ISiKKalender
Description: "Das Datenobjekt ISiKKalender bietet die Möglichkeit Kalender für verschiedene Akteure (Practitioner, Device, HealthcareService) zu exponieren, sodass für die Ressourcen Termine gebucht werden können. "
* insert Meta
* active 1..1 MS
  * ^short = "Ist der Kalender in aktiver Verwendung?"
  * ^comment = "Historische Kalender können ebenfalls über die ISiK-Schnittstelle ausgetauscht werden. Für diese dürfen jedoch keine Termine vereinbart werden. Das terminführende System MUSS dies bei der Buchung überprüfen. 

  Begründung Kardinalität und Must-Support-Flag (MS): Die Kardinalität 1..1 und das Must-Support-Flag (MS) für das 'active'-Element stellen sicher, dass jeder Kalender eindeutig als aktiv oder inaktiv gekennzeichnet ist. Dies ist entscheidend für die Ressourcenplanung und Verfügbarkeit von Terminen."
* serviceType 1..* MS
  * ^short = "Welche Besuchsgründe / Behandlungsleistungen werden durch diesen Kalender erfasst?"
  * ^comment = "Die Besuchsgründe / Behandlungsleistungen SOLLEN im Schedule angegeben werden, falls unter Schedule.actor nur Referenzen mit Referenz.display angegeben werden oder direkt auf einen Practitioner referenziert wird. Im Falle, dass ein HealthcareService referenziert wird, SOLLEN die gleichen Informationen wie in HealthcareService.type angegeben werden. Seitens der aktuellen Spezifikation werden keine Vorgaben bezüglich der zu verwendenden Terminologie gemacht. Entsprechend verwendete Kataloge müssen als CodeSystem-Ressource exponiert werden. 

  Begründung zu Kardinalität und Must Support: Die Dienstleistungsart eines Termins ist von entscheidender Bedeutung, um die Verfügbarkeit und Planung des Termins zu gewährleisten. Daher ist dieses Feld verpflichtend (1..*) und muss unterstützt werden (MS). Aufgrund der Heterogenität von Dienstleistungen ist eine standardisierte Kodierung nicht zwingend notwendig, eine Freitextbeschreibung ist ausreichend."
  * text MS
* specialty 1..* MS
  * ^short = "Welche Fachrichtung(en) führen die Behandlungsleistungen, die durch diesen Kalender erfasst werden, aus?"
  * ^comment = "Die Fachrichtung(en) SOLL(EN) im Schedule angegeben werden, falls unter Schedule.actor nur Referenzen mit Referenz.display angegeben werden oder direkt auf einen Practitioner referenziert wird. Im Falle, dass ein HealthcareService referenziert wird, SOLLEN die gleichen Informationen wie in HealthcareService.specialty angegeben werden. 

  Hinweis: Ein Kalender kann für ein Akteur gepflegt werden. Dieser Akteur kann in einer oder mehreren Fachrichtungen agieren. Für die Ressourcenplanung (z.B. welche Akteure sind für einen Termin verfügbar) sollte auch auf die Speciality des Akteurs zurückgegriffen werden für den Fall, dass ein Kalender pro Fachbereich - d.h. Akteur-übergreifend - gepflegt wird. 

  Begründung Kardinalität Must-Support-Flag (MS): Die Kardinalität 1..* und das Must-Support-Flag (MS) für das 'specialty'-Element stellen sicher, dass jeder Kalender mindestens eine Fachrichtung angibt. Dies ist wichtig für die Ressourcenplanung und die Verfügbarkeit von Terminen, sodass angefragte Termine einem Fachbereich zugeordnet werden können."
* actor MS
  * ^short = "Für welche Akteure wird der Kalender geführt?"
  * ^comment = "Nicht alle Target-Ressourcen dieser Referenz existieren als Profil innerhalb des ISiK-Basismoduls oder ISiK-Terminplanung. Für alle Target-Ressourcen SOLL ein Displaywert für die Referenz angegeben werden. Nur für HealthcareService und Practitioner MUSS Reference.reference angegeben werden. 

  Begründung Must-Support-Flag (MS): Das MS-Flag für das 'actor'-Element stellt sicher, dass Systeme in der Lage sind, einen Akteur zu unterstützen, wenn er vorhanden ist. Dies ist wichtig für die Ressourcenplanung und die Verfügbarkeit von Terminen, da jeder Termin nach FHIR-Kernspezifikation einem spezifischen Akteur zugeordnet werden muss. Ohne diese Zuordnung wäre es schwierig, die Verfügbarkeit und Zuständigkeit der Akteure zu verwalten."
* extension MS
* extension contains http://hl7.org/fhir/5.0/StructureDefinition/extension-Schedule.name named KalenderName 0..1 MS
* extension[KalenderName]
  * ^short = "Gebräuchlicher Name des Kalenders"
  * ^comment = "Im alltäglichen Kontext besitzen Kalender neben der Zugehörigkeit zu einer Ressource teilweise einen Namen. Dieser muss nicht zwingend ein eineindeutiger Identifier sein. Aufgrund dessen kann dieser Name zusätzlich abgebildet werden. Falls kein Name angegeben wird, kann ein Termin-Consumer einen Namen z.B. aus den Elementen 'serviceType' oder 'specialty' für Anzeigezwecke ableiten. 

  Begründung Must-Support-Flag (MS): Die KalenderName-Extension ermöglicht es einen menschenlesbaren Namen zu definieren, welcher zur Wiedererkennbarkeit des Kalenders im Rahmen der Terminplanung dient."
  * valueString 1..1

// This extension can be safely removed as soon as a package for R5 backport extensions is published and referenced by this project
//WIP
Extension: ScheduleName
Id: ScheduleName
Context: Schedule
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
