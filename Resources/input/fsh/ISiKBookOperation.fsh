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
  * documentation	= "Eine Appointment-Ressource entsprechend dem dazugehörigen ISiK-Profil MUSS (als Parameter-Element) übergeben werden. Invalide Ressourcen MÜSSEN abgelehnt werden durch das Termin Repository (zur Form der Ablehnung s.u.). Das Appointment MUSS den Status 'proposed' enthalten. Falls ein Parameter-Element Appointment als einziges Parameter-Element verwendet würde, KANN stattdessen die Appointment-Ressource direkt im HTTP Body anstelle einer Parameter-Ressource übergeben werden. Die referenzierte Ressource MUSS dem ISiKTermin-Profil entsprechen."
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
  * documentation	= "Falls die Interaktion erfolgreich ist, ist der Status Code HTTP 201 - Created zurückzugeben. Zudem MUSS Als Return-Parameter entweder eine Appointment-Ressource (entsprechend dem dazugehörigen ISiK-Profil) oder eine Parameters-Ressource mit mindestens einem .parameter-Element Appointment (entsprechend dem ISiK-Profil) und einem .parameter-Element OperationOutcome zurückgegeben werden und die Appointment-Ressource MUSS verarbeitet werden (eine Parameters-Ressource mit einem einzigen .parameter-Element 'Appointment' sollte nicht zurückgegeben werden). Das id-Element der Ressource Appointment MUSS korrekt gefüllt werden. Der Status der Appointment-Ressource MUSS auf 'booked' oder 'pending' geändert werden. Der Server MUSS die verwendeten Slot-Ressourcen als Referenz im Appointment angeben."
  * type = #Appointment
* parameter[+]
  * name = #return
  * use = #out
  * min = 0
  * max = "1"
  * documentation	= "Falls die Interaktion fehlschlägt, MUSS als Return-Parameter ein OperationOutcome zurückgegeben werden. Invalide Appointment-Ressourcen MÜSSEN mit einer OperationOutcome abgewiesen werden und die Antwort SOLLTE mit folgendem Status Code erfolgen: HTTP 422 - Unprocessable Entity. Die Antwort auf eine falsche Anfrage SOLLTE mit folgendem Status Code erfolgen: HTTP 400 - Bad Request. Das id-Element der Ressource MUSS korrekt gefüllt werden. Ein OperationOutcome KANN zu informativen Zwecken in jedem Fall zurückgegeben werden (s.o.)."
  * type = #OperationOutcome
