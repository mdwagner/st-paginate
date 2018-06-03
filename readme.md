[![npm version](https://badge.fury.io/js/st-paginate.svg)](https://badge.fury.io/js/st-paginate)
[![CircleCI](https://circleci.com/gh/mdwagner/st-paginate/tree/master.svg?style=svg)](https://circleci.com/gh/mdwagner/st-paginate/tree/master)
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# st-paginate

A _standard web component_ port of [_AdeleD's_ ReactPaginate](https://github.com/AdeleD/react-paginate).

## Props

Each prop name has a corresponding tag name in `kabab-case`.

| Name                      | Type          | Default  | Description                                                                                            |
| ---                       | ---           | ---      | ---                                                                                                    |
| `pageCount`               | `number`      | 10       | The total number of pages.                                                                             |
| `pageRangeDisplayed`      | `number`      | 2        | The range of pages displayed.                                                                          |
| `marginPagesDisplayed`    | `number`      | 3        | The number of pages to display for margins.                                                            |
| `nextLabelText`           | `string`      | Next     | The label text for the `next` button.                                                                  |
| `previousLabelText`       | `string`      | Previous | The label text for the `previous` button.                                                              |
| `breakLabelText`          | `string`      | ...      | The label text for the ellipsis.                                                                       |
| `breakClassName`          | `string`      | break    | The classname on the `li` tag of the ellipsis element.                                                 |
| `nextLabelClassName`      | `string`      |          | The classname on the `span` tag of the `next` text.                                                    |
| `previousLabelClassName`  | `string`      |          | The classname on the `li` tag of the `previous` text.                                                  |
| `pageChange`              | `CustomEvent` |          | The event that gets fired when a page is clicked. Event => detail => selected. Zero-based page number. |
| `initialPage`             | `number`      |          | The initial page selected.                                                                             |
| `forcePage`               | `number`      |          | To override selected page with parent prop.                                                            |
| `disableInitialCallback`  | `boolean`     | false    | Disable `pageChange` event with initial page.                                                          |
| `containerClassName`      | `string`      |          | The classname of the pagination container.                                                             |
| `pageClassName`           | `string`      |          | The classname on the `li` tag of each page element.                                                    |
| `pageLinkClassName`       | `string`      |          | The classname on the `a` tag of each page element.                                                     |
| `activeClassName`         | `string`      | selected | The classname for the active page.                                                                     |
| `previousClassName`       | `string`      | previous | The classname on the `li` tag of the `previous` button.                                                |
| `nextClassName`           | `string`      | next     | The classname on the `li` tag of the `next` button.                                                    |
| `previousLinkClassName`   | `string`      |          | The classname on the `a` tag of the `previous` button.                                                 |
| `nextLinkClassName`       | `string`      |          | The classname on the `a` tag of the `next` button.                                                     |
| `disabledClassName`       | `string`      | disabled | The classname for disabled `previous` and `next` button.                                               |
| `extraAriaContext`        | `string`      |          | Extra context to add to the `aria-label` HTML attribute.                                               |

## Usage

### HTML

```html
<st-paginate
  page-range-displayed="4"
  margin-pages-displayed="4"
  container-class-name="pagination"
  active-class-name="active"
  previous-label-text="Previous Label"
  next-label-text="Next Label"
  break-label-text=".*."
  id="pagination-comp"
  page-count="20"></st-paginate>
```

### JavaScript

```js
document
  .getElementById('pagination-comp')
  .addEventListener('pageChange', function (e) {
    console.log(e.detail.selected + 1); // see `pageChange` above for more information
  });
```

## Examples

Check out the GitHub pages link for ReactJS and AngularJS examples.

## Why?

I wanted to see if I could take a ReactJS component package and re-create it as Standard Web Component using Stencil, this is the result of that idea. I had used _ReactPaginate_ recently on a ReactJS project and thought it would be a good candidate. Nothing more, nothing less.

## Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Using this component

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/st-paginate@0.0.2/dist/stpaginate.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install st-paginate --save`
- Put a script tag similar to this `<script src='node_modules/st-paginate/dist/stpaginate.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install st-paginate --save`
- Add `{ name: 'st-paginate' }` to your [collections](https://github.com/ionic-team/stencil-starter/blob/master/stencil.config.js#L5)
- Then you can use the element anywhere in your template, JSX, html etc
