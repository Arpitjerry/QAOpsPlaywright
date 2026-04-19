

import {test, expect} from '@playwright/test'
import { POManager } from '../PageObjects_ts/POManager';
import { customtest } from '../utils_ts/test-base';
//const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')))
import dataset from '../utils_ts/placeorderTestData.json'




//test.describe.configure({mode:'parallel'})
for (const data of dataset)
{

test(`@Web Place Order for ${data.productName}`, async({page})=>
{

const poManager = new POManager(page);
const loginPage= poManager.getLoginPage();
await loginPage.goTo();
await loginPage.ValidLogin(data.username,data.password);

const dashboardPage= poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(data.productName)
await dashboardPage.goToCart();

const cartPage = poManager.getCartPage();
await cartPage.VerifyProductIsDisplayed(data.productName);
await cartPage.Checkout();

const ordersReviewPage = poManager.getOrdersReviewPage();
await ordersReviewPage.SelectCountry("India");
await ordersReviewPage.VerifyEmail(data.username);
await ordersReviewPage.FillCardDetails(data.CardNumber,data.Month,data.Year,data.CVV,data.Name)
await ordersReviewPage.ApplyCoupon(data.CouponCode)
let orderId : any
orderId=await ordersReviewPage.PlaceOrderAndGetOrderID()
console.log(orderId);
await dashboardPage.navigateToOrders();
const ordersHistoryPage = poManager.getOrdersHistoryPage();
await ordersHistoryPage.searchOrderAndSelect(orderId);
expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

}
)
}