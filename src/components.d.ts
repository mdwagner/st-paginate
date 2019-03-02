/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface StPaginate {
    'activeClassName': string;
    'breakClassName': string;
    'breakLabelText': string;
    'containerClassName': string;
    'disableInitialCallback': boolean;
    'disabledClassName': string;
    'extraAriaContext': string;
    'forcePage': number;
    'initialPage': number;
    'marginPagesDisplayed': number;
    'nextClassName': string;
    'nextLabelClassName': string;
    'nextLabelText': string;
    'nextLinkClassName': string;
    'pageClassName': string;
    'pageCount': number;
    'pageLinkClassName': string;
    'pageRangeDisplayed': number;
    'previousClassName': string;
    'previousLabelClassName': string;
    'previousLabelText': string;
    'previousLinkClassName': string;
  }
  interface StPaginateAttributes extends StencilHTMLAttributes {
    'activeClassName'?: string;
    'breakClassName'?: string;
    'breakLabelText'?: string;
    'containerClassName'?: string;
    'disableInitialCallback'?: boolean;
    'disabledClassName'?: string;
    'extraAriaContext'?: string;
    'forcePage'?: number;
    'initialPage'?: number;
    'marginPagesDisplayed'?: number;
    'nextClassName'?: string;
    'nextLabelClassName'?: string;
    'nextLabelText'?: string;
    'nextLinkClassName'?: string;
    'onPageChange'?: (event: CustomEvent) => void;
    'pageClassName'?: string;
    'pageCount'?: number;
    'pageLinkClassName'?: string;
    'pageRangeDisplayed'?: number;
    'previousClassName'?: string;
    'previousLabelClassName'?: string;
    'previousLabelText'?: string;
    'previousLinkClassName'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'StPaginate': Components.StPaginate;
  }

  interface StencilIntrinsicElements {
    'st-paginate': Components.StPaginateAttributes;
  }


  interface HTMLStPaginateElement extends Components.StPaginate, HTMLStencilElement {}
  var HTMLStPaginateElement: {
    prototype: HTMLStPaginateElement;
    new (): HTMLStPaginateElement;
  };

  interface HTMLElementTagNameMap {
    'st-paginate': HTMLStPaginateElement
  }

  interface ElementTagNameMap {
    'st-paginate': HTMLStPaginateElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
