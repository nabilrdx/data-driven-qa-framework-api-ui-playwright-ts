import { APIRequest, APIRequestContext, Request } from "playwright";
import { RegistrationPayload } from "../types/Domain";

export class RegistrationController {
    private readonly request: APIRequestContext;
    private readonly registerEndpoint: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.registerEndpoint = 'https://api.practicesoftwaretesting.com/users/register';
    }

    async registerUser(payload: RegistrationPayload) {
        return await this.request.post(this.registerEndpoint, {
            data: payload,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

}