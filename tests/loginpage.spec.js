const { test, expect } = require('@playwright/test');

var employee = "Raju"

test(`Verify logo, title, url visibility - ${employee}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await expect(page).toHaveTitle("OrangeHRM");

    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page.locator('img[alt="company-branding"]')).toBeVisible()


});


test('Verify login with valid credentials', async ({ page, browserName}) => {



    if( browserName === "Google Chrome") {
  
    const creds = ["Admin", "admin123"]
    
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator('input[name="username"]').fill(creds[0])
    await page.locator('input[name="password"]').fill(creds[1])
    await page.locator('button[type="submit"]').click()
    const pageUrl = await page.url()
    console.log(pageUrl)
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    page.close()


    }
    
});

test('Verify login with valid username and Invalid password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator('input[name="username"]').fill("Admin")
    await page.locator('input[name="password"]').fill("dfgf")
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    page.close()

});

test('Verify login with invalid username and valid password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator('input[name="username"]').fill("Admbdfkmmin")
    await page.locator('input[name="password"]').fill("admin123")
    await page.locator("button[type='submit']").click()
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    page.close()

});

test('Verify login with invalid username and invalid password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator('input[name="username"]').fill("dffd")
    await page.locator('input[name="password"]').fill("adminfdf123")
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    page.close()

});



test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/index.html');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByText('Products').click();
  await expect(page.getByText('Products')).toBeVisible();
});
