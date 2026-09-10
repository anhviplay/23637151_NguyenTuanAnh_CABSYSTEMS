# CAB System - Test Scenarios & Test Cases

**Project:** CAB System  
**Repository:** `23637151_NguyenTuanAnh_CABSYSTEMS`  
**Document:** Test Cases  
**Version:** 1.0

## Test Case Format

- **TC ID:** Unique test case identifier
- **Scenario:** Test scenario
- **Requirement:** Related BR / FR / BRULE / EX / API
- **Priority:** Critical / High / Medium
- **Precondition:** Required condition before execution
- **Test Steps:** Actions to execute
- **Test Data:** Input data
- **Expected Result:** Expected system behavior
- **Status:** Not Run / Pass / Fail

---

# TS01 - Customer Account Management

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-CUS-001 | FR01/FR02 | High | Register customer with valid information | Customer does not exist | Send register request | Valid name, phone, email, password >= 8 chars | Customer account is created successfully | Not Run |
| TC-CUS-002 | FR01/FR02 | High | Register without full name | None | Send register request without full_name | Missing full_name | Request is rejected with validation error | Not Run |
| TC-CUS-003 | FR01/FR02 | High | Register without phone | None | Send register request without phone | Missing phone | Request is rejected with validation error | Not Run |
| TC-CUS-004 | FR01/FR02 | High | Register without email | None | Send register request without email | Missing email | Request is rejected with validation error | Not Run |
| TC-CUS-005 | FR01/FR02 | High | Register with invalid email | None | Send register request | `abc.com` | Request is rejected with validation error | Not Run |
| TC-CUS-006 | FR01/FR02 | High | Register with password shorter than 8 characters | None | Send register request | Password `1234567` | Request is rejected with validation error | Not Run |
| TC-CUS-007 | FR01/FR02 | High | Register duplicate customer | Existing customer | Register using existing email/phone | Existing account data | Duplicate account is rejected | Not Run |
| TC-CUS-008 | FR02 | Critical | Login with valid credentials | Customer exists | Send login request | Correct email/password | Login succeeds and authentication token is returned | Not Run |
| TC-CUS-009 | FR02 | High | Login with incorrect password | Customer exists | Send login request | Correct email + wrong password | Login is rejected as unauthenticated | Not Run |
| TC-CUS-010 | FR02 | High | Login with non-existing account | None | Send login request | Unknown email | Login is rejected | Not Run |
| TC-CUS-011 | BRULE01 | Critical | Access protected API without token | Customer exists | Call protected endpoint | No Authorization header | Request is rejected as unauthenticated | Not Run |
| TC-CUS-012 | BRULE01 | Critical | Access protected API with invalid token | Customer exists | Call protected endpoint | Invalid JWT | Request is rejected as unauthenticated | Not Run |
| TC-CUS-013 | FR03 | High | View customer profile with valid token | Logged-in customer | Call profile endpoint | Valid JWT | Correct customer profile is returned | Not Run |
| TC-CUS-014 | FR03 | High | Update customer profile with valid data | Logged-in customer | Send update request | Valid name/phone/email | Customer information is updated | Not Run |
| TC-CUS-015 | FR03 | Medium | Update profile with invalid email | Logged-in customer | Send update request | Invalid email | Validation error is returned and data is not updated | Not Run |

# TS02 - Driver Account, Vehicle & Availability

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-DRV-001 | FR07 | High | Register driver with valid information | Driver does not exist | Register driver | Valid profile + vehicle | Driver and vehicle information are created | Not Run |
| TC-DRV-002 | FR07 | High | Register driver without required profile data | None | Register driver | Missing required field | Request is rejected | Not Run |
| TC-DRV-003 | FR07 | High | Create vehicle without vehicle type | Driver exists | Submit vehicle data | Missing vehicle_type | Validation error is returned | Not Run |
| TC-DRV-004 | FR07 | High | Create vehicle without license plate | Driver exists | Submit vehicle data | Missing license_plate | Validation error is returned | Not Run |
| TC-DRV-005 | FR08 | High | Driver updates profile | Authenticated driver | Send update request | Valid profile data | Profile is updated | Not Run |
| TC-DRV-006 | FR08 | High | Driver updates vehicle | Authenticated driver | Send update request | Valid vehicle data | Vehicle information is updated | Not Run |
| TC-DRV-007 | FR09 | High | Set driver as ACTIVE and AVAILABLE | Authenticated driver | Update statuses | ACTIVE + AVAILABLE | Driver becomes eligible for trip assignment | Not Run |
| TC-DRV-008 | FR09 | High | Set driver as UNAVAILABLE | Authenticated driver | Update availability | UNAVAILABLE | Driver is excluded from new trip assignment | Not Run |
| TC-DRV-009 | BRULE03 | Critical | Inactive driver is excluded from assignment | Driver exists | Create trip and start matching | Driver account INACTIVE | Driver is not selected | Not Run |
| TC-DRV-010 | BRULE03 | Critical | Suspended driver is excluded from assignment | Driver exists | Create trip and start matching | Driver account SUSPENDED | Driver is not selected | Not Run |

# TS03 - Create Trip / Booking

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-TRP-001 | FR04-FR06 | Critical | Create trip with valid information | Authenticated customer | Submit trip request | Pickup + destination + vehicle type + valid coordinates | Trip is accepted and created | Not Run |
| TC-TRP-002 | BRULE02/EX01 | Critical | Create trip without pickup address | Authenticated customer | Submit request | Missing pickup address | Trip is not created | Not Run |
| TC-TRP-003 | BRULE02/EX01 | Critical | Create trip without destination address | Authenticated customer | Submit request | Missing destination address | Trip is not created | Not Run |
| TC-TRP-004 | BRULE02/EX01 | Critical | Create trip without vehicle type | Authenticated customer | Submit request | Missing vehicle type | Trip is not created | Not Run |
| TC-TRP-005 | FR04-FR06 | High | Create trip with invalid latitude > 90 | Authenticated customer | Submit request | Latitude `91` | Validation error is returned | Not Run |
| TC-TRP-006 | FR04-FR06 | High | Create trip with invalid latitude < -90 | Authenticated customer | Submit request | Latitude `-91` | Validation error is returned | Not Run |
| TC-TRP-007 | FR04-FR06 | High | Create trip with invalid longitude > 180 | Authenticated customer | Submit request | Longitude `181` | Validation error is returned | Not Run |
| TC-TRP-008 | FR04-FR06 | High | Create trip with invalid longitude < -180 | Authenticated customer | Submit request | Longitude `-181` | Validation error is returned | Not Run |
| TC-TRP-009 | BRULE01 | Critical | Create trip without authentication | Customer account exists | Submit trip request | No JWT | Request is rejected | Not Run |
| TC-TRP-010 | FR17 | Critical | Verify initial trip status after valid booking | Valid trip request | Create trip | Valid booking | Trip enters the driver-search flow | Not Run |

# TS04 - Driver Search & Assignment

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-ASS-001 | BRULE03/19 | Critical | Assign an eligible available driver | Trip exists | Start driver matching | ACTIVE + AVAILABLE suitable driver | Driver receives trip request | Not Run |
| TC-ASS-002 | BRULE03 | Critical | Exclude unavailable driver | Trip exists | Start driver matching | Driver UNAVAILABLE | Driver is skipped | Not Run |
| TC-ASS-003 | BRULE04/19 | High | Prefer suitable nearby driver | Multiple drivers exist | Start matching | Multiple suitable drivers at different locations | Driver selected according to configured matching priority | Not Run |
| TC-ASS-004 | BRULE05/19 | Critical | Driver rejects trip | Driver received assignment | Reject assignment | `REJECTED` | System records rejection and searches next suitable driver | Not Run |
| TC-ASS-005 | BRULE05/20 | Critical | Driver does not respond within 15 seconds | Driver received assignment | Wait beyond configured timeout | No response for 15 seconds | Assignment expires/is recorded as no response and next driver is contacted | Not Run |
| TC-ASS-006 | BRULE06/EX02 | Critical | No suitable driver is available | No eligible drivers | Start matching | No available suitable driver | Trip ends with no-driver-found outcome and customer is notified | Not Run |
| TC-ASS-007 | BRULE21/EX10 | Critical | First valid acceptance wins | Two drivers receive/return acceptance around same time | Submit two acceptance responses | Driver A accepted first, Driver B later | Driver A remains assigned; Driver B cannot replace A | Not Run |
| TC-ASS-008 | BRULE21 | Critical | Only one assignment is selected | Trip has multiple assignments | Inspect assignment records | Multiple assignment records | Only the first valid accepted assignment is marked selected | Not Run |
| TC-ASS-009 | BRULE05 | High | Customer does not recreate trip after driver rejection | Trip exists | Driver rejects | Valid trip | Same trip continues searching for another driver | Not Run |
| TC-ASS-010 | BRULE23 | Critical | Cancel trip while driver search is active | Trip is searching | Customer cancels | Valid trip ID | Search stops and trip becomes CANCELLED | Not Run |

# TS05 - Driver Assignment Response

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-RES-001 | FR14 | Critical | Driver accepts valid assignment | Assignment is active | Submit response | `ACCEPTED` | Trip is assigned to driver | Not Run |
| TC-RES-002 | FR14 | Critical | Driver rejects valid assignment | Assignment is active | Submit response | `REJECTED` | Assignment is rejected and next driver can be searched | Not Run |
| TC-RES-003 | FR14 | High | Missing response status | Assignment is active | Submit empty/invalid request | Missing response_status | Validation error is returned | Not Run |
| TC-RES-004 | FR14 | High | Invalid response status | Assignment is active | Submit response | `PENDING` or other unsupported value | Validation error is returned | Not Run |
| TC-RES-005 | BRULE20/EX09 | Critical | Respond exactly before timeout | Assignment active | Respond at 14.9 seconds | ACCEPTED | Response is accepted if within configured waiting period | Not Run |
| TC-RES-006 | BRULE20/EX09 | Critical | Respond after timeout | Assignment expired | Submit response after timeout | ACCEPTED | Response is rejected because assignment has expired | Not Run |
| TC-RES-007 | BRULE21 | Critical | Late acceptance after another driver is assigned | Trip already assigned | Submit acceptance | Late ACCEPTED | Late response does not change assigned driver | Not Run |

# TS06 - Trip Status Management

| TC ID | Requirement | Priority | Test Case | Precondition | Test Case | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-STS-001 | BRULE07 | Critical | DRIVER_ASSIGNED to DRIVER_ARRIVED | Trip assigned | Update status to DRIVER_ARRIVED | Status becomes DRIVER_ARRIVED | Not Run |
| TC-STS-002 | BRULE07 | Critical | DRIVER_ARRIVED to PASSENGER_PICKED_UP | Driver arrived | Update status | PASSENGER_PICKED_UP | Status becomes PASSENGER_PICKED_UP | Not Run |
| TC-STS-003 | BRULE07 | Critical | PASSENGER_PICKED_UP to IN_PROGRESS | Passenger picked up | Update status | IN_PROGRESS | Status becomes IN_PROGRESS | Not Run |
| TC-STS-004 | BRULE07 | Critical | IN_PROGRESS to COMPLETED | Trip in progress | Update status | COMPLETED | Trip becomes COMPLETED | Not Run |
| TC-STS-005 | BRULE07 | Critical | Skip DRIVER_ARRIVED | Trip assigned | Update status | IN_PROGRESS | Transition is rejected | Not Run |
| TC-STS-006 | BRULE07 | Critical | Skip PASSENGER_PICKED_UP | Driver arrived | Update status | COMPLETED | Transition is rejected | Not Run |
| TC-STS-007 | BRULE07/EX05 | Critical | Move from COMPLETED back to IN_PROGRESS | Trip completed | Update status | IN_PROGRESS | Transition is rejected and event is recorded | Not Run |
| TC-STS-008 | BRULE07/EX05 | Critical | Move from IN_PROGRESS back to DRIVER_ARRIVED | Trip in progress | Update status | DRIVER_ARRIVED | Transition is rejected | Not Run |
| TC-STS-009 | BRULE07 | High | Unauthorized user updates trip status | User not authorized | Send status update | Valid status | Request is rejected | Not Run |
| TC-STS-010 | BRULE07 | High | Verify customer sees current trip status | Trip exists | Request trip status | Valid trip ID | Current persisted status is returned | Not Run |

# TS07 - Driver Location

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-LOC-001 | FR19 | High | Update driver location with valid coordinates | Authenticated driver | Submit location | Valid latitude/longitude | Location is stored | Not Run |
| TC-LOC-002 | FR19 | High | Latitude = 90 | Authenticated driver | Submit location | 90 | Location is accepted | Not Run |
| TC-LOC-003 | FR19 | High | Latitude = -90 | Authenticated driver | Submit location | -90 | Location is accepted | Not Run |
| TC-LOC-004 | FR19 | High | Longitude = 180 | Authenticated driver | Submit location | 180 | Location is accepted | Not Run |
| TC-LOC-005 | FR19 | High | Longitude = -180 | Authenticated driver | Submit location | -180 | Location is accepted | Not Run |
| TC-LOC-006 | FR19 | High | Invalid latitude | Authenticated driver | Submit location | 90.1 | Validation error is returned | Not Run |
| TC-LOC-007 | FR19 | High | Invalid longitude | Authenticated driver | Submit location | 180.1 | Validation error is returned | Not Run |
| TC-LOC-008 | BRULE25/EX14 | Critical | No new location update | Driver has previous location | Stop sending updates | No new location | Last known location remains available; trip is not automatically marked arrived/completed | Not Run |

# TS08 - Fare & Payment

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-PAY-001 | BRULE08 | Critical | Calculate fare after completed trip | Trip COMPLETED | Trigger fare/payment flow | Completed trip | Fare is determined according to approved MBB rule | Not Run |
| TC-PAY-002 | BRULE08 | Critical | Attempt fare determination before completion | Trip not completed | Trigger fare flow | IN_PROGRESS | Fare is not finalized | Not Run |
| TC-PAY-003 | BRULE09 | Critical | Cash payment for completed trip | Trip COMPLETED | Select payment method | CASH | Payment is recorded as successful when cash payment is accepted | Not Run |
| TC-PAY-004 | BRULE09 | Critical | Electronic payment success | Trip COMPLETED | Pay electronically | ELECTRONIC | Payment result is recorded as SUCCESS | Not Run |
| TC-PAY-005 | BRULE12/EX06 | Critical | Electronic payment failure | Trip COMPLETED | Simulate provider failure | ELECTRONIC / FAILED | Payment is recorded as FAILED and customer is notified | Not Run |
| TC-PAY-006 | BRULE26/EX15 | Critical | Retry failed electronic payment | Payment FAILED | Retry payment | Valid retry | New attempt is processed and retry count is updated | Not Run |
| TC-PAY-007 | BRULE26 | Critical | Payment failure must not change completed trip | Trip COMPLETED | Make electronic payment fail | FAILED | Trip remains COMPLETED | Not Run |
| TC-PAY-008 | BRULE10 | Critical | Verify sensitive card/account data is not stored | Electronic payment attempted | Inspect CAB payment record | Card/account data | Sensitive payment credentials are not stored in CAB | Not Run |
| TC-PAY-009 | BRULE11 | High | Payment result is recorded | Payment completed | Inspect payment | SUCCESS/FAILED | Payment status and relevant provider reference are recorded | Not Run |
| TC-PAY-010 | BRULE11 | High | Invalid payment method | Trip COMPLETED | Submit payment | Unsupported method | Request is rejected | Not Run |

# TS09 - Notification

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-NOT-001 | BRULE13 | High | Notify customer when booking is accepted | Valid booking | Trigger notification | Booking event | Customer notification is generated | Not Run |
| TC-NOT-002 | BRULE13 | High | Notify customer when driver is assigned | Driver assigned | Trigger notification | Driver assigned event | Customer receives assignment notification | Not Run |
| TC-NOT-003 | BRULE13 | High | Notify customer when driver arrives | Driver arrived | Trigger notification | DRIVER_ARRIVED | Arrival notification is generated | Not Run |
| TC-NOT-004 | BRULE13 | High | Notify customer when trip completes | Trip completed | Trigger notification | COMPLETED | Completion notification is generated | Not Run |
| TC-NOT-005 | BRULE13 | High | Notify customer of payment result | Payment processed | Trigger notification | SUCCESS/FAILED | Payment result notification is generated | Not Run |
| TC-NOT-006 | BRULE14 | High | Notify driver about new trip | Matching sends assignment | Trigger notification | New trip | Driver receives trip notification | Not Run |
| TC-NOT-007 | BRULE18/EX08 | Critical | Notification provider fails during booking | Booking active | Simulate provider failure | Provider 5xx/FAILED | Booking flow continues and notification failure is recorded | Not Run |
| TC-NOT-008 | BRULE18 | High | Notification status SENT is recorded | Provider succeeds | Send notification | Valid notification | Notification status is SENT | Not Run |
| TC-NOT-009 | BRULE18 | Medium | Notification status FAILED is recorded | Provider fails | Send notification | Provider failure | Notification status is FAILED | Not Run |

# TS10 - Trip History & Rating

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-HIS-001 | FR34/35 | High | View trip history | Customer has trips | Request history | Valid customer token | Customer's trip history is returned | Not Run |
| TC-HIS-002 | FR34/35 | High | View completed trip with fare | Completed trip exists | Request history/details | Completed trip | Completed trip and payable amount are displayed | Not Run |
| TC-HIS-003 | FR35 | Medium | Request history with valid pagination | Customer has many trips | Request page | Valid page/per_page | Correct page of history is returned | Not Run |
| TC-HIS-004 | FR35 | Medium | Use per_page above allowed maximum | Customer exists | Request history | per_page > 100 | Validation error is returned | Not Run |
| TC-RAT-001 | BRULE27/EX17 | Critical | Rate completed trip | Trip COMPLETED | Submit rating | Score 5 | Rating is created successfully | Not Run |
| TC-RAT-002 | BRULE27 | High | Rate with minimum score | Trip COMPLETED | Submit rating | Score 1 | Rating is accepted | Not Run |
| TC-RAT-003 | BRULE27 | High | Rate with score 0 | Trip COMPLETED | Submit rating | Score 0 | Validation error is returned | Not Run |
| TC-RAT-004 | BRULE27 | High | Rate with score 6 | Trip COMPLETED | Submit rating | Score 6 | Validation error is returned | Not Run |
| TC-RAT-005 | BRULE27/EX17 | Critical | Rate trip before completion | Trip IN_PROGRESS | Submit rating | Valid score | Rating is rejected | Not Run |
| TC-RAT-006 | BRULE27 | Critical | Rate same trip twice | Rating already exists | Submit another rating | Valid score | Second rating is rejected; one rating per trip is preserved | Not Run |

# TS11 - Operator

| TC ID | Requirement | Priority | Test Case | Precondition | Test Case | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-OPS-001 | FR37-FR40 | High | Operator creates driver | Authorized operator | Submit driver data | Valid driver data | Driver is created successfully | Not Run |
| TC-OPS-002 | FR37-FR40 | High | Unauthorized user creates driver through operator API | Customer/driver account | Call operator endpoint | Valid data | Access is denied | Not Run |
| TC-OPS-003 | FR37-FR40 | High | Search driver by status | Authorized operator | Search drivers | ACTIVE/AVAILABLE | Matching drivers are returned | Not Run |
| TC-OPS-004 | FR37-FR40 | High | View active trips | Authorized operator | Request active trips | None | Active trips are returned | Not Run |
| TC-OPS-005 | FR37-FR40 | High | Support a problematic trip | Authorized operator | Submit support action | Valid trip + action_detail | Support action is recorded | Not Run |
| TC-OPS-006 | BRULE17 | High | Verify support action creates audit record | Authorized operator | Perform important operation | Valid action | Important operation is traceable in audit log | Not Run |
| TC-OPS-007 | FR40 | Medium | View payment history | Authorized operator | Request payment history | Valid filters | Correct payment records are returned | Not Run |

# TS12 - Admin, Authorization & Audit Log

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-ADM-001 | BRULE15 | Critical | Admin accesses audit logs | Admin authenticated | Request audit logs | Valid JWT | Audit logs are returned | Not Run |
| TC-ADM-002 | BRULE15 | Critical | Customer accesses admin API | Customer authenticated | Request audit logs | Customer JWT | Access is denied | Not Run |
| TC-ADM-003 | BRULE15 | Critical | Driver accesses admin API | Driver authenticated | Request audit logs | Driver JWT | Access is denied | Not Run |
| TC-ADM-004 | BRULE15 | Critical | Operator accesses admin-only endpoint | Operator authenticated | Request admin endpoint | Operator JWT | Access is denied unless role explicitly permits it | Not Run |
| TC-ADM-005 | BRULE01 | Critical | Access admin API without token | None | Request endpoint | No JWT | Request is rejected | Not Run |
| TC-ADM-006 | BRULE17 | High | Filter audit log by target type | Admin authenticated | Request audit logs | target_type | Only matching audit records are returned | Not Run |
| TC-ADM-007 | BRULE17 | High | Filter audit log by target ID | Admin authenticated | Request audit logs | target_id | Only matching audit records are returned | Not Run |
| TC-ADM-008 | BRULE17 | Critical | Verify important action is logged | Authorized operator/admin | Perform important action | Valid action | Audit record contains action type, target and timestamp | Not Run |

# TS13 - Leadership / Operation Report

| TC ID | Requirement | Priority | Test Case | Precondition | Test Case | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-RPT-001 | FR43 | High | Generate report with valid date range | Authorized user | Request report | Valid from/to | Report is returned | Not Run |
| TC-RPT-002 | FR43 | High | Missing from date | Authorized user | Request report | Missing from | Validation error is returned | Not Run |
| TC-RPT-003 | FR43 | High | Missing to date | Authorized user | Request report | Missing to | Validation error is returned | Not Run |
| TC-RPT-004 | FR43 | High | Invalid date format | Authorized user | Request report | Invalid date | Validation error is returned | Not Run |
| TC-RPT-005 | FR43 | High | from date later than to date | Authorized user | Request report | from > to | Request is rejected | Not Run |
| TC-RPT-006 | FR43 | High | Verify trip count in report | Data exists | Generate report | Known date range | Trip count matches source trip data | Not Run |
| TC-RPT-007 | FR43 | High | Verify revenue in report | Completed/payment data exists | Generate report | Known date range | Revenue matches eligible payment/trip data | Not Run |
| TC-RPT-008 | FR43 | Medium | Generate report for period with no data | Authorized user | Request report | Empty date range | System returns valid empty/zero report without fabricated data | Not Run |

# TS14 - Data Integrity & Security

| TC ID | Requirement | Priority | Test Case | Precondition | Test Steps | Test Data | Expected Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-SEC-001 | BRULE16 | Critical | Customer cannot access another customer's protected data | Two customer accounts exist | Use customer A token to request customer B data | Customer B ID | Access is denied or only authorized data is returned | Not Run |
| TC-SEC-002 | BRULE16 | Critical | Driver cannot modify another driver's data | Two drivers exist | Driver A sends update for Driver B | Driver B ID | Unauthorized modification is rejected | Not Run |
| TC-SEC-003 | BRULE15/16 | Critical | Customer cannot execute operator/admin function | Customer authenticated | Call privileged endpoint | Customer JWT | Access is denied | Not Run |
| TC-SEC-004 | BRULE10 | Critical | Payment record contains no sensitive card data | Electronic payment exists | Inspect payment persistence | Payment record | No sensitive card/account credentials are stored | Not Run |
| TC-SEC-005 | BRULE17 | High | Important operator action is traceable | Operator authenticated | Perform important action | Valid action | Corresponding audit record exists | Not Run |
| TC-SEC-006 | Data model | High | One trip cannot have multiple selected drivers | Trip has assignments | Attempt to mark two assignments selected | Two assignment IDs | System preserves only one selected driver | Not Run |
| TC-SEC-007 | Data model | High | One trip has at most one rating | Trip completed | Attempt two ratings | Same trip ID | Second rating is rejected | Not Run |
| TC-SEC-008 | Data model | High | Payment references correct trip | Completed trip exists | Create payment | Valid trip ID | Payment references the correct trip | Not Run |

# TS15 - End-to-End Critical Scenarios

| TC ID | Requirement | Priority | Test Case | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| TC-E2E-001 | BRULE01-27 | Critical | Successful cash trip | Register/login customer -> create trip -> assign driver -> driver accepts -> DRIVER_ARRIVED -> PASSENGER_PICKED_UP -> IN_PROGRESS -> COMPLETED -> CASH payment -> history -> rating | Entire trip flow completes successfully and all related records/notifications are consistent | Not Run |
| TC-E2E-002 | BRULE05/19/21 | Critical | Driver rejects and next driver accepts | Create trip -> Driver A rejects -> Driver B accepts -> continue trip | Same trip is reassigned to Driver B without customer recreating booking | Not Run |
| TC-E2E-003 | BRULE20/EX09 | Critical | Driver timeout after 15 seconds | Create trip -> Driver A receives request -> no response for 15 sec -> observe next assignment | Driver A is recorded as no response and Driver B receives request | Not Run |
| TC-E2E-004 | BRULE21/EX10 | Critical | Multiple drivers accept | Create trip -> submit acceptance from Driver A and later Driver B | First valid acceptance wins; later acceptance does not change assigned driver | Not Run |
| TC-E2E-005 | BRULE26/EX15 | Critical | Electronic payment failure and retry | Complete trip -> electronic payment fails -> inspect payment -> retry -> success | Trip remains COMPLETED; failed payment is recorded; retry can succeed | Not Run |
| TC-E2E-006 | BRULE18/EX08 | Critical | Notification provider failure does not stop booking | Create trip -> simulate notification provider failure during booking/assignment | Main booking flow continues; notification failure is recorded | Not Run |
| TC-E2E-007 | BRULE24/EX13 | High | Temporary network loss | Start active trip -> simulate temporary connection loss -> restore connection -> send update | Last valid trip state is preserved and updates synchronize after recovery | Not Run |
| TC-E2E-008 | BRULE25/EX14 | High | No location update | Driver sends location -> stop updates -> observe trip | Last known location remains; system does not automatically mark ARRIVED or COMPLETED | Not Run |
| TC-E2E-009 | BRULE22/23/EX11 | Critical | Customer cancels while searching | Create trip -> keep status searching -> cancel | Search stops and trip becomes CANCELLED | Not Run |
| TC-E2E-010 | BRULE22/EX12 | High | Customer requests cancellation after assignment | Complete driver assignment -> customer requests cancellation | Cancellation is treated as an exception and passed to operator handling; system does not invent an unapproved cancellation fee | Not Run |

## Test Coverage Summary

| Test Scenario | Main Coverage |
|---|---|
| TS01 | Customer registration, login, profile, authentication |
| TS02 | Driver, vehicle, availability |
| TS03 | Trip creation and validation |
| TS04 | Driver matching and assignment |
| TS05 | Accept/reject/timeout/late response |
| TS06 | Trip state machine |
| TS07 | Driver location |
| TS08 | Fare and payment |
| TS09 | Notification |
| TS10 | History and rating |
| TS11 | Operator |
| TS12 | Authorization and audit |
| TS13 | Reports |
| TS14 | Security and data integrity |
| TS15 | End-to-end business flows |

## Notes

1. Fare calculation values are not hard-coded because the SRS identifies the detailed fare formula as an item requiring customer confirmation.
2. Driver-priority logic is tested according to the MBB rule that the suitable and nearest driver is prioritized; the exact production algorithm should only be asserted after ABC approval.
3. Cancellation fee is not tested as a calculated amount because automatic cancellation fees are explicitly outside the MBB scope.
4. The 15-second driver response rule, first-valid-acceptance rule, state-transition rule, payment-failure behavior, notification-failure behavior and one-rating-per-trip rule are included because they are explicitly defined in the MBB business rules/exceptions.
