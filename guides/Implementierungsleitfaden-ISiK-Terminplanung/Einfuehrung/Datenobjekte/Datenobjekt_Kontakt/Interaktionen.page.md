---
topic: ISiKTerminKontaktMitGesundheitseinrichtung-Interaktionen
canonical: https://gematik.de/fhir/isik/StructureDefinition/ISiKTerminKontaktMitGesundheitseinrichtung
---
### Interaktionen

Für die Ressource Encounter MUSS die REST-Interaktion "READ" implementiert werden:

Der Suchparameter "appointment" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/Encounter?appointment=Appointment/123```

    Anwendungshinweise: Weitere Informationen zur Suche nach "appointment" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Reference Search"](https://www.hl7.org/fhir/R4/search.html#reference).

<fql output="inline">
from
    CapabilityStatement
where
    url = %capability
for rest.resource.where(%canonical in supportedProfile)
select
    documentation
with
    no header
</fql>

<tabs>
    <tab title="Interaktionen"> 
        {{page:FQL-Capability-REST}}
    </tab>
    <tab title="Suchparameter">
        {{page:FQL-Capability-Search}}
    </tab>
    <tab title="Operationen">
        {{page:FQL-Capability-Operations}}
    </tab>
    <tab title="Link">
        {{pagelink:CapabilityStatement}}
    </tab>
</tabs>



