Folgende Tabelle zeigt Abhängigkeiten zwischen den verschiedenen Modulen von ISiK und ISiP auf.

| **Modul**                  | **Releasedatum des Moduls**   | **Version** | **Releasedatum Version** |**Gültig bis\*** | **Verpflichtend ab** | **Abkündigungsdatum** | **Abhängigkeiten** |
|---------------------------|-----------------|-------------|------------------|-----------------------|---------|-------|--------------------|
| [ISiK - Basis (Release Candidate für Stufe 3)](https://simplifier.net/isik-v3)    | 1.7.2023 (noch nicht festgelegt)|     3.0.0-rc2      |    03.04.2023        |  30.06.2026 | 01.07.2025 |      -    |     |
| [ISiK - Basis (Stufe 2)](https://simplifier.net/isik)    | 1.7.2022|     2.0.5        |    24.03.2023        |  30.06.2025 | 01.07.2024 |      -    |     |
| [ISiK - Basis (Stufe 1)](https://simplifier.net/isik-basis-1) |  1.7.2021  |       1.0.9      |     22.03.2023              |   30.06.2024 |  30.08.2023 | -     |        |
|[ISiK - Dokumentenaustausch (Release Candidate für Stufe 3)](https://simplifier.net/spec-isik-dokumentenaustausch)  | 1.7.2023 (noch nicht festgelegt)  |     3.0.0-rc3       |      4.4.2023      |   noch nicht festgelegt |    noch nicht festgelegt|    -    |   [ISiK - Basis (Release Candidate für Stufe 3)](https://simplifier.net/isik-v3)  |
|[ISiK - Dokumentenaustausch (Stufe 2)](https://gematik.github.io/spec-ISiK-Dokumentenaustausch/IG/2.0.1/ImplementationGuide-markdown-Einfuehrung.html)   | 1.7.2022   |     2.0.1       |      31.10.2022      |   abgekündigt  |abgekündigt | 1.2.2023   |
| [ISiK - Medikation (Release Candidate für Stufe 3)](https://simplifier.net/guide/implementierungsleitfaden-isik-modul-medikation?version=current)  | 1.7.2023 (noch nicht festgelegt)   | 3.0.0-rc |          11.04.2023        |   noch nicht festgelegt |    noch nicht festgelegt |  -    |     [ISiK - Basis (Release Candidate für Stufe 3)](https://simplifier.net/isik-v3)    |
| [ISiK - Medikation (Stufe 2)](https://simplifier.net/spec-isik-medikation)  | 1.7.2022   | 2.0.2 |          31.1.2023      |  30.06.2025 |  01.07.2024  |   -    |    [ISiK - Basis (Stufe 2)](https://simplifier.net/isik)   |
[ISiK - Sicherheit ](https://simplifier.net/spec-isik-sicherheit) (Release Candidate für Stufe 3)   | 1.7.2023 (noch nicht festgelegt)  |    3.0.0-rc1       |     30.06.2022       |    noch nicht festgelegt |    noch nicht festgelegt |  -    |    |
| [ISiK - Terminplanung (Release Candidate für Stufe 3)](https://simplifier.net/spec-isik-terminplanung) | 1.7.2023 (noch nicht festgelegt)   |     3.0.0-rc1       |    04.04.2023        |   noch nicht festgelegt |     noch nicht festgelegt  |   -    |  [ISiK - Basis (Stufe 3)](https://simplifier.net/isik-v3)    |
| [ISiK - Terminplanung (Stufe 2)](https://simplifier.net/spec-isik-terminplanung) | 1.7.2022    |     2.0.3        |    24.03.2023        |  30.06.2025 |    01.07.2024  |   -    |  [ISiK - Basis (Stufe 2)](https://simplifier.net/isik)    |
| [ISiK - Vitalparameter und Körpermaße (Release Candidate für Stufe 3)](https://simplifier.net/guide/implementierungsleitfaden-isik-modul-vitalwerte-und-k-rperma-e?version=current) | 1.7.2023 (noch nicht festgelegt)   |        3.0.0-rc1     |    11.04.2023    |   noch nicht festgelegt |    noch nicht festgelegt | -      |  [ISiK - Basis (Release Candidate für Stufe 3)](https://simplifier.net/isik-v3)  |
| [ISiK - Vitalparameter und Körpermaße (Stufe 2)](https://simplifier.net/spec-isik-vitalparameter-und-koerpermasse) | 1.7.2022   |        2.0.3     |    24.03.2023    |   30.06.2025 | 01.07.2024  | -      | [ISiK - Basis (Stufe 2)](https://simplifier.net/isik)  |
| [ISiP](https://simplifier.net/isip)   | 1.7.2022   |       1.0.2      |       31.1.2023           | 30.06.2025 |   01.07.2024  |  -   |   [ISiK - Basis (Stufe 2)](https://simplifier.net/isik)     |


\* Die Gültigkeit ist eine ungefähre, prognostische Angabe, die mit dem jetzigen Stand der Projektierung zusammenhängt. Die ISiK-Module werden bis zur formalen Abkündigung Gültigkeit besitzen.

Folgendes Schema für das ISiK Release-Management dient dem Verständnis der Fristen; entscheidend für die (prognostizierte) Abkündigung ("Gültig bis") ist nicht der Release-Zeitpunkt, sondern das rechtlich bindende Umsetzungsdatum ("Verpflichtend ab" / "Verpflichtender Einsatz"):
![Schema für das ISiK Releasemanagement](ISiK_Releasemanagement.png)

Weitere Abhängigkeiten zu externen Packages sind unter den jeweiligen Simplifier-Projekten in der View "Dependencies" zu finden.
