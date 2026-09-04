import { LoginCase } from "../../src/types/Domain";

export const loginTestCase: LoginCase[] = [
    {
        caseId: 'LG-01 - Login with valid password',
        email: 'hekofeku@yopmail.com',
        password: '11992288@Nn',
        expectedOutcome: "SUCCESS",
    },
    {
        caseId: 'LG-02 - Login with invalid password',
        email: 'hekofeku@yopmail.com',
        password: '11992288NnM',
        expectedOutcome: "INVALID_CREDENTIALS",
        expectedMessage: "The credentials provided are incorrect"
    },
    {
        caseId: 'LG-03 - Login with non-existing user',
        email: 'idonotexistmen@yopmail.com',
        password: '11992288NnM',
        expectedOutcome: "VALIDATION_ERROR",
        expectedMessage: "No customer account found"
    },
    {
        caseId: 'LG-04 - Login without email',
        email: '',
        password: '11992288NnM',
        expectedOutcome: "VALIDATION_ERROR",
        expectedMessage: "No customer account found"
    },
    {
        caseId: 'LG-05 - Login without password',
        email: 'hekufeku@yopmail.com',
        password: '',
        expectedOutcome: "VALIDATION_ERROR",
        expectedMessage: "No customer account found"
    },

]