# Motivation

Die Vereinbarung von Terminen für Behandlungsleistungen repräsentiert oftmals für Patient:innen oder für sie zuständige Leistungserbringer:innen den Einstieg in den Versorgungsablauf im Krankenhaus. Die Terminplanung argiert somit als kritische Schnittstelle zwischen diversen Akteueren im Gesundheitswesen inkl. der zu behandelnden Personen. Informationen zu notwendigen und/oder gewünschten Behandlungen, Verfügbarkeiten der involvierten Personen, als auch abrechnungsreleveante Details zur Krankenversicherung müssen potentiell ausgetauscht werden um eine optimierten Ablauf des Aufenthaltes im Krankenhaus zu ermöglichen.

Das Krankenhauszukunftsgesetz (KHZG) hebt die zentrale Rolle der Terminvereinbarung hervor in dem in den dazugehörigen Fördertatbeständen Vorgaben für die Terminplanung im digitalen Aufnahmemanagement bzw. für die Terminplanung mittels Patientenportalen gemacht werden (vgl. §19 Abs. 1 Satz 1 Nr. 2 KHSFV bzw. §21 Abs. 2 KHSFV).

Angelehnt an diese Vorgaben soll mittels ISiK die Grundlage geschaffen werden, um die beschriebenen oder ähnliche Use Cases durchzuführen und die zu fachlich-inhaltlichen Informationen in einer interoperablen Art und Weise auszutauschen. ISiK versteht sich somit als Schnittstellenbeschreibung, um eine einheitliche API zu dokumentieren, durch die ein Termin vereinbart und verwaltet werden kann. Das vorliegende ISiK Modul bietet somit explizit KEIN umfassendes Datenmodell für die krankenhausinterne Ressourcenplannung. Hingegen werden durch ISiK Minimalvorgaben für bestätigungsrelevante Systeme spezifiziert, auf die komplexere Workflows ausgestaltet werden können.

Durch ISiK Terminplanung sollen folgende Möglichkeiten eröffnet werden:

* Abruf von Abbildung von verfügbaren teil- und voll- stationäre Behandlungsleistungen durch ein Krankenhaus
* Abfrage von verfügbaren Terminen
* Buchungsmanagement von verfügbaren Terminen
* Benachrichtigungen bei Terminänderungen
* Anlage eines neues Patienten im terminführenden System (Übermittelung Patient/Versicherungsinformationen)