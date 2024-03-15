Profile: ISiKFormulardaten
Parent: QuestionnaireResponse
Description: "Vereinfachtes QuestionnaireResponse-Profil, 
das die Mindestanforderungen für empfangende Systeme zur Erzeugung 
einer geeigneten Darstellung eines ausgefüllten Formulars beschreibt.
Sendende Systeme MÜSSEN bei der Definition von Questionnaires 
die entsprechenden funktionellen Einschränkungen berücksichtigen.
Elemente zu deren Darstellung und Interpretation empfangende Systeme mindestens in der Lage sein müssen, sind mit `Must-Support`-Flags gekennzeichnet."
Id: ISiKFormulardaten
* insert Meta
* questionnaire MS
  * ^short = "Formulardefinition"
  * ^comment = "Kanonischer Name der Formulardefinition, die hier ausgefüllt wurde. 
  Die entsprechende Formulardefinition muss in dieser Ausbaustufe vom Termin-Requestor nicht bereitgestellt, bzw. im Termin-Repository nicht bekannt/verfügbar sein.
  Formulardefinitionen sollten jedoch vom festlegenden System mit einem eindeutigen Namen versehen werden."
  * extension contains http://hl7.org/fhir/StructureDefinition/display named display 1..1
    * ^short = "Name des Formulars"
    * ^comment = "Menschenlesbarer Name/Titel des Formulars, entsprechend Questionnaire.title"
* status MS
* status = #completed
  * ^short = "Status der Fomularbearbeitung"  
  * ^comment = "Im Kontext der Terminplanung werden nur vollständig ausgefüllte Formulare übermittelt."
* subject 1..1 MS
  * ^short = "Patientenbezug"
  * ^comment = "Im ISIK-Kontext MUSS der referenzierte Patient konform zum ISIKPatient des Basismoduls sein. 
  Der Patientenkontext des Questionnaires ist identisch mit dem Patientenbezug des Appointments in dessen Kontext das Formular ausgefüllt wurde."
* authored 1..1 MS
  * ^short = "Formulardatum"
  * ^comment = "Datum, an dem das Formular ausgefüllt/vervollständigt wurde."
* item MS
  * ^short = "ausgefülltes Formularfeld"
  * ^comment = "Optionale Felder eines Formulars, in die keine Eingaben gemacht wurden, haben kein entsprechendes Item in der QuestionnaireResponse."
  * linkId MS
    * ^short = "Referenz zur Definition des Formularfeldes im Questionnaire"  
    * ^comment = "Wenn keine Formulardefinition verfügbar ist, so müssen dennoch alle Formularfelder über eine eindeutige ID referenziert werden."
  * text 1..1 MS
    * ^short = "Fragestellung/Text"
    * ^comment = "Fragestellung/Text gem. Fragebogendefinition. 
      Da in der ersten Ausbaustufe der Zugriff auf die Fragebodendefinition/Questionnaire nicht gewährleistet ist, 
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
    * valueCoding.display 1..1 MS
      * ^short = "Anzeigetext zum Code"
      * ^comment = "Da der ausgewählte Code auch ohne Kenntnis des verwendeten CodeSystems darstellbar sein muss, ist die Angabe des Display-Wertes verpflichtend"
    * item MS
      * ^short = "Der Antwort zugeordnetes Sub-Item"
      * ^comment = "Wenn ein übergeordnetes Item (Mehrfach-)Antworten zulässt, müssen Sub-Items der/den Antwort/en des übergeordneten Items zugeordnet werden. (Im Gegensatz zu item.item)"
  * item MS 
    * ^short = "Gruppierte Sub-Items"
    * ^comment = "Wenn ein übergeordnetes Item keine Antworten zulässt (nur der Gruppierung dient), müssen Sub-Items unmittelbar dem übergeordneten Item zugeordnet werden. (Im Gegensatz zu item.answer.item)"





Alias: $ops = http://fhir.de/CodeSystem/bfarm/ops
Instance: BeispielFragebogen
InstanceOf: ISiKFormulardaten
Usage: #example
* status = #completed
* authored = "2024-03-12T11:53:19.968Z"
* questionnaire = "http://gefyra.de/fhir/sdc/Questionnaire/Terminplanung"
  * extension[display].valueString = "Beispielfragebogen"
* subject.display = "Testy McTestface"
* item[+].linkId = "0"
* item[=].text = "Dies ist ein Beispiel für einen Fragebogen, wie er im Kontext der ISiK-Terminplanung eingesetzt werden könnte. 
Ziel ist es nicht, plausible und inhaltlich korrekte Fragestellungen zu formulieren, sondern die verschiedenen Formatierungsmöglichkeiten für Fragen 
und insbesondere deren Darstellung in der QuestionnaireResponse zu testen."
* item[+].answer.valueCoding.display = "gut"
* item[=].linkId = "1"
* item[=].text = "Wie geht es Ihnen?"
* item[+].answer.valueDate = "2024-03-13"
* item[=].linkId = "2"
* item[=].text = "Seit wann haben Sie Beschwerden?"
* item[+].answer.valueInteger = 3
* item[=].linkId = "3"
* item[=].text = "Wie viele Beschwerden haben Sie?"
* item[+].answer.valueInteger = 5
* item[=].linkId = "4"
* item[=].text = "Wie schlimm ist es auf einer Skala von 1-10?"
* item[+].linkId = "5"
* item[=].text = "Familienanamese"
* item[=].item[0].linkId = "5.2"
* item[=].item[=].text = "Eintrag Familienanamnese"
* item[=].item[=].item[0].answer.valueCoding.display = "Vater"
* item[=].item[=].item[=].linkId = "5.2.0"
* item[=].item[=].item[=].text = "Verwandschaftverhältnis"
* item[=].item[=].item[+].answer.valueBoolean = false
* item[=].item[=].item[=].linkId = "5.2.1"
* item[=].item[=].item[=].text = "Verstorben?"
* item[=].item[=].item[+].answer.valueBoolean = false
* item[=].item[=].item[=].linkId = "5.2.2"
* item[=].item[=].item[=].text = "Diabetiker?"
* item[=].item[+].linkId = "5.2"
* item[=].item[=].text = "Eintrag Familienanamnese"
* item[=].item[=].item[0].answer.valueCoding.display = "Mutter"
* item[=].item[=].item[=].linkId = "5.2.0"
* item[=].item[=].item[=].text = "Verwandschaftverhältnis"
* item[=].item[=].item[+].answer.valueBoolean = true
* item[=].item[=].item[=].linkId = "5.2.1"
* item[=].item[=].item[=].text = "Verstorben?"
* item[=].item[=].item[+].answer.valueBoolean = false
* item[=].item[=].item[=].linkId = "5.2.2"
* item[=].item[=].item[=].text = "Diabetiker?"
* item[=].item[=].item[+].answer.valueBoolean = true
* item[=].item[=].item[=].linkId = "5.2.3"
* item[=].item[=].item[=].text = "Herz-Kreislauf-Erkrankung?"
* item[=].item[=].item[+].answer.valueBoolean = true
* item[=].item[=].item[=].linkId = "5.2.4"
* item[=].item[=].item[=].text = "Krebs-Erkrankung?"
* item[=].item[+].linkId = "5.2"
* item[=].item[=].text = "Eintrag Familienanamnese"
* item[=].item[=].item[0].answer.valueCoding.display = "Bruder"
* item[=].item[=].item[=].linkId = "5.2.0"
* item[=].item[=].item[=].text = "Verwandschaftverhältnis"
* item[=].item[=].item[+].answer.valueBoolean = false
* item[=].item[=].item[=].linkId = "5.2.1"
* item[=].item[=].item[=].text = "Verstorben?"
* item[=].item[=].item[+].answer.valueBoolean = false
* item[=].item[=].item[=].linkId = "5.2.2"
* item[=].item[=].item[=].text = "Diabetiker?"
* item[=].item[=].item[+].answer.valueBoolean = false
* item[=].item[=].item[=].linkId = "5.2.3"
* item[=].item[=].item[=].text = "Herz-Kreislauf-Erkrankung?"
* item[=].item[=].item[+].answer.valueBoolean = false
* item[=].item[=].item[=].linkId = "5.2.4"
* item[=].item[=].item[=].text = "Krebs-Erkrankung?"
* item[+].linkId = "6"
* item[=].text = "Besondere Bedürfnisse"
* item[=].item[0].answer.valueBoolean = false
* item[=].item[=].linkId = "6.1"
* item[=].item[=].text = "Mobilitätseinschränkung"
* item[=].item[+].answer.valueBoolean = true
* item[=].item[=].answer.item.answer.valueCoding.display = "Good Boy"
* item[=].item[=].answer.item.linkId = "6.2.1"
* item[=].item[=].answer.item.text = "Begleithund"
* item[=].item[=].linkId = "6.2"
* item[=].item[=].text = "Sehbehinderung"
* item[+].answer.valueCoding = $ops#9-984.7 "Pflegebedürftig nach Pflegegrad 2"
* item[=].linkId = "7"
* item[=].text = "Pflegegrad"
* item[+].answer.valueString = "Nettes Formular!"
* item[=].linkId = "8"
* item[=].text = "Anmerkungen"

Instance: TestFragebogen
InstanceOf: ISiKFormulardaten
Usage: #example
* status = #completed
* authored = "2024-03-12T11:53:19.968Z"
* questionnaire = "https://gematik.de/fhir/isik/Terminplanung/Questionnaire/TestFragebogen"
  * extension[display].valueString = "Testfragebogen"
* subject.display = "Testy McTestface"
* item[+] insert qritem("1", "Dies ist ein Display-Item. Es gibt keine Antwort. Der Text kann mehrzeilig sein\r und Umbrüche enthalten. Display-Items haben keine Sub-Items!")
* item[+] insert qritem("2", "Item mit Boolean")
  * answer.valueBoolean = true
* item[+] insert qritem("3", "Item mit Integer: wiederholbar")
  * answer.valueInteger = 1
  * answer.valueInteger = 123456
  * answer.valueInteger = -3723
  * answer.valueInteger = 2147483647
  * answer.valueInteger = 0
* item[+] insert qritem("4", "Item mit Decimal")
  * answer.valueDecimal = 12.3456
* item[+] insert qritem("5", "Item mit Date: wiederholbar")
  * answer.valueDate = "2024-03-12"
  * answer.valueDate = "1970-01"
  * answer.valueDate = "1984"
* item[+] insert qritem("6", "Item mit DateTime")
  * answer.valueDateTime = 2024-03-12T11:53:19+01:00
* item[+] insert qritem("7", "Item mit Coding")
  * answer.valueCoding = $ops#9-984.7 "Pflegebedürftig nach Pflegegrad 2"
* item[+] insert qritem("8", "Item mit kurzem String")
  * answer.valueString = "kurzer String"
* item[+] insert qritem("9", "Item mit langem String")
  * answer.valueString = "langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String langer String ENDE!!!"
* item[+] insert qritem("10", "Gruppe mit Sub-Items")
  * item[+] insert qritem("10.1", "Sub-Item 1")
    * answer.valueBoolean = true
  * item[+] insert qritem("10.2", "Sub-Item 2")
    * answer.valueBoolean = true
  * item[+] insert qritem("10.3", "Sub-Item 3")
    * answer.valueBoolean = false
* item[+] insert qritem("11", "Gruppe mit Sub-Items: wiederholbar")
  * item[+] insert qritem("11.1", "Sub-Item 1")
    * answer.valueInteger = 1
  * item[+] insert qritem("11.2", "Sub-Item 2")
    * answer.valueBoolean = true
* item[+] insert qritem("11", "Gruppe mit Sub-Items: wiederholbar")
  * item[+] insert qritem("11.1", "Sub-Item 1")
    * answer.valueInteger = 2
  * item[+] insert qritem("11.2", "Sub-Item 2")
    * answer.valueBoolean = false
* item[+] insert qritem("12", "Item mit Sub-Items: wiederholbar")
  * answer.valueInteger = 1
  * answer.item[+] insert qritem("12.1", "Sub-Item 1")
    * answer.valueBoolean = true
* item[+] insert qritem("12", "Item mit Sub-Items: wiederholbar")
  * answer.valueInteger = 2
  * answer.item[+] insert qritem("12.1", "Sub-Item 1")
    * answer.valueBoolean = false

RuleSet: qritem (id, text)
* linkId = {id}
* text = {text}
