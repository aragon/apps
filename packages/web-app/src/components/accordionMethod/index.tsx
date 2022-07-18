import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AlertInline,
  ButtonIcon,
  IconChevronDown,
  IconMenuVertical,
  IconSuccess,
  IconWarning,
} from '@aragon/ui-components';
import styled from 'styled-components';

type AccordionMethodType = {
  type: 'action-builder' | 'execution-widget';
  methodName: string;
  smartContractName: string;
  verified?: boolean;
  methodDescription?: string;
};

export const AccordionMethod: React.FC<AccordionMethodType> = ({
  type,
  methodName,
  smartContractName,
  verified = false,
  methodDescription,
  children,
}) => {
  return (
    <Accordion.Root type="single" defaultValue="item-1" collapsible>
      <Accordion.Item value="item-1">
        <AccordionHeader type={type}>
          <HStack>
            <FlexContainer>
              <MethodName>{methodName}</MethodName>
              <div
                className={`flex items-center space-x-1 ${
                  verified ? 'text-primary-600' : 'text-warning-600'
                }`}
              >
                <p
                  className={`font-bold ${
                    verified ? 'text-primary-500' : 'text-warning-500'
                  }`}
                >
                  {smartContractName}
                </p>
                {verified ? <IconSuccess /> : <IconWarning />}
              </div>
            </FlexContainer>

            <VStack>
              {type === 'action-builder' && (
                <ButtonIcon
                  mode="ghost"
                  size="medium"
                  icon={<IconMenuVertical />}
                />
              )}
              <Accordion.Trigger>
                <AccordionButton
                  mode={type === 'action-builder' ? 'ghost' : 'secondary'}
                  size="medium"
                  icon={<IconChevronDown />}
                />
              </Accordion.Trigger>
            </VStack>
          </HStack>

          {methodDescription && (
            <AdditionalInfoContainer>
              <p>{methodDescription}</p>

              <AlertInline
                label="Additional Information of method"
                mode="neutral"
              />
            </AdditionalInfoContainer>
          )}
        </AccordionHeader>

        <Accordion.Content>{children}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

type AccordionType = Pick<AccordionMethodType, 'type'>;

const AccordionHeader = styled(Accordion.Header).attrs(
  ({type}: AccordionType) => ({
    className: `p-2 rounded-xl ${
      type === 'action-builder' ? 'bg-white' : 'bg-ui-50'
    }`,
  })
)<AccordionType>`
  &[data-state='open'] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const AccordionButton = styled(ButtonIcon)`
  [data-state='open'] & {
    transform: rotate(180deg);
    background-color: #cbd2d9;
  }
`;

const AdditionalInfoContainer = styled.div.attrs({
  className: 'mt-1.5 ft-text-sm text-ui-600 space-y-1.5',
})`
  [data-state='closed'] & {
    display: none;
  }
`;

const FlexContainer = styled.div.attrs({
  className:
    'tablet:flex flex-1 justify-between items-center space-y-0.5 ft-text-sm',
})``;

const MethodName = styled.p.attrs({
  className: 'font-bold ft-text-lg text-ui-800',
})``;

const HStack = styled.div.attrs({
  className: 'flex justify-between space-x-3',
})``;

const VStack = styled.div.attrs({
  className: 'flex items-start space-x-1',
})``;
