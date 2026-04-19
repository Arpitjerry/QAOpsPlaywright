const {test, expect} = require('@playwright/test');

test("Browser context playwright test", async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.udemy.com/")
});

test("Page Playwright test", async({page})=>
{
 const userName = page.locator('#username')
 const signIn = page.locator('#signInBtn')
 const password = page.locator("[type='password']")
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
 console.log(await page.title())
 await userName.fill("Learning")
 await password.fill("learning")
 await signIn.click();
 console.log(await page.locator("[style*='block']").textContent());
 await expect(page.locator("[style*='block']")).toContainText("Incorrect")

 await userName.fill("");
 await userName.fill("rahulshettyacademy")
 await signIn.click();

 console.log(await page.locator(".card-body a").first().textContent());
 console.log(await page.locator(".card-body a").nth(0).textContent());
}
)

test("UI Controls", async({page})=>
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
const userName = page.locator('#username')
const signIn = page.locator('#signInBtn')
const password = page.locator("[type='password']")
const dropdown = page.locator("select.form-control")
const documentsLink = page.locator("[href*='documents-request']")
await dropdown.selectOption("consult")
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
console.log(await page.locator(".radiotextsty").last().isChecked())
await expect (page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect (page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect( await page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentsLink).toHaveAttribute('class','blinkingText');


}
)

test("Child windows handle", async({browser})=>
{

    const Context = await browser.newContext();
    const page = await Context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all
    (
        [
          Context.newPage('page'),
          documentLink.click()
        ]
    )

    const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());


}
)
