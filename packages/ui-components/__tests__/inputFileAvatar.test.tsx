import React from 'react';
import {render, screen} from '@testing-library/react';

import {Avatar as FileAvatarInput} from '../stories/inputFileAvatar.stories';

describe('FileAvatarInput', () => {
  // eslint-disable-next-line
  function setup(args: any) {
    render(<FileAvatarInput {...args} />);
    return screen.getByTestId('fileAvatar-input');
  }

  test('should render without crashing', () => {
    const element = setup({});
    expect(element).toBeInTheDocument;
  });
});
