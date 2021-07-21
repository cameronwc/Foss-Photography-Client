
/* eslint-disable no-undef */
import React from 'react'

import { render } from '@testing-library/react';
import Search from '.';

function mockfunc() {
  console.log('mock')
}

test('renders search', () => {
  const res = render(<Search search={mockfunc} updateTerm={mockfunc} />);
  const search = res.container.querySelector('#search');
  expect(search).toBeInTheDocument()
});

