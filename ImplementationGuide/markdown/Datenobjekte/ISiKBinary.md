## ISiKBinary [(Binary)](https://hl7.org/fhir/R4/binary.html)

ISiKBinary dient im Kontext der Terminplanung dazu Zusatzinformationen an das Termin-Repository bzw. den Termin-Requestor zu übermitteln. Die Ressource ist im ISIK Terminplanungsmodul in der ISIiNachricht vorgesehen (vgl. {{pagelink:ImplementationGuide/markdown/Datenobjekte/ISiKNachrichtCommunication.md, text:'ISiKCommunication.payload.contentAttachment'}}).

### Normativer Status

Da die ISiKNachricht NICHT unterstützt werden MUSS, gilt für die ISiKBinary: diese SOLL unterstützt werden, falls eine ISiKNachricht unterstützt wird.

---

### FHIR-Profil

Es gelten bis auf weiteres die Vorgaben des ISiK Basismoduls für das Profil ['ISiKBinary'](https://simplifier.net/guide/Implementierungsleitfaden-ISiK-Basismodul-Stufe-3/ImplementationGuide-markdown-Datenobjekte-Datenobjekte-Binary?version=current).
Ein Termin Repository SOLL die Anlage (Create-Interaktion) einer Binary-Ressource entsprechend der Vorgaben des [ISiK-Basismoduls](https://simplifier.net/guide/Implementierungsleitfaden-ISiK-Basismodul-Stufe-3/markdown-UebergreifendeFestlegungen-UebergreifendeFestlegungen-Rest?version=current) unterstützen.
Die Binary-Ressource SOLL in ihrem originalen Repräsentationsformat, sowie als FHIR-Ressource abgerufen werden können (vgl. [Serving Binary Resources using the RESTful API](https://www.hl7.org/fhir/R4/binary.html#rest)).

