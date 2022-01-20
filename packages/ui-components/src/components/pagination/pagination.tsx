import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {IconChevronRight, IconChevronLeft} from '../icons/interface';

export interface PaginationProps {
  /**
   * white background
   */
  bgWhite?: boolean;
  /**
   * Number of total steps
   */
  totalSteps?: number;
  /**
   * active steps
   */
  defaultStep?: number;
  onChange?: (step: number) => void;
}

/**
 * Default UI component
 */
export const Pagination: React.FC<PaginationProps> = ({
  totalSteps = 10,
  defaultStep = 1,
  bgWhite = false,
  onChange,
}) => {
  const [step, setStep] = useState<number>(defaultStep);
  const MovetoNextStep = (step: number) => setStep(step);

  useEffect(() => {
    if (onChange) {
      onChange(step);
    }
  }, [onChange, step]);

  function ButtonList(
    activeStep: number,
    totalSteps: number,
    MovetoNextStep: (step: number) => void
  ) {
    const List = [];
    if (activeStep <= 5) {
      for (let i = 1; i <= Math.min(5, totalSteps); i++) {
        List.push(
          <Page
            isActive={activeStep === i}
            onClick={() => MovetoNextStep(i)}
            {...(bgWhite && {bgWhite})}
          >
            {i}
          </Page>
        );
      }
      return (
        <>
          {List}
          {totalSteps > 5 && totalSteps !== 6 && (
            <>
              <Separator>...</Separator>
              <Page
                onClick={() => MovetoNextStep(totalSteps)}
                {...(bgWhite && {bgWhite})}
              >
                {totalSteps}
              </Page>
            </>
          )}
        </>
      );
    } else if (activeStep >= 5 && activeStep <= totalSteps - 4) {
      for (let i = activeStep - 1; i <= activeStep + 1; i++) {
        List.push(
          <Page
            isActive={activeStep === i}
            onClick={() => MovetoNextStep(i)}
            {...(bgWhite && {bgWhite})}
          >
            {i}
          </Page>
        );
      }
      return (
        <>
          <Page onClick={() => MovetoNextStep(1)} {...(bgWhite && {bgWhite})}>
            {1}
          </Page>
          <Separator>...</Separator>
          {List}
          <Separator>...</Separator>
          <Page
            onClick={() => MovetoNextStep(totalSteps)}
            {...(bgWhite && {bgWhite})}
          >
            {totalSteps}
          </Page>
        </>
      );
    } else if (totalSteps - 5 && activeStep > totalSteps - 4) {
      for (let i = totalSteps - 4; i <= totalSteps; i++) {
        List.push(
          <Page
            isActive={activeStep === i}
            onClick={() => MovetoNextStep(i)}
            {...(bgWhite && {bgWhite})}
          >
            {i}
          </Page>
        );
      }
      return (
        <>
          <Page onClick={() => MovetoNextStep(1)} {...(bgWhite && {bgWhite})}>
            {1}
          </Page>
          <Separator>...</Separator>
          {List}
        </>
      );
    }
    return null;
  }

  return (
    <HStack data-testid="pagination">
      <Navigation
        onClick={() => setStep(step - 1)}
        disabled={step === 1}
        {...(bgWhite && {bgWhite})}
      >
        <IconChevronLeft />
      </Navigation>
      {ButtonList(step, totalSteps, MovetoNextStep)}
      <Navigation
        onClick={() => setStep(step + 1)}
        disabled={step === totalSteps}
        {...(bgWhite && {bgWhite})}
      >
        <IconChevronRight />
      </Navigation>
    </HStack>
  );
};

const HStack = styled.div.attrs({
  className: 'flex space-x-1.5',
})``;

type NavigationType = Pick<PaginationProps, 'bgWhite'>;

const Navigation = styled.button.attrs(({bgWhite = false}: NavigationType) => ({
  className: `flex items-center justify-center text-ui-600 
    rounded-xl ${!bgWhite && 'bg-ui-0'} h-6 w-6
    disabled:text-ui-300 ${!bgWhite && 'disabled:bg-ui-100'}`,
}))<NavigationType>``;

type pageType = {isActive?: boolean; bgWhite?: boolean};

const Page = styled.button.attrs(
  ({isActive = false, bgWhite = false}: pageType) => ({
    className: `rounded-xl py-1.5 px-2.5 text-ui-600 ${
      isActive ? 'bg-ui-200' : `${!bgWhite && 'bg-ui-0'}`
    }`,
  })
)<pageType>``;

const Separator = styled.div.attrs({
  className: 'flex items-center',
})``;
