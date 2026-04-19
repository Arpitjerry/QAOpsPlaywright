const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../PageObjects/POManager');
const { expect} = require('@playwright/test');
const playwright = require ('@playwright/test')



Given('a login to Ecommerce application with {string} and {string}',{timeout : 100*1000}, async function (username, password) {
// Write code here that turns the phrase above into concrete actions

const loginPage= this.poManager.getLoginPage();
await loginPage.goTo();
await loginPage.ValidLogin(username,password);


});

When('Add {string} to cart', async function (productName) {
// Write code here that turns the phrase above into concrete actions
this.dashboardPage= this.poManager.getDashboardPage();
await this.dashboardPage.searchProductAddCart(productName)
await this.dashboardPage.goToCart();


});

Then('Verify {string} is displayed in the Cart', async function (productName) {
// Write code here that turns the phrase above into concrete actions
const cartPage = this.poManager.getCartPage();
await cartPage.VerifyProductIsDisplayed(productName);
await cartPage.Checkout();

});

When('Enter valid details and Place the Order', async function () {
// Write code here that turns the phrase above into concrete actions
const ordersReviewPage = this.poManager.getOrdersReviewPage();
await ordersReviewPage.SelectCountry("India");
//await ordersReviewPage.VerifyEmail(username);
//await ordersReviewPage.FillCardDetails(CardNumber,data.Month,data.Year,data.CVV,data.Name)
//await ordersReviewPage.ApplyCoupon(data.CouponCode)
this.orderId=await ordersReviewPage.PlaceOrderAndGetOrderID()
console.log(this.orderId);
await this.dashboardPage.navigateToOrders();

});

Then('Verify order is present in the OrderHistory', async function () {
// Write code here that turns the phrase above into concrete actions
await this.dashboardPage.navigateToOrders();
const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
await ordersHistoryPage.searchOrderAndSelect(this.orderId);
expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, Password) {
 const userName = this.page.locator('#username')
 const signIn = this.page.locator('#signInBtn')
 const password = this.page.locator("[type='password']")
 await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
 console.log(await this.page.title())
 await userName.fill(username)
 await password.fill(Password)
 await signIn.click();


});

Then('Verify Error message is displayed', async function () {

 console.log(await this.page.locator("[style*='block']").textContent());
 await expect(this.page.locator("[style*='block']")).toContainText("Incorrect")

});