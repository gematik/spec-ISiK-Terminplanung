Instance: Book
InstanceOf: OperationDefinition
Usage: #example
* insert Meta-Inst
* id = "ISiKAppointmentBookOperation"
* name = "ISiKAppointmentBookOperation"
* url = "https://gematik.de/fhir/isik/v3/Terminplanung/OperationDefinition/AppointmentBook"
* kind = #operation
* name = "book"
* code = #book
* resource = #Appointment
* system = false
* type = true
* instance = false
* affectsState = true
* description = "OperationDefinition für die Buchung eines Termins. Die Operation überprüft ob der Termin noch verfügbar ist im Termin-Repository."
* parameter[+]
  * name = #appt-resource
  * use = #in
  * min = 1
  * max = "1"
  * documentation	= "Eine Appointment-Ressource entsprechend dem dazugehörigen ISiK-Profil MUSS übergeben werden. Falls das Parameter-Element 'Appointment' als einziges Parameter-Element verwendet wird, KANN die Appointment-Ressource direkt im HTTP Body übergeben werden, alternativ zu einer Parameter-Ressource inklusive dem eingebetteten Appointment-Element. Invalide Ressourcen MÜSSEN abgelehnt werden durch das Termin Repository (zur Form der Ablehnung s.u.). Das Appointment MUSS den Status 'proposed' enthalten."
  * type = #Appointment
* parameter[+]
  * name = #cancelled-appt-id
  * use = #in
  * min = 0
  * max = "1"
  * documentation	= "Für die vorliegende Spezifikation ist die Verschiebung eines Termin eins zwei-stufiger Prozess, bei dem ein Termin storniert und ein neuer Termin neu gebucht wird. Dieser Parameter repräsentiert die Ressourcen-Id des stornierten Appointments. Der uri-Parameter kann eine absoulte URL enthalten, Server SOLLTEN jedoch nur Termine für ihre eigene Domäne verwalten. Im neu-angelegten Appointment MUSS eine Reference auf den abgesagten Termin hinterlegt werden (vgl. Appointment.extension:replaces). Der Status der abgesagten Ressource MUSS durch den Server angepasst werden."
  * type = #uri
* parameter[+]
  * name = #schedule
  * use = #in
  * min = 0
  * max = "1"
  * type = #Reference
  * documentation	= "Im Falle dass ein Appointment keine Referenz auf ein oder mehrere Slots enthält, MUSS der Server die benötigten Slots auf Basis der Referenz auf Schedule, sowie dem Start- und Endzeitpunkt im Appointment ermitteln."
  * targetProfile = Canonical(ISiKKalender)
* parameter[+]
  * name = #return
  * use = #out
  * min = 0
  * max = "1"
  * documentation	= "Falls die Interaktion erfolgreich ist, ist der Status Code HTTP 201 - Created zurückzugeben. Im Erfolgsfall MUSS als Return-Parameter eine Appointment-Ressource (entsprechend dem dazugehörigen ISiK-Profil) zurückgegeben werden. Das id-Element der Appointment-Ressource MUSS korrekt gefüllt werden. Der Status der Appointment-Ressource MUSS auf 'booked' oder 'pending' geändert wurden sein durch den Server. Der Server MUSS die verwendeten Slot-Ressourcen als Referenz im Appointment angeben. Die Appointment-Ressource kann direkt im HTTP Body zurückgegeben werden, falls es sich um den einzigen Rückgabewert handelt. Alternativ kann die Appointment-Ressource innerhalb einer Parameter-Ressource zurückgegeben werden. Als Teil der Parameter-Ressource können zusätzlich Hinweise zum Termin als OperationOutcome zurückgegeben werden."
  * type = #Appointment
* parameter[+]
  * name = #return
  * use = #out
  * min = 0
  * max = "1"
  * documentation	= "Falls die Interaktion fehlschlägt, MUSS als Return-Parameter eine OperationOutcome-Ressource zurückgegeben werden. Syntaktische Fehler in der Appointment-Ressource MUSS mit einem HTTP Status-Code 400 - Bad Request zurückgewiesen werden. Anderweitig invalide Appointment-Ressourcen MÜSSEN mit einer OperationOutcome-Ressource abgewiesen werden. In diesem Fall SOLLTE der HTTP Status-Code HTTP 422 - Unprocessable Entity verwendet werden. Eine OperationOutcome-Ressource KANN zu informativen Zwecken in jedem Fall zurückgegeben werden (s.o.)."
  * type = #OperationOutcome
