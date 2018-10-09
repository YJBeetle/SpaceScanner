import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import WebFontLoader from 'webfontloader';

import './index.css';
import App from './App';
import Home from './Home';
import DuStart from './DuStart';
import Du from './Du';

import registerServiceWorker from './registerServiceWorker';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} title="Welcome" />
      <Route path="/dustart" component={DuStart} title="Start" />
      <Route path="/du/:duId*" component={Du} title="Disk usage" />
    </Route>
  </Router>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
