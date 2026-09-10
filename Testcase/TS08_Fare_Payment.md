# TS08 - Fare & Payment

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-PAY-001 |  | [Positive] Calculate fare after completed trip | Trip COMPLETED | Trigger fare/payment flow | Completed trip | Fare is determined according to approved MBB rule | Critical |
| TC-PAY-002 |  | [Negative] Attempt fare determination before completion | Trip not completed | Trigger fare flow | IN_PROGRESS | Fare is not finalized | Critical |
| TC-PAY-003 |  | [Positive] Cash payment for completed trip | Trip COMPLETED | Select payment method | CASH | Payment is recorded as successful when cash payment is accepted | Critical |
| TC-PAY-004 |  | [Positive] Electronic payment success | Trip COMPLETED | Pay electronically | ELECTRONIC | Payment result is recorded as SUCCESS | Critical |
| TC-PAY-005 |  | [Negative] Electronic payment failure | Trip COMPLETED | Simulate provider failure | ELECTRONIC / FAILED | Payment is recorded as FAILED and customer is notified | Critical |
| TC-PAY-006 |  | [Negative] Retry failed electronic payment | Payment FAILED | Retry payment | Valid retry | New attempt is processed and retry count is updated | Critical |
| TC-PAY-007 |  | [Positive] Payment failure must not change completed trip | Trip COMPLETED | Make electronic payment fail | FAILED | Trip remains COMPLETED | Critical |
| TC-PAY-008 |  | [Positive] Verify sensitive card/account data is not stored | Electronic payment attempted | Inspect CAB payment record | Card/account data | Sensitive payment credentials are not stored in CAB | Critical |
| TC-PAY-009 |  | [Positive] Payment result is recorded | Payment completed | Inspect payment | SUCCESS/FAILED | Payment status and relevant provider reference are recorded | High |
| TC-PAY-010 |  | [Negative] Invalid payment method | Trip COMPLETED | Submit payment | Unsupported method | Request is rejected | High |
