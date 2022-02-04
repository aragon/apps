import styled from 'styled-components';

/**
 * Temporary replacement for time input. Should be moved to replace the
 * time->input component in ui-components.
 *
 * TODO: Add necessary styles (like border color, etc.)
 */
export const SimplifiedTimeInput = styled.input.attrs({
  type: 'time',
  className: 'w-full rounded-xl border-2 border-ui-100',
})`
  // hides the icon that allows to open the time selection dropdown
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    height: fit-content;
  }
  ::-webkit-datetime-edit-text {
    display: inline-block;
    padding-right: 2px;
    padding-left: 2px;
  }
  ::-webkit-datetime-edit-ampm-field {
    font-size: 12px;
    font-weight: bold;
    background-color: #cbd2d9;
    border-radius: 8px;
    padding: 4px 10px;
    color: #323f4b;
  }
`;
