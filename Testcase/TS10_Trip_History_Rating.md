# TS10 - Trip History & Rating

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-HIS-001 |  | [Positive] View trip history | Customer has trips | Request history | Valid customer token | Customer's trip history is returned | High |
| TC-HIS-002 |  | [Positive] View completed trip with fare | Completed trip exists | Request history/details | Completed trip | Completed trip and payable amount are displayed | High |
| TC-HIS-003 |  | [Positive] Request history with valid pagination | Customer has many trips | Request page | Valid page/per_page | Correct page of history is returned | Medium |
| TC-HIS-004 |  | [Positive] Use per_page above allowed maximum | Customer exists | Request history | per_page > 100 | Validation error is returned | Medium |
| TC-RAT-001 |  | [Positive] Rate completed trip | Trip COMPLETED | Submit rating | Score 5 | Rating is created successfully | Critical |
| TC-RAT-002 |  | [Positive] Rate with minimum score | Trip COMPLETED | Submit rating | Score 1 | Rating is accepted | High |
| TC-RAT-003 |  | [Positive] Rate with score 0 | Trip COMPLETED | Submit rating | Score 0 | Validation error is returned | High |
| TC-RAT-004 |  | [Positive] Rate with score 6 | Trip COMPLETED | Submit rating | Score 6 | Validation error is returned | High |
| TC-RAT-005 |  | [Negative] Rate trip before completion | Trip IN_PROGRESS | Submit rating | Valid score | Rating is rejected | Critical |
| TC-RAT-006 |  | [Positive] Rate same trip twice | Rating already exists | Submit another rating | Valid score | Second rating is rejected; one rating per trip is preserved | Critical |
