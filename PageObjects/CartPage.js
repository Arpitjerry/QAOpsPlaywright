const {test, expect} = require('@playwright/test');

class CartPage
{
    constructor(page)
    {
       this.page=page; 
       this.checkout=page.locator("text=Checkout")
       this.productTitle= page.locator("h3:has-text('ZARA COAT 3')")
       this.cartProducts = page.locator("div li").first();

    }

    async VerifyProductIsDisplayed(productName)
    {
      await this.cartProducts.waitFor();
      const bool = await this.getProductLocator(productName).isVisible();
      expect(bool).toBeTruthy();
    }

     getProductLocator(productName)
    {
    return  this.page.locator("h3:has-text('"+productName+"')");
    }

    async Checkout()
    {
        await this.checkout.click();
    }
    

}

module.exports= {CartPage};