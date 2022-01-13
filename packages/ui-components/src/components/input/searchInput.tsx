import React, {useRef} from 'react';
import {TextInput, TextInputProps} from './textInput';
import {IconSearch, IconClose} from '../icons';
// import styled from 'styled-components';

/** Simple input with variable styling (depending on mode) */
/**
 * TODO: the drop down should be a select element and We will update
 * it with new designs
 */

export type SearchInputProps = Omit<
  TextInputProps,
  'adornment' | 'side' | 'clickable'
>;

export const SearchInput: React.FC<SearchInputProps> = ({...props}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TextInput
      data-testid="search-input"
      ref={inputRef}
      leftAdornment={<IconSearch className="text-ui-300" />}
      rightAdornment={
        <div
          style={{cursor: 'pointer'}}
          onClick={() => {
            // (inputRef.current as HTMLInputElement).value = '';
            console.log('inputRef', inputRef);
          }}
        >
          <IconClose className="text-ui-300" />
        </div>
      }
      {...props}
    />
  );
};

// const adornmentButton = styled.button.attrs(() => {
//   const className: string | undefined = 'bg-transparent';
//   return {className};
// })``;
