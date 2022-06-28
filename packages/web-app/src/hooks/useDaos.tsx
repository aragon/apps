import React from 'react';

import {DaoType} from 'components/daoCard';
import {HookData} from 'utils/types';
import {ExploreFilter} from 'containers/daoExplorer';

type DaoOverview = {
  name: string;
  description: string;
  logo?: string;
  chainId: number;
  daoType: DaoType;
};

export function useDaos(useCase?: ExploreFilter): HookData<DaoOverview[]> {
  return {data: FAVOURITE_DAOS, isLoading: false};
}

const FAVOURITE_DAOS: DaoOverview[] = [
  {
    name: 'The dao 1',
    logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit enim ac quam porta tempus. Morbi feugiat leo in ultricies commodo. Praesent tempus neque eu tellus pulvinar, suscipit imperdiet erat laoreet. Vivamus interdum risus fermentum magna convallis tristique. Praesent sit amet venenatis nulla, non ornare lectus. Quisque elit tortor, suscipit sed mi id, mattis tempus felis. Praesent bibendum viverra auctor. Cras finibus, mauris at congue cursus, nisl magna semper lorem, quis ornare odio sem id nulla. Vestibulum fermentum commodo tortor, ac vehicula libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc facilisis nisl viverra, fermentum dui non, ultricies dolor. Mauris ornare varius est, eu finibus tellus lobortis quis. Nullam sagittis vulputate mi in tincidunt. Nam tempor lacus lorem, ac consectetur velit malesuada sed. ',
    chainId: 4,
    daoType: 'wallet-based',
  },
  {
    name: 'The dao 2',
    logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
    description: 'Lorem ipsum dolor sit amet, ',
    chainId: 1,
    daoType: 'token-based',
  },
  {
    name: 'The dao 2',
    logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
    description: 'Lorem ipsum dolor sit amet, ',
    chainId: 1,
    daoType: 'token-based',
  },
  {
    name: 'The dao 1',
    logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit enim ac quam porta tempus. Morbi feugiat leo in ultricies commodo. Praesent tempus neque eu tellus pulvinar, suscipit imperdiet erat laoreet. Vivamus interdum risus fermentum magna convallis tristique. Praesent sit amet venenatis nulla, non ornare lectus. Quisque elit tortor, suscipit sed mi id, mattis tempus felis. Praesent bibendum viverra auctor. Cras finibus, mauris at congue cursus, nisl magna semper lorem, quis ornare odio sem id nulla. Vestibulum fermentum commodo tortor, ac vehicula libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc facilisis nisl viverra, fermentum dui non, ultricies dolor. Mauris ornare varius est, eu finibus tellus lobortis quis. Nullam sagittis vulputate mi in tincidunt. Nam tempor lacus lorem, ac consectetur velit malesuada sed. ',
    chainId: 4,
    daoType: 'wallet-based',
  },
  {
    name: 'The dao 2',
    logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
    description: 'Lorem ipsum dolor sit amet, ',
    chainId: 1,
    daoType: 'token-based',
  },
  {
    name: 'The dao 2',
    logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
    description: 'Lorem ipsum dolor sit amet, ',
    chainId: 1,
    daoType: 'token-based',
  },
];
