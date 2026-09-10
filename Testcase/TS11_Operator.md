# TS11 - Operator

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-OPS-001 |  | [Positive] Operator creates driver | Authorized operator | Submit driver data | Valid driver data | Driver is created successfully | High |
| TC-OPS-002 |  | [Negative] Unauthorized user creates driver through operator API | Customer/driver account | Call operator endpoint | Valid data | Access is denied | High |
| TC-OPS-003 |  | [Positive] Search driver by status | Authorized operator | Search drivers | ACTIVE/AVAILABLE | Matching drivers are returned | High |
| TC-OPS-004 |  | [Positive] View active trips | Authorized operator | Request active trips | None | Active trips are returned | High |
| TC-OPS-005 |  | [Positive] Support a problematic trip | Authorized operator | Submit support action | Valid trip + action_detail | Support action is recorded | High |
| TC-OPS-006 |  | [Positive] Verify support action creates audit record | Authorized operator | Perform important operation | Valid action | Important operation is traceable in audit log | High |
| TC-OPS-007 |  | [Positive] View payment history | Authorized operator | Request payment history | Valid filters | Correct payment records are returned | Medium |
