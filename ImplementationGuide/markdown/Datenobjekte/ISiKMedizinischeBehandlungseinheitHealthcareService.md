## ISiKMedizinischeBehandlungseinheit [(HealthcareService)](https://hl7.org/fhir/R4/healthcareservice.html)

---

### Motivation

Unter einer medizinischen Behandlungseinheit wird innerhalb dieser Spezifikation ein (virtueller) Zusammenschluss von Fachabteilungen, darin agierenden Personen im Gesundheitswesen und zur Verfügung stehenden Ressourcen (z.B. Räume / Geräte), zum Zweck der Ausübung einer Behandlungsleistung, verstanden. Hierfür können von der Fachabteilung (Organization) unabhängige Kalender gepflegt werden.

---

### Kompabilität

Siehe {{pagelink:ImplementationGuide/markdown/UebergreifendeFestlegungen/Kompatibilitaet.md, text:Kompabilität}}.

---

### FHIR-Profil

@```
from StructureDefinition where url = 'https://gematik.de/fhir/isik/v2/Terminplanung/StructureDefinition/ISiKMedizinischeBehandlungseinheit' select Name: name, Canonical: url
```

{{tree:https://gematik.de/fhir/isik/v2/Terminplanung/StructureDefinition/ISiKMedizinischeBehandlungseinheit, hybrid}}

Folgende FHIRPath-Constraints sind im Profil zu beachten:

@``` from StructureDefinition where url = 'https://gematik.de/fhir/isik/v2/Terminplanung/StructureDefinition/ISiKMedizinischeBehandlungseinheit' for differential.element.constraint select key, severity, human, expression```

---

**Terminology Bindings**

@```
from StructureDefinition
where url in ('https://gematik.de/fhir/isik/v2/Terminplanung/StructureDefinition/ISiKMedizinischeBehandlungseinheit' )
for differential.element
select
Path: path,
join binding.where(valueSet.exists())
{
  Name: valueSet.substring((9 + valueSet.indexOf('ValueSet/'))),
  Strength: strength,
  URL: valueSet
}
```

---

### Anmerkungen zu Must-Support-Feldern

### `HealthcareService.active`

**Bedeutung:** Ist der HealthcareService in aktiver Verwendung.

**Hinweis:** Historische HealthcareServices können ebenfalls über die ISiK-Schnittstelle ausgetauscht werden. Für diese dürfen jedoch keine Termine vereinbart werden. Das terminführende System MUSS dies bei der Buchung überprüfen.

### `HealthcareService.type`

**Bedeutung:** Klassifikation der Behandlungsleistung welche durch den HealthcareService erbracht wird

**Hinweis:** Diese Klassifikation sollte stets auch in Appointment.serviceType und Schedule.serviceType angegeben werden. Seitens der aktuellen Spezifikation werden keine Vorgaben bezüglich der zu verwendenden Terminologie gemacht. Entsprechend verwendete Kataloge müssen als CodeSystem- und ValueSet-Ressourcen exponiert werden. Siehe [Suchparameter "content-mode" in ISiK Basis - Datenobjekt ValueSet](https://simplifier.net/guide/implementierungsleitfadenisik-basismodul/ImplementationGuide-markdown-Datenobjekte-Datenobjekte-ValueSet?version=current).

### `HealthcareService.specialty`

**Bedeutung:** Fachrichtung der Behandlungsleistung welche durch den HealthcareService erbracht wird

**Hinweis:** Diese Fachrichtung sollte stets auch in Appointment.specialty und Schedule.specialty angegeben werden.

### `HealthcareService.name`

**Bedeutung:** Informeller Name der Behandlungseinheit

**Hinweis:** Es wird im Rahmen dieser Spezifikation davon ausgegangen, dass für einen HealthcareService keine natürlichen Identifier vorliegen, die in einem realen Kontext vergeben werden. Somit kann durch den Namen ein informeller, jedoch identifizierender Bezeichner vergeben werden. 

---

### Interaktionen

Für die Ressource HealthcareService MUSS die REST-Interaktion "READ" implementiert werden.

1. Der Suchparameter "_id" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/HealthcareService?_id=103270```

    Anwendungshinweise: Weitere Informationen zur Suche nach "_id" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Parameters for all resources"](http://hl7.org/fhir/R4/search.html#all).

1. Der Suchparameter "active" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/HealthcareService?active=true```

    Anwendungshinweise: Weitere Informationen zur Suche nach "HealthcareService.active" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Token Search"](http://hl7.org/fhir/R4/search.html#token).

1. Der Suchparameter "service-type" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/HealthcareService?service-type=http://example.org/fhir/CodeSystem/ScheduleServiceType|CT```

    Anwendungshinweise: Weitere Informationen zur Suche nach "HealthcareService.type" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Token Search"](http://hl7.org/fhir/R4/search.html#token).

1. Der Suchparameter "specialty" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/HealthcareService?specialty=urn:oid:1.2.276.0.76.5.114|535```

    Anwendungshinweise: Weitere Informationen zur Suche nach "HealthcareService.specialty" finden sich in der [FHIR-Basisspezifikation - Abschnitt "Token Search"](http://hl7.org/fhir/R4/search.html#token).

1. Der Suchparameter "name" MUSS unterstützt werden:

    Beispiele:

    ```GET [base]/HealthcareService?name=Medizinische Behandlungseinheit Des Fachbereichs 0100```

    Anwendungshinweise: Weitere Informationen zur Suche nach "HealthcareService.name" finden sich in der [FHIR-Basisspezifikation - Abschnitt "string"](https://www.hl7.org/fhir/search.html#string).

---

### Beispiele

{{json:ISiKMedizinischeBehandlungseinheitExample}}