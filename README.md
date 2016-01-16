# Summary

I took a very simple isomorphic start kit and adjusted it to be even more simpler.

Original starterkit: https://github.com/RickWong/react-isomorphic-starterkit.git

## Installation

Development

```bash
npm install
npm run watch     # Yes, ONE command for both server AND client development!
```

Production

```bash
npm run build
npm run start  
```

## Things you should do!

Take a look in the `src` directory

Run `npm run watch` in your terminal and play with `components/Main.js` to get a feel of the server-side rendering and client-side hot updates. Change some text and watch it come through live!

Create a new component and add it to the `routes.js` file and immediately become available for use.

Add a new http handler in `server.js` and try accessing. You'll have to reset the server to do this!
