
import React from 'react';
import styled from 'styled-components';

export const LinearProgress = styled.progress.attrs({
  className: 'h-1 w-full',
})<React.ProgressHTMLAttributes<HTMLProgressElement>>`
  ::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #e4e7eb;
  }
  ::-webkit-progress-value {
    border-radius: 4px;
    background: linear-gradient(90deg, #0031ad 0%, #003bf5 100.32%);
  }
`;
