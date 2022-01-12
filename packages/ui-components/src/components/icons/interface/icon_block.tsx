import React from 'react';
import {IconType} from '..';

export const IconBlock: IconType = ({height = 16, width = 16, ...props}) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <g clip-path="url(#clip0_433_16)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.42239 5.51518C7.79402 5.65904 8.20595 5.65904 8.57759 5.51518L14.2496 3.31838C14.3248 3.28953 14.3896 3.23853 14.4353 3.17211C14.4809 3.10569 14.5054 3.02698 14.5054 2.94638C14.5054 2.86578 14.4809 2.78707 14.4353 2.72065C14.3896 2.65424 14.3248 2.60323 14.2496 2.57438L8.47999 0.286381C8.16421 0.165607 7.81496 0.165607 7.49919 0.286381L1.73919 2.57118C1.66392 2.60003 1.59918 2.65104 1.55352 2.71745C1.50785 2.78387 1.4834 2.86258 1.4834 2.94318C1.4834 3.02378 1.50785 3.10249 1.55352 3.16891C1.59918 3.23533 1.66392 3.28633 1.73919 3.31518L7.42239 5.51518ZM9.31205 6.94721C9.16145 7.00532 9.03195 7.10763 8.94057 7.2407C8.84919 7.37378 8.8002 7.53138 8.80005 7.69281V15.4032C8.80039 15.468 8.81626 15.5317 8.84633 15.589C8.87639 15.6464 8.91978 15.6957 8.97285 15.7328C9.02647 15.7698 9.08835 15.7931 9.15307 15.8006C9.21778 15.8082 9.28336 15.7997 9.34405 15.776L15.1344 13.5488C15.3898 13.4511 15.6093 13.278 15.7639 13.0525C15.9186 12.827 16.0009 12.5598 16 12.2864V4.94081C15.9998 4.87586 15.9838 4.81194 15.9534 4.75454C15.923 4.69713 15.8792 4.64795 15.8256 4.61121C15.7723 4.57421 15.7107 4.55092 15.6463 4.54338C15.5818 4.53585 15.5165 4.54431 15.456 4.56801L9.31205 6.94721ZM7.05949 7.24072C7.15087 7.37379 7.19985 7.53139 7.20001 7.69282V15.4032C7.19967 15.468 7.1838 15.5317 7.15373 15.5891C7.12366 15.6464 7.08027 15.6957 7.02721 15.7328C6.97358 15.7698 6.9117 15.7931 6.84699 15.8006C6.78227 15.8082 6.71669 15.7997 6.65601 15.776L0.867206 13.5504C0.611445 13.4527 0.391496 13.2794 0.236593 13.0536C0.0816909 12.8278 -0.00082759 12.5602 6.25767e-06 12.2864V4.94242C-0.000192133 4.87736 0.0154806 4.81324 0.0456656 4.75561C0.0758507 4.69798 0.119637 4.64858 0.173228 4.61169C0.22682 4.57481 0.288599 4.55156 0.353209 4.54395C0.417819 4.53633 0.483311 4.5446 0.544006 4.56802L6.68801 6.94722C6.83861 7.00533 6.96811 7.10765 7.05949 7.24072Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
