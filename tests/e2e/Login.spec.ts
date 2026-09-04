import {test, expect} from "../../src/fixtures/MyFixtures";
import { loginTestCase as loginTestCases } from "../data-driven/loginTestData";

test.describe('Login Scenario', async()=>{

    //Arrange
    for(let tc of loginTestCases){
        test(`${tc.caseId}`, async({page, loginPage})=>{

            //Action
            await loginPage.navigate();
            await loginPage.loginWithCredentials(tc.email, tc.password);

            //Assertion
            if(tc.expectedOutcome == 'SUCCESS'){
                await expect(loginPage.logOutCta).toBeVisible();
            }else if(tc.expectedOutcome == "INVALID_CREDENTIALS"){
                await expect.soft(loginPage.failedAttemptMessage).toBeVisible();
                await expect(loginPage.incorrectCredsErrorMessage).toBeVisible();
            }else{
                await expect.soft(loginPage.failedAttemptMessage).toBeVisible();
                await expect(loginPage.noCustomerFoundErrorMessage).toBeVisible();
            }

        })
    }
})