Profile: ISiKTerminKontaktMitGesundheitseinrichtung
Parent: ISiKKontaktGesundheitseinrichtung
Id: ISiKTerminKontaktMitGesundheitseinrichtung
Description: "Das Datenobjekt ISiKKontaktMitGesundheitseinrichtung dient der Verknüpfung des ISiK-Basis-Encounters (ISiKKontaktMitGesundheitseinrichtung) mit einem Termin (Appointment) und - darauf aufbauend - der Dokumentenkommunikation.

Die Anforderung dieser Verknüpfung stammt aus dem Szenario der Dokument-Übertragung zwischen Patientenportal und krankenhaus-internem Primärsystem (KIS): Dokumente liegen bei Termin-Buchung erst im Patientenportal (im Appointment) vor und werden erst mit Anlage des Encounters in das KIS (etc.) übermittelt. Dazu muss das Appointment mit dem neu angelegten Encounter verknüpft werden, um die Dokumente aus dem Patientenportal darüber zuzuordnen.

Hieraus folgt, dass das Datenobjekt nur relevant ist, falls das bestätigungsrelevante System das Datenobjekt ISiKKontaktMitGesundheitseinrichtung sowie ISiKTermin implementiert. Zu Beginn des Termins sollte das System die Verknüpfung zwischen Encounter und Appointment herstellen. Ausgenommen hiervon sind Termine, die nicht stattfinden, da für diese in der Regel keine Encounter angelegt werden.
"
* insert Meta
* appointment MS
* appointment  ^comment = "**Hinweis:**  Zur Umsetzung der Funktionalität zum Dokumentenaustausch gemäß ISiK ist der entsprechende [Implementation Guide zum Modul Dokumentenaustausch](https://simplifier.net/guide/isik-dokumentenaustausch-v4?version=current) zu beachten.
  
  Begründung Must Support: Die Referenz auf Appointment ermöglicht Portalen den Fallbezug aus dem Termin zu ermitteln und Dokumente an ein KIS zu senden. Das Element 'appointment' ist Must-Support, um sicherzustellen, dass ein Termin immer abrufbar ist, sofern er mit einem Fallkontaktverknüft ist."