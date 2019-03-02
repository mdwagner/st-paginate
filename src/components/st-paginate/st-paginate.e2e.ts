import { newE2EPage, E2EPage } from '@stencil/core/testing';

describe('st-paginate', () => {
  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent('<st-paginate></st-paginate>');
    const element = await page.find('st-paginate');

    expect(element.textContent.trim()).toBe('Previous123...8910Next');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with a page count of 30', async () => {
    await page.setContent(`
      <st-paginate
        page-count="30"
      ></st-paginate>
    `);
    const element = await page.find('st-paginate');

    expect(element.textContent.trim()).toBe('Previous123...282930Next');
  });

  it('renders in a complex scenario', async () => {
    await page.setContent(`
      <st-paginate
        page-range-displayed="4"
        margin-pages-displayed="4"
        page-count="20"
      ></st-paginate>
    `);
    const element = await page.find('st-paginate');

    expect(element.textContent.trim()).toBe('Previous12345...17181920Next');
  });

  it('renders with custom label names for previous, next, and break buttons', async () => {
    await page.setContent(`
      <st-paginate
        next-label-text="After"
        previous-label-text="Before"
        break-label-text="middle"
      ></st-paginate>
    `);
    const element = await page.find('st-paginate');

    expect(element.textContent.trim()).toBe('Before123middle8910After');
  });

  it('broadcasts an event for what page it is on', async () => {
    await page.setContent('<st-paginate></st-paginate>');
    const element = await page.find('st-paginate');

    const spy = await element.spyOnEvent('pageChange');

    const page3Element = await element.find('[aria-label="Page 3"]');
    await page3Element.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
    expect(spy).toHaveReceivedEventDetail({ selected: 2 });
  });
});
