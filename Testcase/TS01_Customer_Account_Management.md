# TS01 - Customer Account Management

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-CUS-001 |  | [Positive] Register customer with valid information | Customer does not exist | Send register request | Valid name, phone, email, password >= 8 chars | Customer account is created successfully | High |
| TC-CUS-002 |  | [Negative] Register without full name | None | Send register request without full_name | Missing full_name | Request is rejected with validation error | High |
| TC-CUS-003 |  | [Negative] Register without phone | None | Send register request without phone | Missing phone | Request is rejected with validation error | High |
| TC-CUS-004 |  | [Negative] Register without email | None | Send register request without email | Missing email | Request is rejected with validation error | High |
| TC-CUS-005 |  | [Negative] Register with invalid email | None | Send register request | `abc.com` | Request is rejected with validation error | High |
| TC-CUS-006 |  | [Negative] Register with password shorter than 8 characters | None | Send register request | Password `1234567` | Request is rejected with validation error | High |
| TC-CUS-007 |  | [Negative] Register duplicate customer | Existing customer | Register using existing email/phone | Existing account data | Duplicate account is rejected | High |
| TC-CUS-008 |  | [Positive] Login with valid credentials | Customer exists | Send login request | Correct email/password | Login succeeds and authentication token is returned | Critical |
| TC-CUS-009 |  | [Negative] Login with incorrect password | Customer exists | Send login request | Correct email + wrong password | Login is rejected as unauthenticated | High |
| TC-CUS-010 |  | [Negative] Login with non-existing account | None | Send login request | Unknown email | Login is rejected | High |
| TC-CUS-011 |  | [Negative] Access protected API without token | Customer exists | Call protected endpoint | No Authorization header | Request is rejected as unauthenticated | Critical |
| TC-CUS-012 |  | [Negative] Access protected API with invalid token | Customer exists | Call protected endpoint | Invalid JWT | Request is rejected as unauthenticated | Critical |
| TC-CUS-013 |  | [Positive] View customer profile with valid token | Logged-in customer | Call profile endpoint | Valid JWT | Correct customer profile is returned | High |
| TC-CUS-014 |  | [Positive] Update customer profile with valid data | Logged-in customer | Send update request | Valid name/phone/email | Customer information is updated | High |
| TC-CUS-015 |  | [Negative] Update profile with invalid email | Logged-in customer | Send update request | Invalid email | Validation error is returned and data is not updated | Medium |
