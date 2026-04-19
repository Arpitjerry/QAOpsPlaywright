const {test, expect} = require('@playwright/test');

test("Login to the applicaton & fetch titles", async({page})=>
{
const email = "AT01010@gmail.com"
//const products = await page.locator(".card-body")
const productName = 'ZARA COAT 3'
await page.goto("https://rahulshettyacademy.com/client")
await page.getByPlaceholder('email@example.com').fill("AT01010@gmail.com")
await page.getByPlaceholder('enter your passsword').fill("At@12345678")
await page.getByRole('button', {name: "Login"}).click()
await page.locator("[style='text-transform: uppercase;']").last().waitFor();
await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole('button',{name : 'Add To Cart'}).click();
console.log("Added to Cart")
await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
await page.locator("div li").first().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
await page.getByRole('button', {name : "Checkout"}).click()
await page.getByPlaceholder("Select Country").pressSequentially("Ind",{delay : 150});
await page.locator(".ta-results").filter({hasText : 'India'}).first().click();
await page.getByText("PLACE ORDER").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
const orderId1 =await orderId.replace(/[|\\s]/g, '');
console.log(orderId1)
await page.locator("text= Orders History Page ").click();
await page.locator("tbody").waitFor();
await page.locator("tbody tr").filter({hasText: orderId1}).getByRole('button', {name : "View"}).click();
await page.pause();

})