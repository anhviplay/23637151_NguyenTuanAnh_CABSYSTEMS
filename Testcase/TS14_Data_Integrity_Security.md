# TS14 - Data Integrity & Security

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-SEC-001 |  | [Negative] Customer cannot access another customer's protected data | Two customer accounts exist | Use customer A token to request customer B data | Customer B ID | Access is denied or only authorized data is returned | Critical |
| TC-SEC-002 |  | [Negative] Driver cannot modify another driver's data | Two drivers exist | Driver A sends update for Driver B | Driver B ID | Unauthorized modification is rejected | Critical |
| TC-SEC-003 |  | [Negative] Customer cannot execute operator/admin function | Customer authenticated | Call privileged endpoint | Customer JWT | Access is denied | Critical |
| TC-SEC-004 |  | [Positive] Payment record contains no sensitive card data | Electronic payment exists | Inspect payment persistence | Payment record | No sensitive card/account credentials are stored | Critical |
| TC-SEC-005 |  | [Positive] Important operator action is traceable | Operator authenticated | Perform important action | Valid action | Corresponding audit record exists | High |
| TC-SEC-006 |  | [Negative] One trip cannot have multiple selected drivers | Trip has assignments | Attempt to mark two assignments selected | Two assignment IDs | System preserves only one selected driver | High |
| TC-SEC-007 |  | [Positive] One trip has at most one rating | Trip completed | Attempt two ratings | Same trip ID | Second rating is rejected | High |
| TC-SEC-008 |  | [Positive] Payment references correct trip | Completed trip exists | Create payment | Valid trip ID | Payment references the correct trip | High |
