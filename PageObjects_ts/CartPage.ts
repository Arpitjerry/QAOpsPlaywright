import {test, expect, Locator, Page} from '@playwright/test'

export class CartPage
{
    page : Page
    checkout : Locator
    productTitle : Locator
    cartProducts : Locator
    constructor(page : Page)
    {
       this.page=page; 
       this.checkout=page.locator("text=Checkout")
       this.productTitle= page.locator("h3:has-text('ZARA COAT 3')")
       this.cartProducts = page.locator("div li").first();

    }

    async VerifyProductIsDisplayed(productName : string)
    {
      await this.cartProducts.waitFor();
      const bool = await this.getProductLocator(productName).isVisible();
      expect(bool).toBeTruthy();
    }

     getProductLocator(productName : string)
    {
    return  this.page.locator("h3:has-text('"+productName+"')");
    }

    async Checkout()
    {
        await this.checkout.click();
    }
    

}

