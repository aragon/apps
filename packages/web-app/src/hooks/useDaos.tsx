import {useEffect, useState} from 'react';

import {DaoType} from 'components/daoCard';
import {ExploreFilter} from 'containers/daoExplorer';
import {HookData} from 'utils/types';

type DaoOverview = {
  name: string;
  description: string;
  logo?: string;
  chainId: number;
  daoType: DaoType;
};

export function useDaos(useCase: ExploreFilter): HookData<DaoOverview[]> {
  const [data, setData] = useState(() => createMockData(useCase));

  useEffect(() => {
    setData(createMockData(useCase));
  }, [useCase]);
  return {data, isLoading: false};
}

function createMockData(useCase: ExploreFilter) {
  const data: DaoOverview[] = [];
  if (useCase === 'newest') {
    const length = Math.ceil(12 * Math.pow(Math.random(), 2));
    for (let i = 0; i < length; i++) {
      data.push({
        name: `Dao created ${i} days ago`,
        logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit enim ac quam porta tempus. Morbi feugiat leo in ultricies commodo. Praesent tempus neque eu tellus pulvinar, suscipit imperdiet erat laoreet. Vivamus interdum risus fermentum magna convallis tristique. Praesent sit amet venenatis nulla, non ornare lectus. Quisque elit tortor, suscipit sed mi id, mattis tempus felis. Praesent bibendum viverra auctor. Cras finibus, mauris at congue cursus, nisl magna semper lorem, quis ornare odio sem id nulla. Vestibulum fermentum commodo tortor, ac vehicula libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc facilisis nisl viverra, fermentum dui non, ultricies dolor. Mauris ornare varius est, eu finibus tellus lobortis quis. Nullam sagittis vulputate mi in tincidunt. Nam tempor lacus lorem, ac consectetur velit malesuada sed. ',
        chainId: 4,
        daoType: 'wallet-based',
      });
    }
  } else if (useCase === 'favourite') {
    const length = Math.ceil(6 * Math.pow(Math.random(), 2));
    for (let i = 0; i < length; i++) {
      data.push({
        name: `Favourite DAO ${i + 1}`,
        logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit enim ac quam porta tempus. Morbi feugiat leo in ultricies commodo. Praesent tempus neque eu tellus pulvinar, suscipit imperdiet erat laoreet. Vivamus interdum risus fermentum magna convallis tristique. Praesent sit amet venenatis nulla, non ornare lectus. Quisque elit tortor, suscipit sed mi id, mattis tempus felis. Praesent bibendum viverra auctor. Cras finibus, mauris at congue cursus, nisl magna semper lorem, quis ornare odio sem id nulla. Vestibulum fermentum commodo tortor, ac vehicula libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc facilisis nisl viverra, fermentum dui non, ultricies dolor. Mauris ornare varius est, eu finibus tellus lobortis quis. Nullam sagittis vulputate mi in tincidunt. Nam tempor lacus lorem, ac consectetur velit malesuada sed. ',
        chainId: 4,
        daoType: 'wallet-based',
      });
    }
  } else {
    const length = Math.ceil(8 * Math.pow(Math.random(), 2));
    for (let i = 0; i < length; i++) {
      data.push({
        name: `Popular DAO ${i + 1}`,
        logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit enim ac quam porta tempus. Morbi feugiat leo in ultricies commodo. Praesent tempus neque eu tellus pulvinar, suscipit imperdiet erat laoreet. Vivamus interdum risus fermentum magna convallis tristique. Praesent sit amet venenatis nulla, non ornare lectus. Quisque elit tortor, suscipit sed mi id, mattis tempus felis. Praesent bibendum viverra auctor. Cras finibus, mauris at congue cursus, nisl magna semper lorem, quis ornare odio sem id nulla. Vestibulum fermentum commodo tortor, ac vehicula libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc facilisis nisl viverra, fermentum dui non, ultricies dolor. Mauris ornare varius est, eu finibus tellus lobortis quis. Nullam sagittis vulputate mi in tincidunt. Nam tempor lacus lorem, ac consectetur velit malesuada sed. ',
        chainId: 4,
        daoType: 'wallet-based',
      });
    }
  }
  return data;
}
