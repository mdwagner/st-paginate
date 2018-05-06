import { TestWindow } from '@stencil/core/testing';
import { StPaginate } from './st-paginate';

describe('st-paginate', () => {
  it('should build', () => {
    expect(new StPaginate()).toBeTruthy();
  });

  describe('rendering', () => {
    let testWindow: any;
    let element: StPaginate & HTMLElement;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [StPaginate],
        html: '<st-paginate></st-paginate>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent.trim()).toEqual('Previous123...8910Next');
    });

    it('should work with a page count of 30', () => {
      element.pageCount = 30;
      testWindow.flush();
      expect(element.textContent.trim()).toEqual('Previous123...282930Next');
    });

    it('should work in a complex scenario', () => {
      element.pageRangeDisplayed = 4;
      element.marginPagesDisplayed = 4;
      element.pageCount = 20;
      testWindow.flush();
      expect(element.textContent.trim()).toEqual('Previous12345...17181920Next');
    });

    it("should broadcast an event for what page it's on", () => {
      let currentPage = null;
      element.addEventListener('pageChange', (e: any) => {
        currentPage = e.detail.selected + 1;
      });
      testWindow.document.querySelector('[aria-label="Page 3"]').click();
      testWindow.flush();
      expect(currentPage).toEqual(3);
    });

    it('should allow custom label names for previous, next, and break buttons', () => {
      element.nextLabelText = 'After';
      element.previousLabelText = 'Before';
      element.breakLabelText = 'middle';
      testWindow.flush();
      expect(element.textContent.trim()).toEqual('Before123middle8910After');
    });
  });
});
