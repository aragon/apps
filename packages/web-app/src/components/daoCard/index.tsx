import React from "react"
import styled from "styled-components"
import { Avatar, IconBlock, IconPerson } from '@aragon/ui-components'

export interface IDaoCardProps {
  name: string
  logo: string
  description: string
  chainId: number
  daoType: DaoType
}

type DaoType = 'type-1' | 'type-2'



export const DaoCard = (props: IDaoCardProps) => {
  return (
    <Container
      data-testid="daoCard"
    >
      <DaoWrapper>
        <DaoDataWrapper>
          <HeaderContainer>
            <Avatar
              mode="circle"
              size="large"
              src="https://banner2.cleanpng.com/20180325/sxw/kisspng-computer-icons-avatar-avatar-5ab7529a8e4e14.9936310115219636745829.jpg"
            />
            <Title>
              DAO Name
            </Title>
          </HeaderContainer>
          <Description>
            this is a description
          </Description>
        </DaoDataWrapper>

        <DaoDetailsWrapper>
          <IconWrapper>
            <IconBlock />
            <IconLabel>
              Ethereum
            </IconLabel>
          </IconWrapper>
          <IconWrapper>
            <IconPerson />
            <IconLabel>
              DAOName
            </IconLabel>
          </IconWrapper>
        </DaoDetailsWrapper>
      </DaoWrapper>
    </Container>
  )
}

const Container = styled.button.attrs({
  className:
    `p-2 desktop:p-3 w-full flex flex-col box-border
    focus:outline-none focus:ring-2 focus:ring-primary-500
    active:border-ui-200
    hover:border-primary-500 hover:border-3 hover:border-solid
    bg-white rounded-xl`
})``;

const HeaderContainer = styled.div.attrs({
  className: `flex flex-row space-x-2 items-center`
})``;

const Title = styled.p.attrs({
  className: `font-bold text-ui-800 text-base desktop:text-xl`
})``;
const Description = styled.p.attrs({
  className: `font-medium text-ui-600 text-sm desktop:text-base flex`
})``;

const DaoWrapper = styled.div.attrs({
  className: `flex flex-col space-y-3`
})``;

const DaoDetailsWrapper = styled.div.attrs({
  className: `flex flex-row space-x-3`
})``;
const IconLabel = styled.p.attrs({
  className: ``
})``;
const IconWrapper = styled.div.attrs({
  className: `flex flex-row space-x-1 items-center`
})``;

const DaoDataWrapper = styled.div.attrs({
  className: `flex flex-col space-y-1.5`
})``;

