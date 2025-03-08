---
topic: FQL-CodeSystem
---

<fql>
from
	CodeSystem
where
	url = %canonical
for concept
select
	Code: code, Anzeigetext: display, Definition: definition
</fql>