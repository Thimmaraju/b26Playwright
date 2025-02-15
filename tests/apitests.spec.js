import { expect, test } from "@playwright/test";
import fs from 'fs';


test.only('Get API', async ({ request }) => {

    const getAllUsers = await request.get(`https://reqres.in/api/users?page=2`);
    expect(getAllUsers.ok()).toBeTruthy();
    expect(getAllUsers.status()).toBe(200);
  
    console.log(await getAllUsers.json())

    const response = await getAllUsers.json()

    expect(response.page).toBe(2)
    expect(response).toHaveProperty('total_pages');

    expect(response.data[0].email).toBe("michael.lawson@reqres.in")



});


test('POST API', async ({ request }) => {

    const createUser = await request.post(`https://reqres.in/api/users`, {
        data: {
            "name": "raju",
            "job": "trainer"
        }
      });
    expect(createUser.ok()).toBeTruthy();
    expect(createUser.status()).toBe(201);
  
    console.log(await createUser.json())

    const response = await createUser.json()

    expect(response.name).toBe("raju")
    expect(response.job).toBe("trainer")

    console.log(response.id)
   
});


test('PUT API', async ({ request }) => {

    const updateuser = await request.put(`https://reqres.in/api/users/2`, {
        data: {
            "name": "raju",
            "job": "trainer"
        }
      });
    expect(updateuser.ok()).toBeTruthy();
    expect(updateuser.status()).toBe(200);
    console.log(await updateuser.json())

    const response = await updateuser.json()

    expect(response.name).toBe("raju")
    expect(response.job).toBe("trainer")

    console.log(response.updatedAt)
   
});

test('DELETE API', async ({ request }) => {

    const deleteuser = await request.delete(`https://reqres.in/api/users/2`);
    expect(deleteuser.ok()).toBeTruthy();
    expect(deleteuser.status()).toBe(204);

});

//Real time project APIS 


test('Playwright Test Case - Understanding GET Method', async ({ request }) => {
  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC';

  const headers = {
    "Cookie": "orangehrm=cc74ccd83ef22913ca6644a959afd0b1",
    "Host": "opensource-demo.orangehrmlive.com",
    "Referer": "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"
  };

  const response = await request.get(url, { headers });
  
  // Verify status code
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Log the response body to the console
  console.log(responseBody);

  // Write the response body to a file
  fs.writeFileSync("apiresponses/getres.txt", JSON.stringify(responseBody, null, 2));
});


test.only('Playwright Test Case - Understanding DELETE Method', async ({ request }) => {
  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees';

  const headers = {
    "Cookie": "orangehrm=9acb1f811e1f35d72774fd54ba66c8ed",
    "Host": "opensource-demo.orangehrmlive.com",
    "Referer": "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"
  };

  // Define the payload for the DELETE request
  const payload = { "ids": [18] };

  // Send the DELETE request with headers and the payload
  const response = await request.delete(url, { headers, data: payload });

  // Assert that the response status is 200
  expect(response.status()).toBe(200);

  // Parse the response body as JSON
  const responseBody = await response.json();

  // Log the response body to the console
  console.log(responseBody);

});
