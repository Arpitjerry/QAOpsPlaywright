import {Page,Locator} from '@playwright/test'

export class DashboardPage
{   
    page : Page
    products : Locator
    productstext : Locator
    cart : Locator
    orders : Locator

    constructor(page : Page)
    {
       this.page=page; 
       this.products = page.locator(".card-body")
       this.productstext= page.locator(".card-body b")
       this.cart =  page.locator("[routerlink*='cart']");
       this.orders = page.locator("button[routerlink*='myorders']");
    }
    async searchProductAddCart(productName : string)
    {   

        const titles= await this.productstext.allTextContents();
        console.log(titles);
        const count =  await this.products.count();
        for ( let i=0; i<count ; i++)
        {
        if (await this.products.nth(i).locator("b").textContent() === productName)
        {

            await this.products.nth(i).locator("text= Add To Cart").click();
            console.log("Added to Cart")
            break;
        }
    }
    }
    async goToCart()
    {
        await this.cart.click();
    }

    async navigateToOrders()
    {
    await this.orders.click();
    }
}
