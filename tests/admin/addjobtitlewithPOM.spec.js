const { test, expect } = require('@playwright/test');

import { addJobtitlPage } from "../../pageObjects/admin/addjobtitlepage.po";
import { loginPage } from "../../pageObjects/loginPage.po"

import data from "../../testData/login/logindata.json"


test.describe('Verify Job title functionalities', () => {

    let login;
    let jobtitle

    test.beforeEach(async ({ page }) => {
        login = new loginPage(page);
        jobtitle = new addJobtitlPage(page)
        await login.launchUrl()
    });

    test('Verify User can create job title', async () => {

        await login.loginwithCreds(data.username, data.password)
        await login.loginsuccess()
        await jobtitle.gotoaddjobTilePage()
        await jobtitle.navigatedToJobtitlePAge()
        await jobtitle.filljobTitle("CEO", "Managing company", "no notes")
        await jobtitle.viewjobList()
    });


    
    test('Verify User get error message for Jobtitle', async () => {

        await login.loginwithCreds(data.username, data.password)
        await login.loginsuccess()
        await jobtitle.gotoaddjobTilePage()
        await jobtitle.navigatedToJobtitlePAge()
        await jobtitle.clickonSave()
        await jobtitle.errorMessagevisible()
    });

})