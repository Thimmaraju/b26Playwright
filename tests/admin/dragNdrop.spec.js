const { test, expect } = require('@playwright/test');

test.describe('Automation - Working With Drag and Drop', () => {
  
  test('Playwright Test Case - Understanding Drag and Drop', async ({ page }) => {
    
    // Go to the page
    await page.goto('https://kitchen.applitools.com/ingredients/drag-and-drop');

    const sourceFriedChicken = await page.locator('#menu-fried-chicken');
    const sourceHamburger = await page.locator('#menu-hamburger');
    const sourceIceCream = await page.locator('#menu-ice-cream');

    const targetPlateItems = await page.locator('#plate-items');

    sourceFriedChicken.dragTo(targetPlateItems);
    sourceHamburger.dragTo(targetPlateItems);
    sourceIceCream.dragTo(targetPlateItems);
    await page.waitForTimeout(5000)

  })

})