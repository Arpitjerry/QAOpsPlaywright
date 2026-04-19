import {Page, Locator} from '@playwright/test'

export class LoginPage
{

    page : Page
    userName : Locator
    Password : Locator
    SignInButton : Locator

    constructor(page : Page)
    {
        this.page=page;
        this.userName=page.locator('#userEmail')
        this.Password=page.locator('#userPassword')
        this.SignInButton=page.locator('#login')
    }

    async goTo()
        {
           await this.page.goto("https://rahulshettyacademy.com/client")
        }
    async ValidLogin(username : string,password : string)
    {
        await this.userName.fill(username );
        await this.Password.fill(password );
        await this.SignInButton.click();
        //await this.page.waitForLoadState('networkidle')
        await this.page.locator("[style='text-transform: uppercase;']").last().waitFor();
    }    
    
}
