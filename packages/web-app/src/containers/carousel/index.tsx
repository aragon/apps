import React, {useMemo} from 'react';
import {Carousel as ReactResponsiveCarousel} from 'react-responsive-carousel';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import CTACard from 'components/ctaCard';
import {CTACards} from 'components/ctaCard/data';
import useScreen from 'hooks/useScreen';

const Carousel: React.FC = () => {
  const {isDesktop} = useScreen();
  const navigate = useNavigate();

  const ctaList = useMemo(
    () =>
      CTACards.map(card => (
        <CTACard
          key={card.title}
          {...card}
          className="flex-1"
          onClick={navigate}
        />
      )),
    [navigate]
  );

  if (isDesktop) {
    return <DesktopCTA>{ctaList}</DesktopCTA>;
  } else {
    return (
      <MobileCTA>
        <StyledCarousel
          swipeable
          emulateTouch
          centerMode
          autoPlay
          interval={4000}
          showArrows={false}
          showStatus={false}
          transitionTime={300}
          centerSlidePercentage={92}
          showThumbs={false}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <ActiveIndicator
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <Indicator
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
        >
          {ctaList}
        </StyledCarousel>
      </MobileCTA>
    );
  }
};

const DesktopCTA = styled.div.attrs({
  className:
    'relative flex desktop:flex-row flex-col mb-4 space-x-3 max-w-fit -mt-16',
})``;

const MobileCTA = styled.div.attrs({
  className: 'relative -mt-20',
})``;

const ActiveIndicator = styled.li.attrs({
  className: 'inline-block bg-primary-500 h-0.75 w-6 ml-1 rounded-xl',
})``;

const Indicator = styled.li.attrs({
  className: 'inline-block bg-ui-200 h-0.75 w-2 ml-1 rounded-xl',
})``;

const StyledCarousel = styled(ReactResponsiveCarousel).attrs({})`
  & > .carousel-slider > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
  }
`;

export default Carousel;
