# TS07 - Driver Location

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-LOC-001 |  | [Positive] Update driver location with valid coordinates | Authenticated driver | Submit location | Valid latitude/longitude | Location is stored | High |
| TC-LOC-002 |  | [Positive] Latitude = 90 | Authenticated driver | Submit location | 90 | Location is accepted | High |
| TC-LOC-003 |  | [Positive] Latitude = -90 | Authenticated driver | Submit location | -90 | Location is accepted | High |
| TC-LOC-004 |  | [Positive] Longitude = 180 | Authenticated driver | Submit location | 180 | Location is accepted | High |
| TC-LOC-005 |  | [Positive] Longitude = -180 | Authenticated driver | Submit location | -180 | Location is accepted | High |
| TC-LOC-006 |  | [Negative] Invalid latitude | Authenticated driver | Submit location | 90.1 | Validation error is returned | High |
| TC-LOC-007 |  | [Negative] Invalid longitude | Authenticated driver | Submit location | 180.1 | Validation error is returned | High |
| TC-LOC-008 |  | [Positive] No new location update | Driver has previous location | Stop sending updates | No new location | Last known location remains available; trip is not automatically marked arrived/completed | Critical |
