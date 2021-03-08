import ReactDOM from 'react-dom';
import React, { ReactElement } from 'react';
import { hot } from 'react-hot-loader/root';

import Example from './react/Example';

const Layouts: () => ReactElement = (): ReactElement => {
  return <Example />;
};

const rootEl = document.getElementById('app');
rootEl ? ReactDOM.render(<Layouts />, rootEl) : null;

hot(Layouts);
