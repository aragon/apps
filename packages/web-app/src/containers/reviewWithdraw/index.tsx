import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import React, {useState} from 'react';
import styled from 'styled-components';

import {
  Badge,
  ButtonText,
  IconChevronDown,
  IconChevronUp,
  CardExecution,
  Link,
} from '@aragon/ui-components';
import ResourceList from 'components/resourceList';
import {VotingTerminal} from 'containers/votingTerminal';

const ReviewWithdraw: React.FC = () => {
  const [expandedProposal, setExpandedProposal] = useState(false);
  const {getValues} = useFormContext();
  const {t} = useTranslation();
  const values = getValues();
  const editor = useEditor({
    editable: false,
    content: values.proposal,
    extensions: [StarterKit],
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <Header>{values.proposalTitle}</Header>
      <BadgeContainer>
        <div className="flex space-x-1.5">
          <Badge label="Finance" />
          <Badge label="Withdraw" />
        </div>
        <ProposerLink>
          {t('governance.proposals.publishedBy')}{' '}
          <Link
            external
            label={'you'}
            // label={shortenAddress(publisherAddress || '')}
            // href={`${explorers[chainId]}${publisherAddress}`}
          />
        </ProposerLink>
      </BadgeContainer>

      <SummaryText>{values.proposalSummary}</SummaryText>

      {!expandedProposal && (
        <ButtonText
          className="mt-3 w-full tablet:w-max"
          label={t('governance.proposals.buttons.readFullProposal')}
          mode="secondary"
          iconRight={<IconChevronDown />}
          onClick={() => setExpandedProposal(true)}
        />
      )}

      <ContentContainer expandedProposal={expandedProposal}>
        <ProposalContainer>
          {expandedProposal && (
            <>
              <EditorContent editor={editor} />

              <ButtonText
                className="mt-3 w-full tablet:w-max"
                label={t('governance.proposals.buttons.closeFullProposal')}
                mode="secondary"
                iconRight={<IconChevronUp />}
                onClick={() => setExpandedProposal(false)}
              />
            </>
          )}

          <VotingTerminal />

          <CardExecution
            title="Execution"
            description="These smart actions are executed when the proposal reaches sufficient support. Find out which actions are executed."
            to={values.to}
            from={values.from}
            toLabel="To"
            fromLabel="From"
            tokenName={values.tokenName}
            tokenImageUrl={values.tokenImgUrl}
            tokenSymbol={values.tokenSymbol}
            tokenCount={values.amount}
            treasuryShare="$TODO:"
          />
        </ProposalContainer>

        <AdditionalInfoContainer>
          <ResourceList links={values.links} />
        </AdditionalInfoContainer>
      </ContentContainer>
    </>
  );
};

export default ReviewWithdraw;

const Header = styled.p.attrs({className: 'font-bold text-ui-800 text-3xl'})``;

const BadgeContainer = styled.div.attrs({
  className: 'tablet:flex items-baseline mt-3 tablet:space-x-3',
})``;

const ProposerLink = styled.p.attrs({
  className: 'mt-1.5 tablet:mt-0 text-ui-500',
})``;

const SummaryText = styled.p.attrs({
  className: 'text-lg text-ui-600 mt-3',
})``;

const ProposalContainer = styled.div.attrs({
  className: 'space-y-3 tablet:w-3/5',
})``;

const AdditionalInfoContainer = styled.div.attrs({
  className: 'space-y-3 tablet:w-2/5',
})``;

type ContentContainerProps = {
  expandedProposal: boolean;
};

const ContentContainer = styled.div.attrs(
  ({expandedProposal}: ContentContainerProps) => ({
    className: `${
      expandedProposal ? 'tablet:mt-5' : 'tablet:mt-8'
    } mt-3 tablet:flex tablet:space-x-3 space-y-3 tablet:space-y-0`,
  })
)<ContentContainerProps>``;
