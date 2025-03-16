---
topic: FQL-Capability-REST
---
<fql output="inline">
from
    CapabilityStatement
where
    url = %capability
for rest.resource.where(%canonical in supportedProfile)
select
{
     documentation
}
</fql>

<fql>
from
    CapabilityStatement
where
    url = %capability
for rest.resource.where(%canonical in supportedProfile).interaction
select
{
     Interaktion: code,
     Hinweise: documentation,
     Verbindlichkeit: extension('http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation').value
}
</fql>