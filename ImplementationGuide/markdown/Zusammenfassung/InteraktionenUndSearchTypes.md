# Akteure und Interaktionen

Innerhalb des ISiK-Moduls Terminplanung kann ein beteiligtes System verschiedene Rollen einnehmen und somit unterschiedliche Aufgaben übernehmen. In Anlehnung an IHE HMW werden im Folgenden diese Rollen mithilfe der Definition von Akteuren formalisiert und die Interaktionen zugeordnet.

Hierbei wird wiederum unterschieden zwischen den folgenden drei Bereichen:

* **Medication Summary (Medikationsinformationen, "Medikationspläne"):** Bildet den Medikationsstatus eines Patienten ab, z.B. Informationen über Dauermedikation oder Selbstmedikation. In diesem Kontext wird häufig noch eine Liste verwendet, in der die einzelnen Medikationsinformationen strukturiert sind.
* **Medication Order (Medikations-Verordnungen):** Informationen über die Verordnung von Medikamenten im Rahmen des medizinischen Workflows.
* **Administered Medication (Medikations-Verabreichungen):** Informationen über die (erfolgte) Verabreichung bzw. Einnahme von Medikamenten im Rahmen des medizinischen Workflows.

Es ist zu beachten, dass in vielen Fällen ein Terminmangementsystem aus unterschiedlichen Modulen besteht, die mehreren oder allen der genannten Akteure entsprechen:
* Ein **Termin Repository**, da das System das terminführende System ist
* Ein **Termin Requestor**, um intern im System einen Termin zu vereinbaren
* Ein **Termin Consumer** um eine Übersicht der vereinbarten Termine anzuzeigen

Die Interaktionen sind in allen drei Bereichen äquivalent:

<img src="https://raw.githubusercontent.com/gematik/spec-ISiK-Terminplanung/rc/main-stufe-4/Material/images/diagrams/Interaktionen.svg" class="center" alt="Interkationen" width="90%"/>

# Searchtypes

Damit diese Akteure sinnvoll miteinander kommunizieren können wurden folgenden Suchparameter festgelegt:

<img src="https://raw.githubusercontent.com/gematik/spec-ISiK-Terminplanung/rc/main-stufe-4/Material/images/diagrams/searchtypes_interaction.svg" class="center" alt="Searchtypes" width="90%"/>