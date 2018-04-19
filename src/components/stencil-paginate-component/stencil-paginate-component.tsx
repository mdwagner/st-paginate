import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
  Listen
} from '@stencil/core';

type Noop = (...args) => any;
const noop: Noop = () => {};

@Component({
  tag: 'break-view',
  scoped: false,
  shadow: false
})
export class BreakView {
  @Prop() label: string;
  @Prop() breakClassName: string = 'break';

  render() {
    return (
      <li class={this.breakClassName}>
        {this.label || <slot name="breakLabel" />}
      </li>
    );
  }
}

@Component({
  tag: 'page-view',
  scoped: false,
  shadow: false
})
export class PageView {
  @Prop() pageClassName: string;
  @Prop() pageLinkClassName: string;
  @Prop() href: string;
  @Prop() page: number;
  @Prop() extraAriaContext: string;
  @Prop() selected: boolean;
  @Prop() activeClassName: string;

  @Event() onClick: EventEmitter;

  render() {
    let cssClassName = this.pageClassName;
    let ariaLabel = `Page ${this.page}${this.extraAriaContext ? ' ' + this.extraAriaContext : ''}`;
    let ariaCurrent = null;

    if (this.selected) {
      ariaCurrent = 'page';
      ariaLabel = `Page ${this.page} is your current page`;
      if (typeof cssClassName !== 'undefined') {
        cssClassName += ` ${this.activeClassName}`;
      } else {
        cssClassName = this.activeClassName;
      }
    }

    console.log('page', this.page);
    return (
      <li class={cssClassName}>
        <a onClick={(e) => this.onClick.emit(e)}
          class={this.pageLinkClassName}
          href={this.href}
          tabIndex={0}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          onKeyPress={(e) => this.onClick.emit(e)}>
          <slot name="page" />
        </a>
      </li>
    );
  }
}

@Component({
  tag: 'pagination-box-view',
  shadow: false,
  scoped: false
})
export class PaginationBoxView {
  @Prop() pageCount: number = 10;
  @Prop() pageRangeDisplayed: number = 2;
  @Prop() marginPagesDisplayed: number = 3;
  @Prop() showDefaultPreviousLabel: boolean = true;
  @Prop() showDefaultNextLabel: boolean = true;
  @Prop() showDefaultBreakLabel: boolean = true;
  @Prop() initialPage: number;
  @Prop() forcePage: number;
  @Prop() disableInitialCallback: boolean = false;
  @Prop() containerClassName: string;
  @Prop() pageClassName: string = '';
  @Prop() pageLinkClassName: string;
  @Prop() activeClassName: string = 'selected';
  @Prop() previousClassName: string = 'previous';
  @Prop() nextClassName: string = 'next';
  @Prop() previousLinkClassName: string;
  @Prop() nextLinkClassName: string;
  @Prop() disabledClassName: string = 'disabled';
  @Prop() breakClassName: string = '';
  @Prop() extraAriaContext: string;

  @Event() onPageChange: EventEmitter;

  @State() state = {
    selected: this.initialPage || this.forcePage || 0,
    hrefBuilder: noop
  };

  @Listen('hrefBuilder')
  hrefBuilderHandler(event: CustomEvent) {
    this.state = {
      ...this.state,
      hrefBuilder: event.detail as Noop
    };
  }

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

  handlePreviousPage = evt => {
    const { selected } = this.state;
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected > 0) {
      this.handlePageSelected(selected - 1, evt);
    }
  }

  handleNextPage = evt => {
    const { selected } = this.state;

    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected < this.pageCount - 1) {
      this.handlePageSelected(selected + 1, evt);
    }
  };

  handlePageSelected = (selected, evt) => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);

    if (this.state.selected === selected) return;

    this.state = {
      ...this.state,
      selected
    };

    // Call the callback with the new selected item:
    this.callCallback(selected);
  }

  hrefBuilder(pageIndex) {
    if (this.state.hrefBuilder &&
      pageIndex !== this.state.selected &&
      pageIndex >= 0 &&
      pageIndex < this.pageCount
    ) {
      return this.state.hrefBuilder(pageIndex + 1);
    }
  }

  callCallback = (selectedItem) => {
    this.onPageChange.emit({ selected: selectedItem });
  }

  getPageElement(index) {
    const { selected } = this.state;

    return (
      <page-view
        key={index}
        onClick={(e) => this.handlePageSelected(index, e)}
        selected={selected === index}
        pageClassName={this.pageLinkClassName}
        activeClassName={this.activeClassName}
        extraAriaContext={this.extraAriaContext}
        href={this.hrefBuilder(index)}
        page={index + 1}>
        <span slot="page">{index + 1}</span>
      </page-view>
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

      let page;
      let breakView;
      const createPageView = (i) => this.getPageElement(i);

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

        if (this.showDefaultBreakLabel && items[items.length - 1] !== breakView) {
          breakView = (
            <break-view
              key={index}
              breakClassName={this.breakClassName}>
              {this.showDefaultBreakLabel ?
                <span slot="breakLabel">...</span>
                :
                <slot name="breakLabel" />}
            </break-view>
          );
          items.push(breakView);
        }
      }
    }

    return items;
  }

  render() {
    const { selected } = this.state;

    const previousClasses = this.previousClassName + (selected === 0 ? ` ${this.disabledClassName}` : '');
    const nextClasses = this.nextClassName + (selected === this.pageCount - 1 ? ` ${this.disabledClassName}`: '');

    return (
      <ul class={this.containerClassName}>
        <li class={previousClasses}>
          <a onClick={(e) => this.handlePreviousPage(e)}
            class={this.previousLinkClassName}
            href={this.hrefBuilder(selected - 1)}
            tabIndex={0}
            onKeyPress={(e) => this.handlePreviousPage(e)}>
            {this.showDefaultPreviousLabel ?
              <span slot="previousLabel">Previous</span>
              :
              <slot name="previousLabel" />}
          </a>
        </li>

        {this.pagination()}

        <li class={nextClasses}>
          <a onClick={(e) => this.handleNextPage(e)}
            class={this.nextLinkClassName}
            href={this.hrefBuilder(selected + 1)}
            tabIndex={0}
            onKeyPress={(e) => this.handleNextPage(e)}>
            {this.showDefaultNextLabel ?
              <span slot="nextLabel">Next</span>
              :
              <slot name="nextLabel" />}
          </a>
        </li>
      </ul>
    );
  }
}
