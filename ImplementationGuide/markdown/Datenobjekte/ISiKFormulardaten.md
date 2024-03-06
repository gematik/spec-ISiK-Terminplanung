---
canonical: https://gematik.de/fhir/isik/Terminplanung/StructureDefinition/ISiKFormulardaten
expand: 2
--- 

## ISiKFormulardaten [(QuestionnaireResponse)](https://hl7.org/fhir/R4/questionnaireresponse.html)

### Motivation
ISiKQuestionnaireResponse dient im Kontext der Terminplanung dazu strukturierte, formularbasierte Zusatzinformationen vom Termin-Requestor an das Termin-Repository zu übermitteln (vgl. {{pagelink:ImplementationGuide/markdown/Datenobjekte/ISiKNachrichtCommunication.md, text:'ISiKCommunication.payload.contentAttachment'}}).

Konkret kann die QuestionnaireResponse dazu genutzt werden, vom Patienten bzw. dem Benutzer eines Terminbuchunsportals erhobene Informationen zu übermitteln, die für die Terminplanung von Relevanz sind, z.B. Fragen zu Symptomen, Anamnese, benötigten Mobilitätshilfen usw.

Die Questonnaire-Ressource dient in FHIR dazu, solche Fragen im Sinne eines Formulars zu spezifizieren, Antwortmöglichkeiten vorzugeben, gegebene Antworten zu Validieren, und diese Formulare in standardisierter Form zwischen verschiedenen Systemen austauschbar zu machen.

In dieser Ausbaustufe ist die Frage nach der Festelegung und dem Austausch der Formulardefinitionen jedoch noch außen vor. Zunächst geht es nur um die Frage, wie die Informationen, die über Formulare erfasst wurden, strukturiert kommuniziert und in den empfangenden Systemen (ohne Kenntnis der Formulardefinition) zur Anzeige gebracht werden können.

In künftigen Ausbaustufen, kann dieses Szenario erweitert werden um z.B.
* Formulardefinitionen zwischen Termin-Repository und Termin-Requester auszutauschen ("KIS gibt vor, welche Informationen im Portal vom Patienten abgefragt werden sollen")
* Formulardefinitionen an bestimmte Terminarten (Appointment.serviceType) zu binden ("Bei Impfterminen müssen andere Informationen vom Patienten erhoben werden als bei Check-Ups")
* Weiternutzbare und -verarbeitbare FHIR-Ressourcen aus den QuestionnaireResponses zu extrahieren ("Aus den Angaben des Patienten zu seinen Allergien werden AllergyIntolerance-Ressourcen erstellt und in die Patientenakte übernommen")
* Formularfelder mittels der über einen FHIR-Endpunkt verfügbaren Daten automatisch vorbelegen um redundante Datenerfassung zu minimieren ("Wenn der Patient bereits im Haus war, muss er seine benötigten Mobilitätshilfen nicht erneut eingegben, er muss lediglich bestätigen, dass die zuvor erfassten Daten weiterhin aktuell sind.")

Um in der ersten Ausbaustufe des formularbasieren Datenaustauschs die Komplexität bei der Darstellung der erhobenen Informationen möglichst gering zu halten,
müssen die Systeme, die formularbasierte Daten erfasen, die Einschränkungen des folgenden QuestionnaireResponse-Profils berücksichtigen:

---
### Kompatibilität
Das QuestionnaireResponse-Profil ist kompatibel zu
* https://demis.rki.de/fhir/StructureDefinition/StatisticInformationBedOccupancy


### FHIR-Profil


<fql>
from 
    StructureDefinition 
where 
    url = %canonical 
select 
    Name: name, Canonical: url, Basis: baseDefinition
</fql>
<fql output="inline" headers="false">
        from
	        StructureDefinition
        where
	        url = %canonical
        select
	        Beschreibung: description
        with
            no header
</fql>
{{tree, buttons}}

---

### Anmerkungen zu Must-Support-Feldern

<fql output = "table" headers="true">

        from 
            StructureDefinition 
        where 
            url = %canonical
        for 
            differential.element 
            where 
                mustSupport = true 
            select Feldname: id, Kurzbeschreibung: short, Hinweise: comment
</fql>