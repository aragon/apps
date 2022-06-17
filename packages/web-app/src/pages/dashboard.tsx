import {ButtonText, HeaderDao} from '@aragon/ui-components';
import React, {useState} from 'react';
import styled from 'styled-components';
import {withTransaction} from '@elastic/apm-rum-react';

import {Loading, TemporarySection} from 'components/temporary';
import ProposalSnapshot from 'containers/proposalSnapshot';
import TreasurySnapshot from 'containers/treasurySnapshot';
import {MembershipSnapshot} from 'containers/membershipSnapshot';
import {useDaoParam} from 'hooks/useDaoParam';
import {MockProposal, useDaoProposals} from 'hooks/useDaoProposals';
import {useDaoVault} from 'hooks/useDaoVault';
import {useDaoMetadata} from 'hooks/useDaoMetadata';
import useScreen from 'hooks/useScreen';
import {Transfer} from 'utils/types';
import {formatDate} from 'utils/date';
import {useNetwork} from 'context/network';
import {useTranslation} from 'react-i18next';

const Dashboard: React.FC = () => {
  const {t} = useTranslation();
  const {network} = useNetwork();
  const {isDesktop} = useScreen();
  const {loading, data: daoId} = useDaoParam();

  const {data: dao, loading: metadataLoading} = useDaoMetadata(daoId);

  //temporary helpers
  const [showProposals, setShowProposals] = useState(true);
  const [showTransactions, setShowTransactions] = useState(true);

  const {topTen} = useDaoProposals(showProposals);
  const {transfers, totalAssetValue} = useDaoVault(dao, showTransactions);

  if (loading || metadataLoading) {
    return <Loading />;
  }

  const isWalletBased = dao?.packages[0].pkg.__typename === 'WhitelistPackage';

  return (
    <>
      <HeaderWrapper>
        <HeaderDao
          daoName={dao?.name}
          description={
            'We are a community that loves trees and the planet. We track where forestation is increasing (or shrinking), fund people who are growing and protecting trees...'
          }
          created_at={formatDate(dao?.createdAt, 'MMMM yyyy').toString()}
          daoChain={network}
          daoType={
            isWalletBased
              ? t('explore.explorer.walletBased')
              : t('explore.explorer.tokenBased')
          }
          links={[
            {
              label: 'Website',
              href: 'https://google.com',
            },
            {
              label: 'Discord',
              href: 'https://google.com',
            },
            {
              label: 'Forum',
              href: 'https://google.com',
            },
          ]}
        />
      </HeaderWrapper>
      <div className="col-span-full">
        <TemporarySection purpose="It allows to toggle the presence of data and see the corresponding layouts.">
          <ButtonText
            label={showProposals ? 'Show No Proposals' : 'Show Proposals'}
            onClick={() => setShowProposals(prev => !prev)}
          />
          <ButtonText
            label={showTransactions ? 'Show No Transfers' : 'Show Transfers'}
            onClick={() => setShowTransactions(prev => !prev)}
          />
        </TemporarySection>
      </div>
      {isDesktop ? (
        <DashboardContent
          dao={dao?.id}
          proposals={topTen}
          transfers={transfers}
          totalAssetValue={totalAssetValue}
        />
      ) : (
        <MobileDashboardContent
          dao={dao?.id}
          proposals={topTen}
          transfers={transfers}
          totalAssetValue={totalAssetValue}
        />
      )}
    </>
  );
};

const HeaderWrapper = styled.div.attrs({
  className:
    'w-screen -mx-2 tablet:col-span-full tablet:w-full tablet:mx-0 desktop:col-start-2 desktop:col-span-10',
})``;

/* DESKTOP DASHBOARD ======================================================== */

type DashboardContentProps = {
  dao: string;
  proposals: MockProposal[];
  transfers: Transfer[];
  totalAssetValue: number;
};

const DashboardContent: React.FC<DashboardContentProps> = ({
  dao,
  proposals,
  transfers,
  totalAssetValue,
}) => {
  const proposalCount = proposals.length;
  const transactionCount = transfers.length;

  if (!proposalCount) {
    return (
      <>
        {!transactionCount ? (
          <EqualDivide>
            <ProposalSnapshot dao={dao} proposals={proposals} />
            <TreasurySnapshot
              dao={dao}
              transfers={transfers}
              totalAssetValue={totalAssetValue}
            />
          </EqualDivide>
        ) : (
          <>
            <LeftWideContent>
              <ProposalSnapshot dao={dao} proposals={proposals} />
            </LeftWideContent>
            <RightNarrowContent>
              <TreasurySnapshot
                dao={dao}
                transfers={transfers}
                totalAssetValue={totalAssetValue}
              />
            </RightNarrowContent>
          </>
        )}
        <MembersWrapper>
          <MembershipSnapshot dao={dao} horizontal />
        </MembersWrapper>
      </>
    );
  }

  return (
    <>
      <LeftWideContent>
        <ProposalSnapshot dao={dao} proposals={proposals} />
      </LeftWideContent>
      <RightNarrowContent>
        <TreasurySnapshot
          dao={dao}
          transfers={transfers}
          totalAssetValue={totalAssetValue}
        />
        <MembershipSnapshot dao={dao} />
      </RightNarrowContent>
    </>
  );
};

// NOTE: These Containers are built SPECIFICALLY FOR >= DESKTOP SCREENS. Since
// the mobile layout is much simpler, it has it's own component.

const LeftWideContent = styled.div.attrs({
  className: 'desktop:space-y-5 desktop:col-start-2 desktop:col-span-6',
})``;

const RightNarrowContent = styled.div.attrs({
  className: 'dektop:col-start-8 desktop:col-span-4 desktop:space-y-3',
})``;

const EqualDivide = styled.div.attrs({
  className:
    'desktop:col-start-2 desktop:col-span-10 desktop:flex desktop:space-x-3',
})``;

const MembersWrapper = styled.div.attrs({
  className: 'desktop:col-start-2 desktop:col-span-10',
})``;

/* MOBILE DASHBOARD CONTENT ================================================= */

const MobileDashboardContent: React.FC<DashboardContentProps> = ({
  dao,
  proposals,
  transfers,
  totalAssetValue,
}) => {
  return (
    <MobileLayout>
      <ProposalSnapshot dao={dao} proposals={proposals} />
      <TreasurySnapshot
        dao={dao}
        transfers={transfers}
        totalAssetValue={totalAssetValue}
      />
      <MembershipSnapshot dao={dao} />
    </MobileLayout>
  );
};

const MobileLayout = styled.div.attrs({
  className: 'col-span-full space-y-5',
})``;

export default withTransaction('Dashboard', 'component')(Dashboard);
