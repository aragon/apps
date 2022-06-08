import React from 'react';
import {render, screen} from '@testing-library/react';

import {IlluObject} from '../src/components/illustrations/illuObject';

describe('TextInput', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    render(<IlluObject {...args} />);
    return screen.getByTestId('illu-object');
  }

  test('should render without crashing', () => {
    const element = setup({object: 'users'});
    expect(element).toBeInTheDocument;
  });
});
