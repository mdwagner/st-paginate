import React from 'react';
import angular from 'angular';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import AngularBootstrap from './helpers/AngularBootstrap';

angular.module('example', [])
  .component('stpaginate', {
    transclude: true,
    bindings: {
      onPageChange: '<?'
    },
    template: `
      <st-paginate
        id="examplePagination"
        page-range-displayed="4"
        margin-pages-displayed="4"
        container-class-name="pagination"
        active-class-name="active"
        page-count="25"
        ng-transclude></st-paginate>
    `,
    controllerAs: 'vm',
    controller() {
      this.el = document.getElementById('examplePagination');
      this.handler = this.onPageChange || ((evt) => {
        console.log('onPageChange', evt.detail.selected + 1);
      });

      this.$onInit = () => {
        this.el.addEventListener('onPageChange', this.handler);
      }
      this.$onDestroy = () => {
        this.el.removeEventListener('onPageChange', this.handler);
      }
    }
  });

storiesOf('st-paginate (angularjs)', module)
  .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  .add('example 1', () => (
    <AngularBootstrap
      moduleToBootstrap="example"
      template={`
        <stpaginate></stpaginate>
      `} />
  ));
