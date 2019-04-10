import React from 'react';
import ReactDOM from 'react-dom';
import Animals from './components/animals';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Animlals />, div);
});
