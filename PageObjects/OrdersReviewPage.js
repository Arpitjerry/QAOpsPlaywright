const {test, expect} = require('@playwright/test');

class OrdersReviewPage
{
   constructor(page)
   {
    this.page = page;
    this.selectcountry = page.locator("[placeholder='Select Country']")
    this.emailLocator= page.locator(".user__name label")
    this.cardnumber = page.locator(".field .text-validated")
    this.month = page.locator("select").first()
    this.year = page.locator("select").last()
    this.cvv = page.locator(".field .txt").nth(1)
    this.name = page.locator(".field .txt").nth(2)
    this.coupon = page.locator("[name='coupon']")
    this.applycouponbutton=page.locator(".btn-primary")
    this.placeorder=page.locator(".action__submit ")
    this.SuccessMessage=page.locator(".hero-primary")
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")



   }

   async SelectCountry(countryName)

  {
    await this.selectcountry.pressSequentially(countryName,{delay : 150});
    const dropdown=this.page.locator(".ta-results")
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for ( let i=0; i<optionsCount ; i++)
    {
    const text=await  dropdown.locator("button").nth(i).textContent()
    if(text === " "+countryName)
    {
    await  dropdown.locator("button").nth(i).click();
    break;
    }
    }
  } 

   async VerifyEmail(email)
   {
    await expect(this.emailLocator).toHaveText(email)  

   }

   async FillCardDetails(CardNumber,Month,Year,CVV,Name)
   {
     await this.cardnumber.fill("")
     await this.cardnumber.fill(CardNumber)
     await this.month.selectOption(Month)
     await this.year.selectOption(Year)
     await this.cvv.fill(CVV)
     await this.name.fill(Name)
     
   }

   async ApplyCoupon(CouponCode)
   {
    await this.coupon.fill(CouponCode)
    await this.applycouponbutton.click()
   }
  
   async PlaceOrderAndGetOrderID()
   {
    await this.placeorder.click()
    await expect(this.SuccessMessage).toHaveText(" Thankyou for the order. ")
    return  await this.orderId.textContent();
   }




   }






module.exports = {OrdersReviewPage};