const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage')
const {DashboardPage} = require('../PageObjects/DashboardPage')
const {CartPage} = require('../PageObjects/CartPage')
const {OrdersReviewPage} = require('../PageObjects/OrdersReviewPage');
const { POManager } = require('../PageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')))

//test.describe.configure({mode:'parallel'})
for (const data of dataset)
{

test(`@Web Place Order for ${data.productName}`, async({page})=>
{

const poManager = new POManager(page);
const loginPage= poManager.getLoginPage(page);
await loginPage.goTo();
await loginPage.ValidLogin(data.username,data.password);

const dashboardPage= poManager.getDashboardPage(page);
await dashboardPage.searchProductAddCart(data.productName)
await dashboardPage.goToCart();

const cartPage = poManager.getCartPage(page);
await cartPage.VerifyProductIsDisplayed(data.productName);
await cartPage.Checkout();

const ordersReviewPage = poManager.getOrdersReviewPage(page);
await ordersReviewPage.SelectCountry("India");
await ordersReviewPage.VerifyEmail(data.username);
await ordersReviewPage.FillCardDetails(data.CardNumber,data.Month,data.Year,data.CVV,data.Name)
await ordersReviewPage.ApplyCoupon(data.CouponCode)
const orderId=await ordersReviewPage.PlaceOrderAndGetOrderID()
console.log(orderId);
await dashboardPage.navigateToOrders();
const ordersHistoryPage = poManager.getOrdersHistoryPage();
await ordersHistoryPage.searchOrderAndSelect(orderId);
expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

}
)
}