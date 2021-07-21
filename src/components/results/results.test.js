
/* eslint-disable no-undef */
import React from 'react'

import { render } from '@testing-library/react';
import Results from '.';

function mockfunc() {
  console.log('mock')
}

test('renders loader when no pictures', () => {
  const res = render(<Results hitBottom={mockfunc} pictures={[]} />);
  const loader = res.container.querySelector('#loader');
  expect(loader).toBeInTheDocument()
});

test('renders pictuers', () => {
  const pictures = [{
    "id": "test",
    "width": 2247,
    "height": 1498,
    "display_url": "https://pixabay.com/get/gbad096a0f75dcb403267bdc7f54f08d8470c5cacd426d804cd975b08051bb33d200b1d7a3cd6ec13227d96d1bf7e831746e6472c7a9a7c847423a44bcbdf5700_1280.jpg",
    "download_link": "https://pixabay.com/get/gbad096a0f75dcb403267bdc7f54f08d8470c5cacd426d804cd975b08051bb33d200b1d7a3cd6ec13227d96d1bf7e831746e6472c7a9a7c847423a44bcbdf5700_1280.jpg",
    "alt_text": "Pyrenees, mountains, snow",
    "source": "Pixabay"
  }]
  const res = render(<Results hitBottom={mockfunc} pictures={pictures} />);
  const picture = res.container.querySelector(`#${pictures[0].id}`);
  expect(picture).toBeInTheDocument()
});
