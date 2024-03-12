# Übersicht
Im Folgenden wird ein grafischer Überblick über möglichst viele in diesem Modul abgedeckten Anwendungsfälle gegeben.
Da es sich um eine Zusammenfassung handelt, werden nur folgende Use Case und dafür hinreichende Funktionen dargestellt:
* Allgemeine und intuitiv verständliche Use Cases.
  * Kombinationen und weitere Details sind möglich.
  * Übergreifende Use Cases und und ihre Sub Use Cases können in einem separaten Diagram auf den entsprechenden Seiten gefunden werden.
* Allgemeine und intuitiv Adverse Use Cases. Diese gilt es zu vermeiden.
* In den Funktionen werde triviale Suchen einer Ressource anhand ihrer eigenen Properties nicht dargestellt, z.B. Suche einer Ressource anhand der ID, Name, Code usw.


## Use Case Diagramm

<img src="https://raw.githubusercontent.com/gematik/spec-ISiK-Terminplanung/rc/main-stufe-4/Material/images/diagrams/usecases.svg" alt="Use Case Diagrams" width="90%"/>


## Use Case - Benachrichtigung (Kommunikation)

Der Use Case rund um die Benachrichtigung, in Folge "Kommunikation", lässt sich ausdifferenzieren in folgende, die nicht alle durch ISiK sinnvollerweise abgedeckt werden kann, sondern wofür ggf. andere Anwendungen geeigneter erscheinen - wie hier dokumentiert: 

1. Interne Kommunikation eines Leistungserbringers mit einem anderen Leistungserbringers während der Buchung eines internen Termins:
    - Absprache des Termins: "Anfrage des Leistungserbringers: Gibt es an diesem Datum noch einen freien Termin?" -> TIM (?)
    - Rückfragen: Rückfrage des Leistungserbringers zur Terminanfrage -> TIM (?)
    - Notizen: Interne Notizen rund um den Termin -> ISiK, Appointment.comment
    - Formulare: z.B. Interner Anforderungsschein -> ISiK, Questionnaire
1. Externe Kommunikation von Leistungserbringers an Patient:
    - Patientenhinweise: "Bitte nüchtern erscheinen, etc." -> ISiK, Appointment.patientInstruction
1. Externe Kommunikation von Systemen an Patient:
- Formulare: z.B. Einwilligung, Anamnese-Bogen -> ISiK, Questionnaire
- Patientenhinweise: "Bitte nüchtern erscheinen, etc." -> ISiK, Appointment.patientInstruction
- Administrative Hinweise zum Termin: z.B. Anfahrtsskizze -> ISiK, Appointment.supportingInformation
1. Externe Kommunikation von Patient an Krankenhaus/Arzt:
- Antworten auf Fragebögen / Formulare -> ISiK, QuestionnaireResponse
- Fragen und Hinweise zum Termin -> Über ISiK möglich, ISiKNachricht (Communication) u.a. in Communication.inResponseTo für bidirektionale Kommunikation