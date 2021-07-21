
/* eslint-disable no-undef */
import React from 'react'

import { render } from '@testing-library/react';
import Loader from '.';

test('renders loader', () => {
  const res = render(<Loader />);
  const loader = res.container.querySelector('#loader');
  expect(loader).toBeInTheDocument()
});
