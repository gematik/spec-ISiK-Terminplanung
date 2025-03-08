---
topic: ISiKTerminblock-Profil
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminblock
---
## {{link}}

<fql output="inline">
from
	StructureDefinition
where
	url = %canonical
select
	description
with
  no header
</fql>

### Bestätigungsrelevanz
<fql output="transpose">
from
    CapabilityStatement
where
    url = %capability
for rest.resource.where(%canonical in supportedProfile)
select
    'Verbindlichkeit': extension('http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation').value
</fql>

### Metadaten

<fql output="transpose" headers="true">
from
	StructureDefinition
where
	url = %canonical
select
	Canonical: url, Status: status, Version: version, Basis: baseDefinition
</fql>

### Inhalt

<tabs>
  <tab title="Darstellung">{{tree, buttons}}</tab>
  <tab title="XML">{{xml}}</tab>
  <tab title="JSON">{{json}}</tab>
  <tab title="Link">{{link}}</tab>
</tabs>

### Constraints/Invarianten
<fql headers="true">
from 
    StructureDefinition 
where 
    url = %canonical 
for 
    differential.element.constraint 
select Name: key, Schweregrad: severity, Beschreibung: human, Ausdruck: expression
</fql>

### Terminology-Bindings
<fql headers="true">
from 
    StructureDefinition
where 
    url = %canonical
   
for 
    differential.element
    where 
        binding.exists()
    select
        Element: id, Staerke: binding.strength, ValueSet: binding.valueSet
</fql>

<!--### Mappings

<fql>
      from StructureDefinition
      where url = %canonical
      for differential.element 
      select
        'Ziel: DocumentReference': id,
        join mapping.where(identity = 'CompositionDocumentReferenceMapping')
          { 'Quelle: Document-Bundle': map, Hinweis: comment } 
</fql>-->
