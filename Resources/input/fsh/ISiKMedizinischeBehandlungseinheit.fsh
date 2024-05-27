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
* specialty contains Fachrichtung 1.. MS
* specialty[Fachrichtung] from $IHEpracticeSettingVS (required)
* name 1.. MS

Instance: ISiKMedizinischeBehandlungseinheitExample
InstanceOf: ISiKMedizinischeBehandlungseinheit
Usage: #example
* active = true
* type = http://terminology.hl7.org/CodeSystem/service-type#124
<<<<<<< HEAD
* specialty[Fachrichtung] = $IHEAerztlicheFachrichtungen#ALLG
=======
* specialty[Fachrichtung] = $IHEpracticeSettingCS#ALLG
>>>>>>> 8444e1b529d89602e92c0525edee0f8bd4ae0d31
* name = "Allgemeine Beratungsstelle der Fachabteilung 0100"