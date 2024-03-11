Profile: ISiKFormulardaten
Parent: QuestionnaireResponse
Description: "Vereinfachtes QuestionnaireResponse-Profil, 
das die Mindestanforderungen für empfangende Systeme zur Erzeugung 
einer geeingeten Darstellung eines ausgefüllten Formulars beschreibt.
Sendende Systeme MÜSSEN bei der Definition von Questionnaires 
die entsprechenden funktionellen Einschränkungen berücksichtigen.
Elemente zu deren Darstellung und Interpretation empfangende Systeme mindestens in der Lage sein müssen, sind mit `Must-Support`-Flags gekennzeichnet."
Id: ISiKFormulardaten
* insert Meta
* questionnaire MS
  * ^short = "Formulardefinition"
  * ^comment = "Canonischer Name der Formulardefinition, die hier ausgefüllt wurde. 
  Die entsprechende Formulardefinition muss in dieser Ausbaustufe vom Termin-Requestor nicht bereitgestellt, bzw. im Termin-Repository nicht bekannt/verfügbar sein.
  Formulardefinitionen sollten jedoch vom festlegenden System mit einem eindeutigen Namen versehen werden."
* status MS
* status = #completed
  * ^short = "Status der Fomularbearbeitung"  
  * ^comment = "Im Kontext der Terminplanung werden nur vollständig ausgefüllte Formulare übermittelt."
* subject 1..1 MS
  * ^short = "Patientenbezug"
* authored 1..1 MS
  * ^short = "Formulardatum"
  * ^comment = "Datum, an dem das Formular ausgefüllt/vervollständigt wurde."
* item MS
  * ^short = "ausgefülltes Formularfeld"
  * ^comment = "Optionale Felder eines Formulars, in die keine Eingaben gemacht wurden, haben kein entsprechendes item in der QuestionnaireResponse."
  * linkId MS
    * ^short = "Referenz zur Definition des Formularfeldes im Questionnaire"  
    * ^comment = "Wenn keine Formulardefinition verfügbar ist, so müssen dennoch alle Formularfelder über eine eindeutige ID referenziert werden."
  * text 1..1 MS
    * ^short = "Fragestellung/Text"
    * ^comment = "Fragestellung/Text gem. Fragebogendefinition. 
      Da in der ersten Ausbaustufe der Zugriff auf die Fragebodendefinition/Questionanire nicht gewährleistet ist, 
      müssen die Texte in der QuestionanireResponse zwingend mitgeführt werden, 
      damit das empfangende System die gegebenen Antworten in geeigneter Form visualisieren kann.
      Der Inhalt kann aus einer knappen Fragestellung aber auch aus mehrzeiligen Hinweistexten bestehen."
  * answer MS
    * ^short = "Antwort"
    * ^comment = "Enthält die Daten, die beim Ausfüllen in das Formularfeld mit der jeweiligen linkId eingegeben wurden.
        Der Datentyp von value ist abhängig von der Art der Fragestellung. Je nach Definition des items im Questionnaire sind Mehrfachantworten möglich.
        Items enthalten keine Antwort, wenn sie im Questionnaire als `group` oder `text` definiert sind."
    * value[x] MS
    * value[x] only boolean or decimal or integer or date or dateTime or time or string or Coding
      * ^short = "Wert der Antwort"
      * ^comment = "Um die Komplexität bei der Darstellung der ausgefüllten Formulare zu reduzieren, wurde die Anzahl der erlaubten Datentypen reduziert."
    * item MS
      * ^short = "Der Antwort zugeordnetes Sub-Item"
      * ^comment = [["Wenn ein übergeordnetes Item (Mehrfach-)Antworten zulässt, müssen Sub-Items der/den Antwort/en des übergeordneten Items zugeordnet werden. (Im Gegensatz zu item.item)]]"
  * item MS 
    * ^short = "Gruppierte Sub-Items"
    * ^comment = [["Wenn ein übergeordnetes Item keine Antworten zulässt (nur der Gruppierung dient), müssen Sub-Items unmittelbar dem übergeordneten Item zugeordnet werden. (Im Gegensatz zu item.answer.item)]]"