# TS03 - Create Trip / Booking

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-TRP-001 |  | [Positive] Create trip with valid information | Authenticated customer | Submit trip request | Pickup + destination + vehicle type + valid coordinates | Trip is accepted and created | Critical |
| TC-TRP-002 |  | [Negative] Create trip without pickup address | Authenticated customer | Submit request | Missing pickup address | Trip is not created | Critical |
| TC-TRP-003 |  | [Negative] Create trip without destination address | Authenticated customer | Submit request | Missing destination address | Trip is not created | Critical |
| TC-TRP-004 |  | [Negative] Create trip without vehicle type | Authenticated customer | Submit request | Missing vehicle type | Trip is not created | Critical |
| TC-TRP-005 |  | [Negative] Create trip with invalid latitude > 90 | Authenticated customer | Submit request | Latitude `91` | Validation error is returned | High |
| TC-TRP-006 |  | [Negative] Create trip with invalid latitude < -90 | Authenticated customer | Submit request | Latitude `-91` | Validation error is returned | High |
| TC-TRP-007 |  | [Negative] Create trip with invalid longitude > 180 | Authenticated customer | Submit request | Longitude `181` | Validation error is returned | High |
| TC-TRP-008 |  | [Negative] Create trip with invalid longitude < -180 | Authenticated customer | Submit request | Longitude `-181` | Validation error is returned | High |
| TC-TRP-009 |  | [Negative] Create trip without authentication | Customer account exists | Submit trip request | No JWT | Request is rejected | Critical |
| TC-TRP-010 |  | [Positive] Verify initial trip status after valid booking | Valid trip request | Create trip | Valid booking | Trip enters the driver-search flow | Critical |
