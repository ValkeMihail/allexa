const { chromium } = require('playwright');

describe('App', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  afterEach(async () => {
    await page.close();
  });

  it('should display the navbar and routes', async () => {
    // Check that the navbar is displayed
    const navbar = await page.$('#navbar');
    expect(navbar).toBeTruthy();

    // Check that the "About Me" route is displayed
    const aboutLink = await page.$('a[href="/about"]');
    expect(aboutLink).toBeTruthy();

    // Check that the "Work" route is displayed
    const workLink = await page.$('a[href="/work"]');
    expect(workLink).toBeTruthy();

    // Check that the "Contact" route is displayed
    const contactLink = await page.$('a[href="/contact"]');
    expect(contactLink).toBeTruthy();

    // Check that the "Admin" route is displayed
    const adminLink = await page.$('a[href="/admin"]');
    expect(adminLink).toBeTruthy();

    // Check that clicking the "About Me" link displays the AboutMe component
    await aboutLink.click();
    const aboutHeader = await page.$('#aboutmeheader');
    expect(aboutHeader).toBeTruthy();

    // Check that clicking the "Work" link displays the RandomImagesCarousel component
    await workLink.click();
    const carousel = await page.$('#carousel');
    expect(carousel).toBeTruthy();

    // Check that clicking the "Contact" link displays the ContactMe component
    await contactLink.click();
    const contactHeader = await page.$('#contactmeheader');
    expect(contactHeader).toBeTruthy();

    // Check that clicking the "Admin" link displays the Login component
    await adminLink.click();
    const emailInput = await page.$('input[type="email"]');
    expect(emailInput).toBeTruthy();
  });
});
