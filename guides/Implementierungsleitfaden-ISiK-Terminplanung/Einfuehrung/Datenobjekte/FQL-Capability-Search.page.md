---
topic: FQL-Capability-Search
---

<fql>
from
    CapabilityStatement
where
    url = %capability
for rest.resource.where(%canonical in supportedProfile).searchParam
select
{
     Parameter: name,
     Typ: type,
     Verbindlichkeit: extension('http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation').value,
     Hinweise: documentation
}
</fql>

#### (Reverse-)Include
<fql>
from
    CapabilityStatement
where
    url = %capability
for rest.resource.where(%canonical in supportedProfile)
select
{
     Include: searchInclude,
     ReverseInclude: searchRevInclude
}
</fql>
