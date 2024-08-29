# @zoom-utilities/client scripts

Helper scripts for the zoom-utilities client.

## Scripts

### `start.js`

This script conditionally starts the zoom-utilites client as either an Electron App or a PWA.

```sh
node start.js --electron
node start.js --pwa

# "--pwa" is the default option
node start.js
```

This script is executed by the [`package.json`](../package.json) script `npm start` as follows:

```sh
npm start -- --electron
npm start -- --pwa

# "--pwa" is the default option
npm start
```
