import React from 'react';
import {render, screen} from '@testing-library/react';

import {
  IlluObject,
  objectNames,
} from '../src/components/illustrations/object/illuObject';

describe('IlluObject', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    // TODO: this is temp fix, please test properly
    render(<IlluObject {...args} />);
    return screen;
  }

  objectNames.map(name => {
    test(`${name} variant should render without crashing`, () => {
      const element = setup({object: name});
      expect(element).toBeInTheDocument;
    });
  });
});
