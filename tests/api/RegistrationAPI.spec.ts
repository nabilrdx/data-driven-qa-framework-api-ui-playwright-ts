import {test, expect} from "../../src/fixtures/MyFixtures";
import { RegistrationTestCase as registrationTestCases } from "../data-driven/registrationTestData";



test.describe('Registration API scenario', ()=>{
//Arrange
for(let tc of registrationTestCases){ 
    test(`${tc.caseid}`, async({registrationController})=>{
        //Action
        const registrationApiCall = await registrationController.registerUser(tc.payload);
        const jsonResponse = await registrationApiCall.json();

        //Assert
        expect(registrationApiCall.status()).toBe(tc.expectedStatus);
        if(tc.expectSuccess){
            expect(jsonResponse.first_name).toBe(tc.payload.first_name);
            expect(jsonResponse.last_name).toBe(tc.payload.last_name);
            expect(jsonResponse.email).toBe(tc.payload.email);
            expect(jsonResponse).toHaveProperty('id');
            expect(typeof jsonResponse.id).toBe('string');
        }else{
            if(!tc.expectSuccess){
                expect(jsonResponse).toMatchObject(tc.expectedErrorMessage as any);
            }
        }

    })
}
});