# Release Notes

Im Rahmen der ISiK-Veröffentlichungen wird das [Semantic Versioning](https://semver.org/lang/de/) verwendet.

Die erste Ziffer X bezeichnet ein Major-Release und regelt die Gültigkeit von Releases. Die dritte Ziffer Y (Release x.0.y) bezeichnet eine technische Korrektur und versioniert kleinere Änderungen (Packages) während eines Jahres, z. B. 1.0.1.

Version: 2.0.3

Datum: 04.04.2023

* ISiKTerminKontaktMitGesundheitseinrichtung: Entfernen des Profils da kein integraler Use Case für Terminvereinbarung und Inkompatiblität zum ISiK Basisprofil
---

Version: 3.0.0-rc

Datum: 30.03.2023

* ISiKNachricht: Hinweis zum Thema Sicherheit eingefügt. Ohne weitere Maßnahmen können über ISiKNachricht keine medizinischen Daten ausgetauscht werden. Hierfür sollte daher bevorzugt die ePA verwendet werden.
* ISiKTermin: 
  * Kardinalität der Elemente Appointment.specialty und Appointment.serviceType von 1..* auf 0..* geändert. MustSupport dieser Elemente von "true" auf "false" geändert. 
    * FHIR erlaubt die Anlage von Appointments ohne Bindung an einen Slot und außerhalb des Worksflows über einen Kalender. Dies kann zB auch dann erforderlich sein, wenn ein Termin außerhalb der definierten Slots per Telefon vereinbart und dann in das System eingespeist wird. In diesem Fall findet keine "Vererbung" von serviceType und specialty aus einem Kalender statt. Die Person, die den Termin in das System einträgt sollte hier selbst entscheiden können, welche Attribute sie explizit angibt und welche sich implizit aus dem Kontext erschließen. 
    * ISiK Terminblöcke referenzieren auf Kalender, die auch andere als ISIK Kalender sein können. Damit ist nicht sichergestellt, dass eine durchgängige, automatische "Vererbung" von specialty und serviceType über Schedule und Slot in ein Appointment möglich ist (in FHIR Schedule und ISiK Terminblock ist die Kardinalität jeweils "0..*", dh diese Angaben können auch gänzlich fehlen).
  * Kongruenz der Angaben in Appointment.start/end und Appointment.slot.start/end von MUSS auf SOLL herabgestuft.
    * s.o. Bei off-band-Buchungen wird eine gewisse Flexibilität im Umgang mit dem Kalender benötigt. 
  * Hinweise zu den erwarteten Ergebnissen bei Suchanfragen auf "sepciality" und "serviceType" in Fällen, bei denen diese Elemente keinen Wert haben.
* ISiKBookOperation:
  * Für die Abbildung eines manuellen Buchungsprozesses wurden die Vorgaben zu den Return Values beim Appointment.status um "pending" erweitert. 


Version: 2.0.3

Datum: 24.03.2023

* enhancement: backport extension r5 by @f-peverali in https://github.com/gematik/spec-ISiK-Terminplanung/pull/61
  * ISiKKalender - Harmonisierung mit den Empfehlungen der Basisprofile DE
* quickfix: typo IG by @f-peverali in https://github.com/gematik/spec-ISiK-Terminplanung/pull/63


**Full Changelog**: https://github.com/gematik/spec-ISiK-Terminplanung/compare/v2.0.2...v.2.0.3

----
Version: 2.0.2

Datum: 31.01.2023

- ISiKTerminblock
  - Reference(Schedule) statt Reference(ISiKKalender). Reference-Element erweitert auf die Kernspezifikation (entspricht allgemeinem Design-Prinzip), damit die Profile auch außerhalb des ISiK-Kontextes nutzbar sind.
- Update Basismodul Dependency -> 2.0.4
- weitere Änderungen an IG (informativ)

----
Version: 2.0.2

Datum: 31.01.2023

- ISiKTerminblock
  - Reference(Schedule) statt Reference(ISiKKalender). Reference-Element erweitert auf die Kernspezifikation (entspricht allgemeinem Design-Prinzip), damit die Profile auch außerhalb des ISiK-Kontextes nutzbar sind.
- Update Basismodul Dependency -> 2.0.4
- weitere Änderungen an IG (informativ)

----
Version: 2.0.1

Datum: 31.10.2022

- Update Basismodul Dependency -> 2.0.2

----
Version: 2.0.0

Datum: 30.06.2022

- Initialer Release

----
Version: 2.0.0 (Ballotierung)

Datum: 31.03.2022
 - Initiale Ballotierungsversion für ISiK Stufe 2

----
