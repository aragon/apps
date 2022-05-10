import {ButtonText, CardProposal, IconChevronDown} from '@aragon/ui-components';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

// NOTE: There will be changes when integrating proposals.
const ActiveProposalsExplore: React.FC = () => {
  const {t} = useTranslation();
  const [proposals, setProposals] = useState(TEMP_PROPOSALS);

  const handleShowMoreClick = () => {
    setProposals([...proposals, ...TEMP_PROPOSALS]);
  };

  return (
    <Container>
      <SectionTitle>{t('explore.activeProposals')}</SectionTitle>
      <CardsWrapper>
        {/* Use proposal id instead of index when integrating */}
        {proposals.map((proposal, index) => (
          <CardProposal
            key={index}
            type="explore"
            process="active"
            onClick={() => null}
            {...proposal}
          />
        ))}
      </CardsWrapper>
      <ButtonText
        mode="secondary"
        label={t('explore.showMore')}
        iconRight={<IconChevronDown />}
        onClick={handleShowMoreClick}
      />
    </Container>
  );
};

export default ActiveProposalsExplore;

const TEMP_PROPOSAL = {
  title: 'Proposal to change DAO name and description',
  description:
    'I think the current DAO name doesn’t match our mission and purpose, therefore we should do this, that, and whatever else.',
  voteTitle: 'Winning Option',
  voteProgress: 70,
  voteLabel: 'Yes',
  tokenAmount: '3.5M',
  tokenSymbol: 'DNT',
  publishLabel: 'Published by',
  daoName: 'Lorex DAO',
  publisherAddress: '0x374d444487A4602750CA00EFdaC5d22B21F130E1',
  alertMessage: '5 days left',
  stateLabel: [
    'Draft',
    'Pending',
    'Active',
    'Executed',
    'Succeeded',
    'Defeated',
  ],
};
const TEMP_PROPOSALS = [TEMP_PROPOSAL, TEMP_PROPOSAL, TEMP_PROPOSAL];

const Container = styled.div.attrs({className: 'space-y-3'})``;
const SectionTitle = styled.p.attrs({
  className: 'text-xl font-bold text-ui-800',
})``;

const CardsWrapper = styled.div.attrs({
  className: 'grid grid-cols-1 gap-1.5 desktop:grid-cols-3 desktop:gap-3',
})``;
