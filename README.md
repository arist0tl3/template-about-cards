# template-about-cards

> Easily bring cards into your Koji&#x27;s about context

## Install

```bash
npm install --save @arist0tl3/template-about-cards
```

## Usage

```jsx
import React, { Component } from 'react';
import AboutCards from '@arist0tl3/template-about-cards';
import { FeedSdk } from '@withkoji/vcc';

const feed = new FeedSdk();

const config = {
  // Your default config here
};

const About = () => (
  <AboutCards
      config={config}
      configURL={'https://api.npoint.io/your-endpoint'}
      onCreateRemix={() => feed.createRemix()}
    />
);

```

## License

MIT © [arist0tl3](https://github.com/arist0tl3)
