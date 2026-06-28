import { expect, test } from "@playwright/test";

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });

test("get started link", async ({ page }) => {
  await page.goto("https://chat.positive-intentions.com");

  // find input with checkbox and click it
  await page.click("input[type=checkbox]");

  // find button with text "connect" and click it
  await page.click("button:has-text('Connect')");

  // expect there to be the text "connect to peer" on the page
  await expect(page).toHaveText("Connect to a peer");
});
