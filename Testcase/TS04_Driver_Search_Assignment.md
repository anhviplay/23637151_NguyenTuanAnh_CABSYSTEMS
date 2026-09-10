# TS04 - Driver Search & Assignment

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-ASS-001 |  | [Positive] Assign an eligible available driver | Trip exists | Start driver matching | ACTIVE + AVAILABLE suitable driver | Driver receives trip request | Critical |
| TC-ASS-002 |  | [Negative] Exclude unavailable driver | Trip exists | Start driver matching | Driver UNAVAILABLE | Driver is skipped | Critical |
| TC-ASS-003 |  | [Positive] Prefer suitable nearby driver | Multiple drivers exist | Start matching | Multiple suitable drivers at different locations | Driver selected according to configured matching priority | High |
| TC-ASS-004 |  | [Positive] Driver rejects trip | Driver received assignment | Reject assignment | `REJECTED` | System records rejection and searches next suitable driver | Critical |
| TC-ASS-005 |  | [Positive] Driver does not respond within 15 seconds | Driver received assignment | Wait beyond configured timeout | No response for 15 seconds | Assignment expires/is recorded as no response and next driver is contacted | Critical |
| TC-ASS-006 |  | [Positive] No suitable driver is available | No eligible drivers | Start matching | No available suitable driver | Trip ends with no-driver-found outcome and customer is notified | Critical |
| TC-ASS-007 |  | [Positive] First valid acceptance wins | Two drivers receive/return acceptance around same time | Submit two acceptance responses | Driver A accepted first, Driver B later | Driver A remains assigned; Driver B cannot replace A | Critical |
| TC-ASS-008 |  | [Positive] Only one assignment is selected | Trip has multiple assignments | Inspect assignment records | Multiple assignment records | Only the first valid accepted assignment is marked selected | Critical |
| TC-ASS-009 |  | [Positive] Customer does not recreate trip after driver rejection | Trip exists | Driver rejects | Valid trip | Same trip continues searching for another driver | High |
| TC-ASS-010 |  | [Positive] Cancel trip while driver search is active | Trip is searching | Customer cancels | Valid trip ID | Search stops and trip becomes CANCELLED | Critical |
