import { Locator, Page } from "playwright";
import { Env } from "../Config/environment";

export class LoginPage{
    private readonly page: Page;
    public readonly emailField: Locator;
    public readonly passwordField: Locator;
    public readonly loginCta: Locator;
    public readonly failedAttemptMessage: Locator;
    public readonly incorrectCredsErrorMessage: Locator;
    public readonly noCustomerFoundErrorMessage: Locator;
    public readonly logOutCta: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailField = page.getByRole("textbox", {
            name: 'Email'
        });
        this.passwordField = page.getByRole("textbox", {
            name: 'Password'
        });
        this.loginCta = page.getByRole("button", {
            name: 'Log in'
        })
        this.failedAttemptMessage = page.getByText('Login was unsuccessful. Please correct the errors and try again.');
        this.incorrectCredsErrorMessage = page.getByText('The credentials provided are incorrect');
        this.noCustomerFoundErrorMessage = page.getByText('No customer account found');
        this.logOutCta= page.getByRole("link", {
                    name: 'Log out'
                })
    }

    async fillEmail(email: string){
        await this.emailField.fill(email);
    }
    async fillPassword(password: string){
        await this.passwordField.fill(password)
    }

    async clickLogin(){
        await this.loginCta.click();
    }

    async loginWithCredentials(email: string, password: string){
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async navigate(){
        await this.page.goto('/login');
    }


}