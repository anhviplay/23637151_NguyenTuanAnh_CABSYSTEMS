# TS12 - Admin, Authorization & Audit Log

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-ADM-001 |  | [Positive] Admin accesses audit logs | Admin authenticated | Request audit logs | Valid JWT | Audit logs are returned | Critical |
| TC-ADM-002 |  | [Positive] Customer accesses admin API | Customer authenticated | Request audit logs | Customer JWT | Access is denied | Critical |
| TC-ADM-003 |  | [Positive] Driver accesses admin API | Driver authenticated | Request audit logs | Driver JWT | Access is denied | Critical |
| TC-ADM-004 |  | [Positive] Operator accesses admin-only endpoint | Operator authenticated | Request admin endpoint | Operator JWT | Access is denied unless role explicitly permits it | Critical |
| TC-ADM-005 |  | [Negative] Access admin API without token | None | Request endpoint | No JWT | Request is rejected | Critical |
| TC-ADM-006 |  | [Positive] Filter audit log by target type | Admin authenticated | Request audit logs | target_type | Only matching audit records are returned | High |
| TC-ADM-007 |  | [Positive] Filter audit log by target ID | Admin authenticated | Request audit logs | target_id | Only matching audit records are returned | High |
| TC-ADM-008 |  | [Positive] Verify important action is logged | Authorized operator/admin | Perform important action | Valid action | Audit record contains action type, target and timestamp | Critical |
