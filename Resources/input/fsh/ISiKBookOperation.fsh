Instance: Book
InstanceOf: OperationDefinition
Usage: #example
* insert Meta-Inst
* id = "ISiKAppointmentBookOperation"
* url = "https://gematik.de/fhir/ISiK/v2/OperationDefinition/AppointmentBook"
* name = "ISiKAppointmentBookOperation"
* kind = #operation
* name = "book"
* code = #book
* resource = #Appointment
* system = false
* type = true
* instance = false
* affectsState = true
* parameter[+]
  * name = #appt-resource
  * use = #in
  * min = 1
  * max = "1"
  * type = #Appointment
  * targetProfile = Canonical(ISiKTermin)
* parameter[+]
  * name = #cancelled-appt-id
  * use = #in
  * min = 0
  * max = "1"
  * type = #uri
* parameter[+]
  * name = #return
  * use = #out
  * min = 0
  * max = "1"
  * type = #Bundle