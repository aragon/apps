import {
  ButtonText,
  CardProposal,
  CardProposalProps,
  IconChevronRight,
  IconGovernance,
  ListItemHeader,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import {generatePath, useNavigate} from 'react-router-dom';

import {Loading} from 'components/temporary';
import {useNetwork} from 'context/network';
import {useDaoParam} from 'hooks/useDaoParam';
import {useDaoProposals} from 'hooks/useDaoProposals';
import {Governance, NewProposal} from 'utils/paths';

const Dashboard: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const {data: dao, loading} = useDaoParam();

  const {topTen} = useDaoProposals();

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="desktop:flex justify-between mt-3 desktop:mt-6">
        {topTen.length !== 0 && (
          <ProposalSnapshot>
            <ListItemHeader
              icon={<IconGovernance />}
              value={topTen.length.toString()}
              label={t('dashboard.proposalsTitle')}
              buttonText={t('newProposal.title')}
              orientation="horizontal"
              onClick={() =>
                navigate(
                  generatePath(NewProposal, {network: network, dao: dao})
                )
              }
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
              onClick={() =>
                navigate(generatePath(Governance, {network: network, dao: dao}))
              }
            />
          </ProposalSnapshot>
        )}

        {/* Finance Snapshot */}
        <div className="w-2/5"></div>
      </div>
    </Container>
  );
};

export default withTransaction('Dashboard', 'component')(Dashboard);

const Container = styled.div.attrs({
  className: 'py-3 col-span-full desktop:col-start-2 desktop:col-end-12',
})``;

const ProposalSnapshot = styled.div.attrs({
  className: 'space-y-1.5 desktop:space-y-2 w-full desktop:w-3/5 desktop:mr-6',
})``;
