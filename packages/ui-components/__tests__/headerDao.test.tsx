import React from 'react';
import {render, screen} from '@testing-library/react';

import {Dao as HeaderDao} from '../stories/headerDao.stories';

describe('HeaderDao', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    render(<HeaderDao {...args} />);
    return screen.getByTestId('header-dao');
  }

  test('should render without crashing', () => {
    const element = setup({});
    expect(element).toBeInTheDocument;
  });
});
