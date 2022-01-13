import React from 'react';
import {BadgeProps} from '../..';
import {ButtonTextProps} from '../button';

export type TableCellProps = {
  type: 'text' | 'foot' | 'head' | 'link' | 'tag';
  text?: string;
  subtext?: string;
  rightAligned?: boolean;
  bgWhite?: boolean;
  children?:
    | React.FunctionComponentElement<BadgeProps>
    | React.FunctionComponentElement<ButtonTextProps>;
};

export const TableCell: React.FC<TableCellProps> = ({
  type,
  text,
  subtext,
  bgWhite = false,
  rightAligned = false,
  children,
}) => {
  if (type === 'text') {
    return (
      <td
        className={`px-2 py-1.5 ${!bgWhite && 'bg-ui-0'} ${
          rightAligned ? 'text-right' : 'text-left'
        }`}
      >
        <p className="text-ui-600">{text}</p>
        {subtext && <p className="text-sm text-ui-500">{subtext}</p>}
      </td>
    );
  } else if (type === 'foot') {
    return (
      <td
        className={`px-2 py-1.5 bg-ui-100 ${
          rightAligned ? 'text-right' : 'text-left'
        }`}
      >
        <p className="text-ui-600">{text}</p>
        {subtext && <p className="text-sm text-ui-500">{subtext}</p>}
      </td>
    );
  } else if (type === 'head') {
    return (
      <th
        className={`px-2 py-1.75 bg-ui-100 ${
          rightAligned ? 'text-right' : 'text-left'
        }`}
      >
        <p className="text-sm font-bold text-ui-800">{text}</p>
      </th>
    );
  } else if (type === 'link') {
    return (
      <td
        className={`${!bgWhite && 'bg-ui-0'} ${
          rightAligned ? 'text-right' : 'text-left'
        }`}
      >
        <p className="font-bold text-primary-500 cursor-pointer">{children}</p>
      </td>
    );
  } else if (type === 'tag') {
    return (
      <td className={`px-2 py-1.5 ${!bgWhite && 'bg-ui-0'}`}>{children}</td>
    );
  }

  return null;
};
