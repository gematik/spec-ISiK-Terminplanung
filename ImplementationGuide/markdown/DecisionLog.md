Datum 2.7.2024
* Problem: In Stufe wurde eine Änderung der IHE VAlueSets als breaking Change durchgeführt. Diese muss propagiert werden für ältere Stufen 2 und 3, ohne ein breaking Change zu verursachen.
    * Hintergrund: siehe Releasenotes von 4.0.0-rc2 (bzw. https://github.com/gematik/spec-ISiK-Terminplanung/pull/184/files)
* Lösung: Für Stufe 2 und 3 werden die Kardinalitäten so gewählt (0..1), dass kein Breaking Change verursacht wird.