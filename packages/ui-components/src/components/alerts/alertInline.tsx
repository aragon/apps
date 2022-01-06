import React from 'react';
// import styled from 'styled-components';

export type AlertInlineProps = {
  mode?: 'neutral' | 'success' | 'warning' | 'critical';
  label: string;
};

export const AlertInline: React.FC<AlertInlineProps> = ({
  //   mode = 'neutral',
  label,
}) => {
  return <div data-testid="alertInline">{label}</div>;
};
