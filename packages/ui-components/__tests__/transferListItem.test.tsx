import React from 'react';
import {render, screen} from '@testing-library/react';

import {Default as TransferListItem} from '../stories/transferListItem.stories';

describe('TransferListItem', () => {
  function setup(args?: any) {
    render(<TransferListItem {...args} />);
    return screen.getByTestId('transferListItem');
  }

  test('should render without crashing', () => {
    const element = setup();
    expect(element).toBeVisible;
  });
});
