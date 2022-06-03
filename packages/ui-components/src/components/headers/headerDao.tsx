import styled from 'styled-components';
import React from 'react';

import {
  IconBlock,
  IconChevronDown,
  IconCommunity,
  IconCopy,
  IconFlag,
  IconFavoriteSelected,
} from '../icons';
import {AvatarDao} from '../avatar';
import {Link} from '../link';
import {ButtonIcon, ButtonText} from '../button';
import {Dropdown} from '../dropdown';
import {ListItemLink} from '../listItem';

export type HeaderDaoProps = {
  daoName: string;
  daoAvatar?: string;
  description: string;
  created_at: string;
  daoChain: string;
  daoType: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const HeaderDao: React.FC<HeaderDaoProps> = ({
  daoName,
  daoAvatar,
  description,
  created_at,
  daoChain,
  daoType,
  links,
}) => {
  return (
    <Card data-testid="header-dao">
      <ContentWrapper>
        <Content>
          <Title>{daoName}</Title>
          <Link
            label={`app.aragon.org/dao/${daoName}`}
            iconRight={<IconCopy />}
          />
          <Description>
            {description}
            <Link
              label={'ReadMore'}
              className="mx-1 text-base"
              iconRight={<IconChevronDown />}
            />
          </Description>
        </Content>
        <AvatarContainer>
          <AvatarDao
            {...{daoName}}
            {...(daoAvatar && {src: daoAvatar})}
            size="hero"
          />
        </AvatarContainer>
      </ContentWrapper>
      <DetailsWrapper>
        <NetworkDetailsContainer>
          <NetworkDetails>
            <IconFlag className="text-primary-400" />
            <DetailsText>{created_at}</DetailsText>
          </NetworkDetails>
          <NetworkDetails>
            <IconBlock className="text-primary-400" />
            <DetailsText>{daoChain}</DetailsText>
          </NetworkDetails>
          <NetworkDetails>
            <IconCommunity className="text-primary-400" />
            <DetailsText>{daoType}</DetailsText>
          </NetworkDetails>
        </NetworkDetailsContainer>
        <ActionWrapper>
          <LinksWrapper>
            {links
              .slice(0, 3)
              .map(
                (
                  {label, href}: {label: string; href: string},
                  index: number
                ) => (
                  <Link {...{label, href}} external key={index} />
                )
              )}
          </LinksWrapper>
          <ActionContainer>
            <ButtonIcon
              icon={<StyledIconFavoriteSelected />}
              mode="ghost"
              size="large"
            />
            <Dropdown
              align="start"
              trigger={
                <ButtonText
                  iconRight={<IconChevronDown />}
                  label={'All Links'}
                  mode="ghost"
                  size="large"
                />
              }
              sideOffset={8}
              listItems={links.map(
                (
                  {label, href}: {label: string; href: string},
                  index: number
                ) => ({
                  component: (
                    <div className="p-1 mb-1.5">
                      <ListItemLink {...{label, href}} key={index} />
                    </div>
                  ),
                  callback: () => {
                    window.open(href, '_blank');
                  },
                })
              )}
            />
          </ActionContainer>
        </ActionWrapper>
      </DetailsWrapper>
    </Card>
  );
};

const Card = styled.div.attrs({
  className:
    'w-full bg-white rounded-xl p-3 desktop:p-6 border border-ui-100 space-y-3',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;

const ContentWrapper = styled.div.attrs({
  className: 'flex items-center justify-between grid grid-cols-12',
})``;

const Content = styled.div.attrs({
  className: 'col-span-10 space-y-1.5',
})``;

const AvatarContainer = styled.div.attrs({
  className: 'tablet:flex hidden justify-end col-span-2',
})``;

const Title = styled.h1.attrs({
  className: 'text-3xl font-bold text-ui-800',
})``;

const Description = styled.p.attrs({
  className: 'font-medium text-ui-600 text-base',
})`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const DetailsWrapper = styled.div.attrs({
  className: 'flex items-center justify-between flex-col tablet:flex-row',
})``;

const NetworkDetailsContainer = styled.div.attrs({
  className: 'flex space-x-3',
})``;

const NetworkDetails = styled.div.attrs({
  className: 'flex space-x-1 items-center justify-center',
})``;

const DetailsText = styled.span.attrs({
  className: 'text-ui-600 text-sm',
})``;

const LinksWrapper = styled.div.attrs({
  className: 'space-x-3 hidden desktop:flex',
})``;

const ActionContainer = styled.div.attrs({
  className: 'flex space-x-1.5 w-full justify-between',
})``;

const ActionWrapper = styled.div.attrs({
  className:
    'flex items-center tablet:space-x-3 justify-between tablet:justify-start w-full tablet:w-max space-y-3 tablet:space-y-0',
})``;

const StyledIconFavoriteSelected = styled(IconFavoriteSelected).attrs({
  className: 'text-ui-600',
})``;
