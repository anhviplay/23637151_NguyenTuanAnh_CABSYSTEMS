# TS09 - Notification

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-NOT-001 |  | [Positive] Notify customer when booking is accepted | Valid booking | Trigger notification | Booking event | Customer notification is generated | High |
| TC-NOT-002 |  | [Positive] Notify customer when driver is assigned | Driver assigned | Trigger notification | Driver assigned event | Customer receives assignment notification | High |
| TC-NOT-003 |  | [Positive] Notify customer when driver arrives | Driver arrived | Trigger notification | DRIVER_ARRIVED | Arrival notification is generated | High |
| TC-NOT-004 |  | [Positive] Notify customer when trip completes | Trip completed | Trigger notification | COMPLETED | Completion notification is generated | High |
| TC-NOT-005 |  | [Positive] Notify customer of payment result | Payment processed | Trigger notification | SUCCESS/FAILED | Payment result notification is generated | High |
| TC-NOT-006 |  | [Positive] Notify driver about new trip | Matching sends assignment | Trigger notification | New trip | Driver receives trip notification | High |
| TC-NOT-007 |  | [Positive] Notification provider fails during booking | Booking active | Simulate provider failure | Provider 5xx/FAILED | Booking flow continues and notification failure is recorded | Critical |
| TC-NOT-008 |  | [Positive] Notification status SENT is recorded | Provider succeeds | Send notification | Valid notification | Notification status is SENT | High |
| TC-NOT-009 |  | [Negative] Notification status FAILED is recorded | Provider fails | Send notification | Provider failure | Notification status is FAILED | Medium |
