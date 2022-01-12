import React from 'react';
import {render, screen} from '@testing-library/react';

import {Option, ButtonGroup} from '../src';

describe('Button Group', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    render(
      <ButtonGroup defaultValue="USD" {...args}>
        <Option value="USD">USD</Option>
        <Option value="ETH">ETH</Option>
      </ButtonGroup>
    );
    return screen.getByTestId('buttonGroup');
  }

  test('should render without crashing', () => {
    const element = setup({});
    expect(element).toBeInTheDocument;
  });
});
