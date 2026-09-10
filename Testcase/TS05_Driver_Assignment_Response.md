# TS05 - Driver Assignment Response

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-RES-001 |  | [Positive] Driver accepts valid assignment | Assignment is active | Submit response | `ACCEPTED` | Trip is assigned to driver | Critical |
| TC-RES-002 |  | [Positive] Driver rejects valid assignment | Assignment is active | Submit response | `REJECTED` | Assignment is rejected and next driver can be searched | Critical |
| TC-RES-003 |  | [Negative] Missing response status | Assignment is active | Submit empty/invalid request | Missing response_status | Validation error is returned | High |
| TC-RES-004 |  | [Negative] Invalid response status | Assignment is active | Submit response | `PENDING` or other unsupported value | Validation error is returned | High |
| TC-RES-005 |  | [Negative] Respond exactly before timeout | Assignment active | Respond at 14.9 seconds | ACCEPTED | Response is accepted if within configured waiting period | Critical |
| TC-RES-006 |  | [Negative] Respond after timeout | Assignment expired | Submit response after timeout | ACCEPTED | Response is rejected because assignment has expired | Critical |
| TC-RES-007 |  | [Negative] Late acceptance after another driver is assigned | Trip already assigned | Submit acceptance | Late ACCEPTED | Late response does not change assigned driver | Critical |
