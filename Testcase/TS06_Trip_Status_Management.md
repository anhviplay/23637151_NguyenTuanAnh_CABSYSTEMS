# TS06 - Trip Status Management

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-STS-001 |  | [Positive] DRIVER_ASSIGNED to DRIVER_ARRIVED | Trip assigned | Update status to DRIVER_ARRIVED | Status becomes DRIVER_ARRIVED | Not Run | Critical |
| TC-STS-002 |  | [Positive] DRIVER_ARRIVED to PASSENGER_PICKED_UP | Driver arrived | Update status | PASSENGER_PICKED_UP | Status becomes PASSENGER_PICKED_UP | Critical |
| TC-STS-003 |  | [Positive] PASSENGER_PICKED_UP to IN_PROGRESS | Passenger picked up | Update status | IN_PROGRESS | Status becomes IN_PROGRESS | Critical |
| TC-STS-004 |  | [Positive] IN_PROGRESS to COMPLETED | Trip in progress | Update status | COMPLETED | Trip becomes COMPLETED | Critical |
| TC-STS-005 |  | [Negative] Skip DRIVER_ARRIVED | Trip assigned | Update status | IN_PROGRESS | Transition is rejected | Critical |
| TC-STS-006 |  | [Negative] Skip PASSENGER_PICKED_UP | Driver arrived | Update status | COMPLETED | Transition is rejected | Critical |
| TC-STS-007 |  | [Positive] Move from COMPLETED back to IN_PROGRESS | Trip completed | Update status | IN_PROGRESS | Transition is rejected and event is recorded | Critical |
| TC-STS-008 |  | [Positive] Move from IN_PROGRESS back to DRIVER_ARRIVED | Trip in progress | Update status | DRIVER_ARRIVED | Transition is rejected | Critical |
| TC-STS-009 |  | [Negative] Unauthorized user updates trip status | User not authorized | Send status update | Valid status | Request is rejected | High |
| TC-STS-010 |  | [Positive] Verify customer sees current trip status | Trip exists | Request trip status | Valid trip ID | Current persisted status is returned | High |
