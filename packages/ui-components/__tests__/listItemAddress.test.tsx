import React from 'react';
import {render, screen} from '@testing-library/react';

import {Wallet} from '../stories/listItemAddress.stories';

describe('ListItemAddress', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    render(<Wallet {...args} />);
    return screen.getByTestId('listItem-address');
  }

  test('should render without crashing', () => {
    const element = setup({});
    expect(element).toBeInTheDocument;
  });
});
