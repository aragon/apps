import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {IconChevronRight, IconChevronLeft} from '../icons/interface';
import {ButtonText, ButtonIcon} from '../button';
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

  useEffect(() => {
    onChange && onChange(step);
  }, [onChange, step]);

  function ButtonList() {
    const List = [];
    const Distance = 3;

    if (totalSteps <= 7) {
      for (let i = 1; i <= totalSteps; i++) {
        List.push(
          <ButtonText
            mode="secondary"
            size="large"
            isActive={step === i}
            onClick={() => setStep(i)}
            {...(bgWhite && {bgWhite})}
            label={`${i}`}
          />
        );
      }
      return <>{List}</>;
    }

    if (step - 1 <= Distance) {
      for (let i = 1; i <= 5; i++) {
        List.push(
          <ButtonText
            mode="secondary"
            size="large"
            isActive={step === i}
            onClick={() => setStep(i)}
            {...(bgWhite && {bgWhite})}
            label={`${i}`}
          />
        );
      }
      return (
        <>
          {List}
          <Separator>...</Separator>
          <ButtonText
            mode="secondary"
            size="large"
            onClick={() => setStep(totalSteps)}
            {...(bgWhite && {bgWhite})}
            label={`${totalSteps}`}
          />
        </>
      );
    }

    if (totalSteps - step <= Distance) {
      for (let i = totalSteps - 5; i <= totalSteps; i++) {
        List.push(
          <ButtonText
            mode="secondary"
            size="large"
            isActive={step === i}
            onClick={() => setStep(i)}
            {...(bgWhite && {bgWhite})}
            label={`${i}`}
          />
        );
      }
      return (
        <>
          <ButtonText
            mode="secondary"
            size="large"
            onClick={() => setStep(1)}
            {...(bgWhite && {bgWhite})}
            label={`${1}`}
          />
          <Separator>...</Separator>
          {List}
        </>
      );
    }

    for (let i = step - 1; i <= step + 1; i++) {
      List.push(
        <ButtonText
          mode="secondary"
          size="large"
          isActive={step === i}
          onClick={() => setStep(i)}
          {...(bgWhite && {bgWhite})}
          label={`${i}`}
        />
      );
    }
    return (
      <>
        <ButtonText
          mode="secondary"
          size="large"
          onClick={() => setStep(1)}
          {...(bgWhite && {bgWhite})}
          label={'1'}
        />
        <Separator>...</Separator>
        {List}
        <Separator>...</Separator>
        <ButtonText
          mode="secondary"
          size="large"
          onClick={() => setStep(totalSteps)}
          {...(bgWhite && {bgWhite})}
          label={`${totalSteps}`}
        />
      </>
    );
  }

  return (
    <HStack data-testid="pagination">
      <ButtonIcon
        mode="secondary"
        size="large"
        onClick={() => setStep(step - 1)}
        disabled={step === 1}
        icon={<IconChevronLeft />}
        {...(bgWhite && {bgWhite})}
      />
      {ButtonList()}
      <ButtonIcon
        mode="secondary"
        size="large"
        onClick={() => setStep(step + 1)}
        disabled={step === totalSteps}
        icon={<IconChevronRight />}
        {...(bgWhite && {bgWhite})}
      />
    </HStack>
  );
};

const HStack = styled.div.attrs({
  className: 'flex space-x-1.5',
})``;

const Separator = styled.div.attrs({
  className: 'flex items-center',
})``;
