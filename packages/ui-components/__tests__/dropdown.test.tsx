import React from 'react';
import {render, screen} from '@testing-library/react';

import {Dropdown} from '../src/components/dropdown';
import {ButtonText} from '../src/components/button';

describe('Dropdown', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    render(
      <Dropdown trigger={<ButtonText label="button" />} {...args}>
        {args.children}
      </Dropdown>
    );
    return screen.getByTestId('dropdown-trigger');
  }

  test('should render without crashing', () => {
    const element = setup({});
    expect(element).toBeInTheDocument;
  });
});
