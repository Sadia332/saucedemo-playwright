const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../utils/test-data');

test('Complete purchase flow with sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Login
    await loginPage.navigate();
    await loginPage.login(
        testData.users.standard_user.username,
        testData.users.standard_user.password
    );

    // 2. Sort products (Low to High) and add first item
    await productsPage.sortProductsLowToHigh();
    await productsPage.addFirstItemToCart();
    await productsPage.goToCart();

    // 3. Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo(
        testData.checkoutInfo.firstName,
        testData.checkoutInfo.lastName,
        testData.checkoutInfo.postalCode
    );
    await checkoutPage.completePurchase();

    // 4. Verify success and return home
    await expect(checkoutPage.successMessage).toBeVisible();
    await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');

    // 5. Return home
    await checkoutPage.returnToHomePage();

    // 5. Verify we're back on the products page
    await expect(page).toHaveURL(/inventory.html/);
});