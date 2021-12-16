import React from 'react';
import {TextInput, TextInputProps} from './textInput';
import {IconSearch, IconClose} from '../icons';

/** Simple input with variable styling (depending on mode) */

export type SearchInputProps = Omit<TextInputProps, 'adornment' | 'side'>;

export const SearchInput: React.FC<SearchInputProps> = ({value, ...props}) => {
  const ShowResetButton = value && value !== '';
  return (
    <TextInput
      data-testid="search-input"
      leftAdornment={<IconSearch className="text-ui-300" />}
      rightAdornment={ShowResetButton && <IconClose className="text-ui-300" />}
      {...props}
    />
  );
};
