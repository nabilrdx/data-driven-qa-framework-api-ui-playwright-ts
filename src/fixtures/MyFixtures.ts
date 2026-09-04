import {test as base, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { RegistrationController } from '../Controllers/RegistrationController';

type MyFixtures={
    loginPage: LoginPage;
    registrationController: RegistrationController
}

export const test = base.extend<MyFixtures>({
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page));
    },
    registrationController: async({request}, use)=>{
        await use(new RegistrationController(request))
    }
})

export {expect} from '@playwright/test'