import React, {useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {HeaderPage, SearchInput, Pagination} from '@aragon/ui-components';
import {withTransaction} from '@elastic/apm-rum-react';

import {useDaoTokenHolders, useDaoWhitelist} from 'hooks/useDaoMembers';
import {useDaoParam} from 'hooks/useDaoParam';
import {useDaoMetadata} from 'hooks/useDaoMetadata';
import {Loading} from 'components/temporary';
import {MembersList} from 'components/membersList';
import {useMappedBreadcrumbs} from 'hooks/useMappedBreadcrumbs';

const Community: React.FC = () => {
  const {t} = useTranslation();
  const {data: daoId} = useDaoParam();
  const {breadcrumbs, icon} = useMappedBreadcrumbs();

  const {data: dao, loading: metadataLoading} = useDaoMetadata(daoId);
  const {data: whitelist, isLoading: whiteListLoading} = useDaoWhitelist(dao);
  const {
    data: {daoMembers, token},
    isLoading: tokenHoldersLoading,
  } = useDaoTokenHolders(dao);

  const [page, setPage] = useState(1);

  // The number of members displayed on each page
  const MembersPerPage = 10;
  const walletBased = dao?.packages[0].pkg.__typename === 'WhitelistPackage';
  const memberCount = walletBased ? whitelist?.length : daoMembers?.length;

  if (whiteListLoading || tokenHoldersLoading || metadataLoading)
    return <Loading />;

  return (
    <Container>
      <HeaderPage
        icon={icon}
        crumbs={breadcrumbs}
        title={`${memberCount} ${t('labels.members')}`}
        description={
          walletBased
            ? t('explore.explorer.walletBased')
            : t('explore.explorer.tokenBased')
        }
        buttonLabel={
          walletBased ? t('labels.addMember') : t('labels.mintTokens')
        }
      />
      <SearchInput placeholder={'Type to search ...'} />
      <div className="flex space-x-3">
        <div className="space-y-2 w-full">
          <MembersList {...{walletBased, whitelist, daoMembers, token}} />
        </div>
      </div>
      <PaginationWrapper>
        {memberCount > MembersPerPage && (
          <Pagination
            totalPages={Math.ceil(memberCount / MembersPerPage) as number}
            activePage={page}
            onChange={(activePage: number) => {
              setPage(activePage);
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}
          />
        )}
      </PaginationWrapper>
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    'col-span-full desktop:col-start-2 desktop:col-end-12 desktop:mt-5 space-y-5 desktop:space-y-8',
})``;

const PaginationWrapper = styled.div.attrs({
  className: 'flex mt-8',
})``;

export default withTransaction('Community', 'component')(Community);
