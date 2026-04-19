const {test, expect, request} = require('@playwright/test');
const payLoad= {userEmail: "AT01010@gmail.com",userPassword: "At@12345678"}
let token;
test.beforeAll( async ()=> 
{
    const apiContext = await request.newContext();
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
       { 
        data : payLoad
       }
    )

expect(loginResponse.ok()).toBeTruthy();
const loginResponseJson= await loginResponse.json();
 token=loginResponseJson.token;
console.log(token);


});

test("Login to the applicaton & fetch titles", async({page})=>
{
  await page.addInitScript(value =>{
    window.localStorage.setItem('token',value);

  }, token );

  await page.goto("https://rahulshettyacademy.com/client/")
 // await page.pause();

// await page.goto("https://rahulshettyacademy.com/client")
// await page.locator('#userEmail').fill("AT01010@gmail.com")
// await page.locator('#userPassword').fill("At@12345678")
// await page.locator('#login').click();
// await page.locator("[style='text-transform: uppercase;']").last().waitFor();

const email = "AT01010@gmail.com"
const products = await page.locator(".card-body")
const productName = 'ZARA COAT 3'
const titles = await page.locator("[style='text-transform: uppercase;']").allTextContents();
console.log(titles);
const count = await products.count();
for ( let i=0; i<count ; i++)
{
   if (await products.nth(i).locator("b").textContent() === productName)

    {
    await products.nth(i).locator("text= Add To Cart").click();
    console.log("Added to Cart")
    break;

    }
}
await page.pause();
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder='Select Country']").pressSequentially("Ind",{delay : 150});
const dropdown=page.locator(".ta-results")
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for ( let i=0; i<optionsCount ; i++)
{
   const text=await  dropdown.locator("button").nth(i).textContent()
   if(text === " India")
   {
   await  dropdown.locator("button").nth(i).click();
   break;
   }
}
await page.locator(".field .text-validated").fill("")
await page.locator(".field .text-validated").fill("4444444444")
const month = page.locator("select").first();
await month.selectOption("09");
const date= page.locator("select").last();
await date.selectOption("30");
//await page.locator(".title [type='text']").fill("000")
await page.locator(".field .txt").nth(1).fill("000")
await page.locator(".field .txt").nth(2).fill("Arpit Jain")
await page.locator("[name='coupon']").fill("Playwright")
//await page.locator(".action__submit").click()
await expect(page.locator(".user__name label")).toHaveText(email)
//await expect(page.locator(".user__name .ng-valid")).toHaveText(email)
await page.locator(".action__submit ").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId)
await page.locator("text= Orders History Page ").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

await page.pause();
}
)