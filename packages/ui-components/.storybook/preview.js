import '../src/styles/tailwind.css';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  backgrounds: {
    default: 'neutral-50',
    values: [
      {
        name: 'neutral-50',
        value: '#F5F8FF',
      },
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'neutral-900',
        value: '#1F2933',
      },
    ],
  },
};
