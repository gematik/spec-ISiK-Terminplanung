---
topic: ISiKKalender-Beispiele
expand: 4
---
### Beispiele



<tabs>
    <tab title="Übersicht">      
        {{render:ISiKKalenderExample}}
    </tab>
    <tab title="XML">      
        {{xml:ISiKKalenderExample}}
    </tab>
    <tab title="JSON">
        {{json:ISiKKalenderExample}}
    </tab>
    <tab title="Link">
        {{link:ISiKKalenderExample}}
    </tab>
</tabs>

Ein Beispiel zu einer gebündelten Suchabfrage auf einen Slot (wie in ISiKKalender.actor erwähnt) ist folgende:

GET https://example.org/fhir/Slot?schedule.actor:HealthcareService.type=http://dicom.nema.org/resources/ontology/DCM|CT&schedule.actor:Location.name=RaumXYZ
