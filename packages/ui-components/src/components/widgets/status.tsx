import React from 'react';
import styled from 'styled-components';

import {ProgressStatus, ProgressStatusProps} from '../progress/status';

export type WidgetStatusProps = {
  data: ProgressStatusProps[];
};

export const WidgetStatus: React.FC<WidgetStatusProps> = ({data}) => {
  return (
    <Card>
      <Header>Status</Header>
      {data.map(d => {
        return <ProgressStatus {...d} />;
      })}
    </Card>
  );
};

const Card = styled.div.attrs(() => {
  let className = 'bg-ui-0 rounded-xl pt-3 pb-4 space-y-3';
  const bpClasses = ' px-2  tablet:px-3';
  return {className: className + bpClasses};
})``;
const Header = styled.p.attrs({className: 'font-bold ft-text-xl'})``;
