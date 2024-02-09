## ISiKBinary [(Binary)](https://hl7.org/fhir/R4/binary.html)

ISiKBinary dient im Kontext der Terminplanung dazu Zusatzinformationen an das Termin-Repository bzw. den Termin-Requestor zu übermitteln (vgl. {{pagelink:ImplementationGuide/markdown/Datenobjekte/ISiKNachrichtCommunication.md, text:'ISiKCommunication.payload.contentAttachment'}}).

---

### FHIR-Profil

Es gelten bis auf weiteres die Vorgaben des ISiK Basismoduls für das Profil ['ISiKBinary'](https://simplifier.net/guide/Implementierungsleitfaden-ISiK-Basismodul-Stufe-3/ImplementationGuide-markdown-Datenobjekte-Datenobjekte-Binary?version=current).
Ein Termin Repository MUSS die Anlage (Create-Interaktion) einer Binary-Ressource entsprechend der Vorgaben des [ISiK-Basismoduls](https://simplifier.net/guide/Implementierungsleitfaden-ISiK-Basismodul-Stufe-3/markdown-UebergreifendeFestlegungen-UebergreifendeFestlegungen-Rest?version=current) unterstützen.
Die Binary-Ressource MUSS in ihrem originalen Repräsentationsformat, sowie als FHIR-Ressource abgerufen werden können (vgl. [Serving Binary Resources using the RESTful API](https://www.hl7.org/fhir/R4/binary.html#rest)).

