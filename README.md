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

## Develop

Development is straightforward thanks to [create-react-library](https://github.com/transitive-bullshit/create-react-library).

Simply clone the repo and `npm install`. You can then `npm start` to run a development version of the package locally. Bring it into a project with something like `npm install ~/yourfolder/template-about-cards`.

Note: If you are using hooks in your parent React project, you may run into the dreaded "Cannot find module react". In this case, you will need to point the react dependency in your parent project at the react folder inside this project. For example, you would replace:

```
"dependencies": {
  "react": "^16.13.1"
},
```

with

```
"dependencies": {
  "react": "file:~/yourfolder/template-about-cards/node_modules/react"
},
```

in the package.json file in your parent project.

Run a `rm -rf node_modules` and `npm install` and restart your parent project and the error should clear =)

Be sure to change your dep back after you're done hacking!

## License

MIT © [arist0tl3](https://github.com/arist0tl3)
