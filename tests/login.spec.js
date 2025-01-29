const { test, expect } = require('@playwright/test');

import logindata from "../testData/login/logindata.json" 

const username = "Admin";
const password = "admin123";

async function login(username, password ){

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator('input[name="username"]').fill(username)
  await page.locator("input[type='password']").fill(password)
  await page.locator("button[type='submit']").click()

  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  
}

test('Verify logo visible', async ({ page,browser }) => {

    await page.goto('/web/index.php/auth/login');
  
    
    await expect(page.locator("img[alt='company-branding']")).toBeVisible()
  });


  test('Verify login with valid credentials', async ({ page }) => {



   login()
  });


  test('Verify login with valid username and invalid password', async ({ page }) => {

     // Launch url
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
    // Enter username 
    await page.locator("input[name='username']").fill(username)
    //enter password 
    await page.locator("input[type='password']").fill("dfvbndfh")
    //click on login button 
    await page.locator("button[type='submit']").click()

    // verify error message
    await expect(page.getByText('Invalid credentials')).toBeVisible()
    
  });

  test('Verify login with INvalid username and valid password', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
    await page.locator("input[name='username']").fill(logindata.invalidusername)
    await page.locator("input[type='password']").fill(logindata.password)
    await page.locator("button[type='submit']").click()

    await expect(page.getByText('Invalid credentials')).toBeVisible()
    
  });

  test('Verify login with invalid username and invalid password', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
    await page.locator("input[name='username']").fill(logindata.invalidusername)
    await page.locator("input[type='password']").fill(logindata.invalidpassword)
    await page.locator("button[type='submit']").click()

    await expect(page.getByText('Invalid credentials')).toBeVisible()
    
  });


  // ctrl + /  - comment the selected lines 

  // ctrl + / - uncomment the selected lines 