const {test, expect} = require('@playwright/test')

test("Popups Validation", async({page})=>
{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
//  await page.goto("https://www.google.com/")
//  await page.goBack();
//  await page.goForward();
 await expect (page.locator("#displayed-text")).toBeVisible()
 await page.locator("#hide-textbox").click()
 await expect (page.locator("#displayed-text")).toBeHidden()
 //await page.pause();
 page.on('dialog',dialog => dialog.accept() );
 await page.locator("#confirmbtn").click();
 await page.locator("#mousehover").hover();
 const framespage = page.frameLocator('#courses-iframe');
 await framespage.locator("li a[href*='lifetime-access']:visible").click();
 const textCheck = await framespage.locator(".text h2").textContent();
 console.log(textCheck.split(" ")[1]);

})

test("Screenshot", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'Partial.png'})
    
})

test(" Visual Comparison", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot('Landing.png')
    await page.locator('#displayed-text').screenshot({path:'Partial.png'})
    
})