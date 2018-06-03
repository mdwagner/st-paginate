import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const noop = () => {};

class StPaginate extends React.Component {
  constructor(props) {
    super(props);
    this.handler = props.onPageChange || noop;
  }

  componentDidMount() {
    this.el.addEventListener('onPageChange', this.handler);
  }

  componentWillUnmount() {
    this.el.removeEventListener('onPageChange', this.handler);
  }

  render() {
    return (
      <st-paginate
        page-range-displayed={4}
        margin-pages-displayed={4}
        container-class-name="pagination"
        active-class-name="active"
        page-count={25}
        ref={(r) => { this.el = r; }}>
        {this.props.children}
      </st-paginate>
    );
  }
}

storiesOf('st-paginate (react)', module)
  .add('example 1', () => (
    <StPaginate onPageChange={(e) => action('onPageChange')(e.detail.selected + 1)} />
  ));
