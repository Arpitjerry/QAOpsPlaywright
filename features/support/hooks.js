const playwright = require ('@playwright/test')
const { POManager } = require('../../PageObjects/POManager');
const {Before, After, AfterStep, BeforeStep, Status} = require('@cucumber/cucumber')

Before (async function (){

const browser = await playwright.chromium.launch({headless:false});
const context = await browser.newContext();
this.page = await context.newPage();
this.poManager = new POManager(this.page);


});

BeforeStep(async function(){
// this will be executed before every step (i.e every given when then)
});

AfterStep(async function({result})
{

    if (result.status===Status.FAILED)
    {
        await this.page.screenshot({path : 'screenshot1.png'})
    }
})

After (async function()
{

    console.log("I am last to execute")

})