const excelJS=require('exceljs');
const {test, expect} = require('@playwright/test');
test('excel test',async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    const download=await downloadPromise
    const filePath = 'C:/Users/Admin/Downloads/download.xlsx';
    await download.saveAs(filePath);
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    let rowNumber = -1;
   let columnNumber = -1;

  worksheet.eachRow((row, rowNum) => {
  row.eachCell((cell, colNum) => {
    if (cell.value === 'Mango') {
      rowNumber = rowNum;
      columnNumber = colNum;
    }
  });
});
console.log(rowNumber,columnNumber);
const priceCell=worksheet.getCell(rowNumber,columnNumber+2)
priceCell.value=350;
await workbook.xlsx.writeFile(filePath);
await page.locator('#fileinput').setInputFiles(filePath);
const row = page.getByRole('row').filter({ has: page.getByText('Mango') });
await expect(row.locator('#cell-4-undefined')).toContainText('350');

})