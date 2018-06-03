import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/angularjs-example.js');
  require('../stories/react-example.js');
}

configure(loadStories, module);
