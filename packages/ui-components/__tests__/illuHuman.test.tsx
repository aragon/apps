import React from 'react';
import {render, screen} from '@testing-library/react';

import {Default as IlluHuman} from '../stories/illuHuman.stories';

describe('IlluHuman', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    render(<IlluHuman {...args} />);
    return screen.getByTestId('illu-human');
  }

  test('should render without crashing', () => {
    const element = setup({object: 'users'});
    expect(element).toBeInTheDocument;
  });
});
