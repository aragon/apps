import {
  ListItemHeader,
  IconGovernance,
  CardProposal,
  CardProposalProps,
  ButtonText,
  IconChevronRight,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useNavigate, generatePath} from 'react-router-dom';

import {useNetwork} from 'context/network';
import {useDaoProposals} from 'hooks/useDaoProposals';
import {NewProposal, Governance} from 'utils/paths';

type Props = {dao: string};

const ProposalSnapshot: React.FC<Props> = ({dao}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {topTen} = useDaoProposals();
  const {network} = useNetwork();

  if (topTen.length === 0) {
    return (
      <div className="flex flex-1 justify-center items-center border">
        Empty State Placeholder
      </div>
    );
  }

  return (
    <Container>
      <ListItemHeader
        icon={<IconGovernance />}
        value={topTen.length.toString()}
        label={t('dashboard.proposalsTitle')}
        buttonText={t('newProposal.title')}
        orientation="horizontal"
        onClick={() => navigate(generatePath(NewProposal, {network, dao}))}
      />

      {topTen.map(({process, ...rest}, index) => (
        <CardProposal
          key={index}
          type="list"
          onClick={() => null}
          process={process as CardProposalProps['process']}
          {...rest}
        />
      ))}

      <ButtonText
        mode="secondary"
        size="large"
        iconRight={<IconChevronRight />}
        label={t('labels.seeAll')}
        onClick={() => navigate(generatePath(Governance, {network, dao}))}
      />
    </Container>
  );
};

export default ProposalSnapshot;

const Container = styled.div.attrs({
  className: 'space-y-1.5 desktop:space-y-2 w-full desktop:w-3/5',
})``;
