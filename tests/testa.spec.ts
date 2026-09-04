import test from "playwright/test";

test('test', async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole("link", {
        name: 'Log in'
    }).click();
    
    
})