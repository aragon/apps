import React from 'react';
import {render, screen} from '@testing-library/react';

import {IlluObject} from '../src/components/illustrations/object/illuObject';

describe('IlluObject', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    // TODO: this is temp fix, please test properly
    render(<IlluObject {...args} />);
    return screen;
  }

  test.skip('should render without crashing', () => {
    const element = setup({object: 'users'});
    expect(element).toBeInTheDocument;
  });
});
