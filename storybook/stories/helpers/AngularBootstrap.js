import React, { Component } from 'react';
import PropTypes from 'prop-types';
import angular from 'angular';

class AngularBootstrap extends Component {
  componentDidMount() {
    const { moduleToBootstrap } = this.props;
    this.$rootScope = angular.injector(['ng', moduleToBootstrap]).get('$rootScope');
    angular.bootstrap(this.instance, [moduleToBootstrap]);
  }

  componentWillUnmount() {
    this.$rootScope.$destroy();
  }

  render() {
    const { template, ngController: ctrl } = this.props;
    return (
      <div
        {...(ctrl ? { 'ng-controller': ctrl } : {})}
        ref={(r) => {this.instance = r}}
        dangerouslySetInnerHTML={{ __html: template }} />
    );
  }
}

AngularBootstrap.propTypes = {
  ngController: PropTypes.string,
  template: PropTypes.string.isRequired,
  moduleToBootstrap: PropTypes.string.isRequired
};

export default AngularBootstrap;

