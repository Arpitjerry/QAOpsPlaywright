const base= require('@playwright/test');

exports.customtest=base.test.extend(
    {
        testDataForOrder:
        {
        username : "AT01010@gmail.com",
        password : "At@12345678",
        productName :"ADIDAS ORIGINAL",
        }
    })