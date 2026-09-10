# TS13 - Leadership / Operation Report

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-RPT-001 |  | [Positive] Generate report with valid date range | Authorized user | Request report | Valid from/to | Report is returned | High |
| TC-RPT-002 |  | [Negative] Missing from date | Authorized user | Request report | Missing from | Validation error is returned | High |
| TC-RPT-003 |  | [Negative] Missing to date | Authorized user | Request report | Missing to | Validation error is returned | High |
| TC-RPT-004 |  | [Negative] Invalid date format | Authorized user | Request report | Invalid date | Validation error is returned | High |
| TC-RPT-005 |  | [Negative] from date later than to date | Authorized user | Request report | from > to | Request is rejected | High |
| TC-RPT-006 |  | [Positive] Verify trip count in report | Data exists | Generate report | Known date range | Trip count matches source trip data | High |
| TC-RPT-007 |  | [Positive] Verify revenue in report | Completed/payment data exists | Generate report | Known date range | Revenue matches eligible payment/trip data | High |
| TC-RPT-008 |  | [Positive] Generate report for period with no data | Authorized user | Request report | Empty date range | System returns valid empty/zero report without fabricated data | Medium |
