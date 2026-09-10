# TS02 - Driver Account, Vehicle & Availability

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-DRV-001 |  | [Positive] Register driver with valid information | Driver does not exist | Register driver | Valid profile + vehicle | Driver and vehicle information are created | High |
| TC-DRV-002 |  | [Negative] Register driver without required profile data | None | Register driver | Missing required field | Request is rejected | High |
| TC-DRV-003 |  | [Negative] Create vehicle without vehicle type | Driver exists | Submit vehicle data | Missing vehicle_type | Validation error is returned | High |
| TC-DRV-004 |  | [Negative] Create vehicle without license plate | Driver exists | Submit vehicle data | Missing license_plate | Validation error is returned | High |
| TC-DRV-005 |  | [Positive] Driver updates profile | Authenticated driver | Send update request | Valid profile data | Profile is updated | High |
| TC-DRV-006 |  | [Positive] Driver updates vehicle | Authenticated driver | Send update request | Valid vehicle data | Vehicle information is updated | High |
| TC-DRV-007 |  | [Positive] Set driver as ACTIVE and AVAILABLE | Authenticated driver | Update statuses | ACTIVE + AVAILABLE | Driver becomes eligible for trip assignment | High |
| TC-DRV-008 |  | [Negative] Set driver as UNAVAILABLE | Authenticated driver | Update availability | UNAVAILABLE | Driver is excluded from new trip assignment | High |
| TC-DRV-009 |  | [Negative] Inactive driver is excluded from assignment | Driver exists | Create trip and start matching | Driver account INACTIVE | Driver is not selected | Critical |
| TC-DRV-010 |  | [Positive] Suspended driver is excluded from assignment | Driver exists | Create trip and start matching | Driver account SUSPENDED | Driver is not selected | Critical |
