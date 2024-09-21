# @zoom-utilities/client scripts

Helper scripts for the zoom-utilities client.

## Scripts

### `build.js`

This script conditionally builds the zoom-utilites client as either an Electron App or a PWA.

```sh
node build.js --electron
node start.js --pwa

# "--pwa" is the default option
node build.js
```

This script is executed by the client [`package.json`](../package.json) script `npm run build` as follows:

```sh
npm run build -- --electron
npm run build -- --pwa

# "--pwa" is the default option
npm run build
```

### `start.js`

This script conditionally starts the zoom-utilites client as either an Electron App or a PWA.

```sh
node start.js --electron
node start.js --pwa

# "--pwa" is the default option
node start.js
```

This script is executed by the client [`package.json`](../package.json) script `npm start` as follows:

```sh
npm start -- --electron
npm start -- --pwa

# "--pwa" is the default option
npm start
```
