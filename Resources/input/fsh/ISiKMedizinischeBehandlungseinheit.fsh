Profile: ISiKMedizinischeBehandlungseinheit
Parent: HealthcareService
Id: ISiKMedizinischeBehandlungseinheit
* insert Meta
* active 1..1 MS
* type 1.. MS
* specialty 1.. MS
  * ^slicing.discriminator.type = #pattern
  * ^slicing.discriminator.path = "$this"
  * ^slicing.rules = #open
* specialty contains 
  Fachrichtung 1..1 MS and
  ErweiterterFachabteilungsschluessel 0..1
* specialty[Fachrichtung] from $IHEpracticeSettingVS (required)
  * ^comment = "Die Wahl des hinterlegten ValueSets (http://ihe-d.de/ValueSets/IHEXDSpracticeSettingCode) wurde mit einem Mitglied der IHE Deutschland Arbeitsgruppe XDS ValueSets (https://www.ihe-d.de/projekte/xds-value-sets-fuer-deutschland/) abgestimmt (Stand:27.5.2024)."
* specialty[ErweiterterFachabteilungsschluessel] from $FachabteilungsschluesselErweitertCS (required)
  * ^comment = "Dieses ValueSet KANN über ein Mapping (siehe Abschnitt https://wiki.hl7.de/index.php?title=IG:Value_Sets_f%C3%BCr_XDS#DocumentEntry.practiceSettingCode) mit dem ValueSet der Fachrichtung verknüpft werden und darüber ggf. die Integration von Systemen erleichtern."  
* name 1.. MS

Instance: ISiKMedizinischeBehandlungseinheitExample
InstanceOf: ISiKMedizinischeBehandlungseinheit
Usage: #example
* active = true
* type = http://terminology.hl7.org/CodeSystem/service-type#124
* specialty[Fachrichtung] = $IHEAerztlicheFachrichtungen#ALLG
* name = "Allgemeine Beratungsstelle der Fachabteilung 0100"