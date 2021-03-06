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
* specialty[Fachrichtung] from $authorSpecialtyVS (required)
* name 1.. MS

Instance: ISiKMedizinischeBehandlungseinheitExample
InstanceOf: ISiKMedizinischeBehandlungseinheit
Usage: #example
* active = true
* type = http://terminology.hl7.org/CodeSystem/service-type#124
* specialty = urn:oid:1.2.276.0.76.5.114#010
* name = "Allgemeine Beratungsstelle der Fachabteilung 0100"