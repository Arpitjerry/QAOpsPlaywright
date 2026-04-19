
import {test as baseTest} from '@playwright/test';

interface TestDataForOrder{
    username : string;
    password : string;
    productName : string;
};

export const customtest=baseTest.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder:
        {
        username : "AT01010@gmail.com",
        password : "At@12345678",
        productName :"ADIDAS ORIGINAL",
        }
    })