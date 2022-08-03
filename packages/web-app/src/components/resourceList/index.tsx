import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {
  ListItemLink,
  ListItemLinkProps,
  StateEmpty,
} from '@aragon/ui-components';

type ResourceListProps = {
  links?: ListItemLinkProps[];
  emptyStateButtonClick?: () => void;
};

const ResourceList: React.FC<ResourceListProps> = ({
  links = [],
  emptyStateButtonClick,
}) => {
  const {t} = useTranslation();

  if (links.length > 0) {
    return (
      <Container data-testid="resourceList">
        <Title>{t('labels.resources')}</Title>
        <ListItemContainer>
          {links.map((link, index) => (
            <ListItemLink {...link} key={index} />
          ))}
        </ListItemContainer>
      </Container>
    );
  }

  return (
    <StateEmpty
      type="Object"
      mode="inline"
      object="archive"
      title={t('labels.noResources')}
      primaryButton={
        emptyStateButtonClick
          ? {
              label: t('labels.addResource'),
              onClick: emptyStateButtonClick,
            }
          : undefined
      }
    />
  );
};

export default ResourceList;

const Container = styled.div.attrs({className: 'p-3 bg-ui-0 rounded-xl'})``;

const Title = styled.p.attrs({className: 'text-lg font-bold text-ui-800'})``;

const ListItemContainer = styled.div.attrs({className: 'mt-3 space-y-2'})``;
