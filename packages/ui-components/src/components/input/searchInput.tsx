import React from 'react';
import {TextInput, TextInputProps} from './textInput';
import {IconSearch, IconClose} from '../icons';

/** Simple input with variable styling (depending on mode) */
/**
 * TODO: the drop down should be a select element and We will update 
 * it with new designs
 */

export type SearchInputProps = Omit<TextInputProps, 'adornment' | 'side' | 'clickable'>;

export const SearchInput: React.FC<SearchInputProps> = ({...props}) => {
  return (
    <TextInput
      data-testid="search-input"
      leftAdornment={<IconSearch className="text-ui-300" />}
      rightAdornment={<IconClose className="text-ui-300" />}
      side={'left'}
      {...props}
    />
  );
};
