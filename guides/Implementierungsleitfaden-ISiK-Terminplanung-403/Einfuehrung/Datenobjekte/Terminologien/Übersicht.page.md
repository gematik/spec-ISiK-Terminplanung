---
topic: Terminologie-Uebersicht
---
## {{page-title}}

## Verwendete ValueSets
Übersicht aller ValueSets, für die in diesem Modul ein ensprechendes Binding spezifiziert ist.
<fql>
from StructureDefinition

for differential.element

where binding.exists()
select Pfad:id, 'Stärke':binding.strength, ValueSet:binding.valueSet

</fql>

## ValueSets, die in diesem Modul spezifiziert werden

<fql>
from ValueSet
select Name:name, Beschreibung:description, CodeSystems:compose.include.system, Konzepte:compose.include.concept.select('</br>' + code + ' "' + display + '"'), Canonical:url

</fql>

## CodeSystems, die in diesem Modul spezifiziert werden

<fql>
from CodeSystem
select Name:name, Beschreibung:description,  Konzepte:concept.select('</br>' + code + ' "' + display + '"'), Canonical:url

</fql>