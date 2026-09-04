import { RegistrationCase } from "../../src/types/Domain";

export const RegistrationTestCase: RegistrationCase[] = [
    {
        caseid: "TC-01 Happy Path - Valid registration with minimal payload",
        payload: {
            first_name: "m",
            last_name: "lo",
            email: `${Date.now()}-qa1@yopmail.com`,
            password: "milk@M123"
        },
        expectedStatus: 201,
        expectSuccess: true
    },
    {
        caseid: "TC-02 Negative Path - Re-registering the existing user.",
        payload: {
            first_name: "m",
            last_name: "lo",
            email: `admin@practicesoftwaretesting.com`,
            password: "TestPassword@1"
        },
        expectedStatus: 409,
        expectSuccess: false,
        expectedErrorMessage: {
            "email": [
                "A customer with this email address already exists."
            ]
        }
    },
    {
        caseid: "TC-03 Negative Path - missing firstName, lastName, email & password",
        payload: {
            first_name: "",
            last_name: "",
            email: ``,
            password: ""
        },
        expectedStatus: 422,
        expectSuccess: false,
        expectedErrorMessage: {
            "first_name": [
                "The first name field is required."
            ],
            "last_name": [
                "The last name field is required."
            ],
            "email": [
                "The email field is required."
            ],
            "password": [
                "The password field is required."
            ]
        }
    }
]