export interface LoginCase {
    caseId: string;
    email: string;
    password: string
    expectedOutcome:
    | 'SUCCESS'
    | 'INVALID_CREDENTIALS'
    | 'VALIDATION_ERROR';
  expectedMessage?: string;
}

export interface RegistrationPayload{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface RegistrationCase{
    caseid: string;
    payload: RegistrationPayload;
    expectedStatus: number;
    expectSuccess: boolean;
    expectedErrorMessage?: object;
}


