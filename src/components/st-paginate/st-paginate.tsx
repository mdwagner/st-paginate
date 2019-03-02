import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch
} from '@stencil/core';
import { BreakView } from './break-view';
import { PageView } from './page-view';

@Component({
  tag: 'st-paginate',
  shadow: false,
  scoped: false
})
export class StPaginate {
  @Prop() pageCount: number = 10;
  @Prop() pageRangeDisplayed: number = 2;
  @Prop() marginPagesDisplayed: number = 3;
  @Prop() nextLabelText: string = 'Next';
  @Prop() previousLabelText: string = 'Previous';
  @Prop() breakLabelText: string = '...';
  @Prop() breakClassName: string = 'break';
  @Prop() nextLabelClassName: string = '';
  @Prop() previousLabelClassName: string = '';
  @Prop() initialPage: number;
  @Prop() forcePage: number;
  @Prop() disableInitialCallback: boolean = false;
  @Prop() containerClassName: string = '';
  @Prop() pageClassName: string = '';
  @Prop() pageLinkClassName: string = '';
  @Prop() activeClassName: string = 'selected';
  @Prop() previousClassName: string = 'previous';
  @Prop() nextClassName: string = 'next';
  @Prop() previousLinkClassName: string = '';
  @Prop() nextLinkClassName: string = '';
  @Prop() disabledClassName: string = 'disabled';
  @Prop() extraAriaContext: string = '';

  @Event() pageChange: EventEmitter;

  @State() state = {
    selected: this.initialPage || this.forcePage || 0
  };

  componentWillLoad() {
    if (typeof this.initialPage !== 'undefined' && !this.disableInitialCallback) {
      this.callCallback(this.initialPage);
    }
  }

  @Watch('forcePage')
  watchForcePage(newForcePage: number, oldForcePage: number) {
    if (typeof newForcePage !== 'undefined' && oldForcePage !== newForcePage) {
      this.state = {
        ...this.state,
        selected: newForcePage
      };
    }
  }

  handlePreviousPage = (evt: UIEvent) => {
    const { selected } = this.state;
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected > 0) {
      this.handlePageSelected(selected - 1, evt);
    }
  }

  handleNextPage = (evt: UIEvent) => {
    const { selected } = this.state;

    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected < this.pageCount - 1) {
      this.handlePageSelected(selected + 1, evt);
    }
  };

  handlePageSelected = (selected: number, evt: UIEvent) => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);

    if (this.state.selected === selected) return;

    this.state = {
      ...this.state,
      selected
    };

    // Call the callback with the new selected item:
    this.callCallback(selected);
  }

  callCallback = (selectedItem: number) => {
    this.pageChange.emit({ selected: selectedItem });
  }

  getPageElement(index: number) {
    const { selected } = this.state;

    return (
      <PageView
        onClick={this.handlePageSelected.bind(this, index)}
        selected={selected === index}
        pageClassName={this.pageClassName}
        pageLinkClassName={this.pageLinkClassName}
        activeClassName={this.activeClassName}
        extraAriaContext={this.extraAriaContext}
        page={index + 1}
      >
      </PageView>
    );
  }

  pagination = () => {
    const items = [];

    const { selected } = this.state;

    if (this.pageCount <= this.pageRangeDisplayed) {
      for(let index = 0; index < this.pageCount; index++) {
        items.push(this.getPageElement(index));
      }
    } else {
      let leftSide = (this.pageRangeDisplayed / 2);
      let rightSide = (this.pageRangeDisplayed - leftSide);

      if (selected > this.pageCount - this.pageRangeDisplayed / 2) {
        rightSide = this.pageCount - selected;
        leftSide = this.pageRangeDisplayed - rightSide;
      } else if (selected < this.pageRangeDisplayed / 2) {
        leftSide = selected;
        rightSide = this.pageRangeDisplayed - leftSide;
      }

      let page: number;
      let breakView: JSX.Element;
      const createPageView = (i: number) => this.getPageElement(i);

      for(let index = 0; index < this.pageCount; index++) {
        page = index + 1;

        if (page <= this.marginPagesDisplayed) {
          items.push(createPageView(index));
          continue;
        }

        if (page > this.pageCount - this.marginPagesDisplayed) {
          items.push(createPageView(index));
          continue;
        }

        if ((index >= selected - leftSide) && (index <= selected + rightSide)) {
          items.push(createPageView(index));
          continue;
        }

        if (this.breakLabelText && items[items.length - 1] !== breakView) {
          breakView = (
            <BreakView
              breakLabel={this.breakLabelText}
              breakClassName={this.breakClassName}
            >
            </BreakView>
          );
          items.push(breakView);
        }
      }
    }

    return items;
  }

  render() {
    const { selected } = this.state;

    const previousClasses = [
      this.previousClassName,
      selected === 0 ? this.disabledClassName : ''
    ].join(' ');

    const nextClasses = [
      this.nextClassName,
      selected === this.pageCount ? this.disabledClassName : ''
    ].join(' ');

    return (
      <ul class={this.containerClassName}>
        <li class={previousClasses}>
          <a onClick={this.handlePreviousPage}
            class={this.previousLinkClassName}
            tabIndex={0}
            onKeyPress={this.handlePreviousPage}>
            <span class={this.previousLabelClassName}>{this.previousLabelText}</span>
          </a>
        </li>

        {this.pagination()}

        <li class={nextClasses}>
          <a onClick={this.handleNextPage}
            class={this.nextLinkClassName}
            tabIndex={0}
            onKeyPress={this.handleNextPage}>
            <span class={this.nextLabelClassName}>{this.nextLabelText}</span>
          </a>
        </li>
      </ul>
    );
  }
}
