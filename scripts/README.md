# zoom-utilities scripts

Helper scripts for the zoom-utilities monorepo.

## Setup

### Docker Desktop

[Install Docker Desktop](https://docs.docker.com/desktop/install/mac-install/ 'https://docs.docker.com/desktop/install/mac-install/'), or install Docker Desktop with [Homebrew](https://docs.brew.sh/Installation 'https://docs.brew.sh/Installation'):

```sh
brew install --cask docker
```

### nvm

Install `nvm` with [Homebrew](https://docs.brew.sh/Installation 'https://docs.brew.sh/Installation'), and set the Node.js version:

```sh
brew install nvm
. $(brew --prefix nvm)/nvm.sh
nvm use
```

### server/config.json

Ignore local changes to the `server/config.json` file:

```sh
git update-index --no-assume-unchanged server/config.json
```

---

## Commands

### Start

This script builds and starts the Docker container for this monorepo.

```sh
./start.sh

# tail logs:
./start.sh -t
```

### Inspect

This script inspects the running Docker comtainer for this monorepo.

```sh
./inspect.sh
```

### Stop

This script stops the running container and deletes the image.

```sh
./stop.sh
```

## Scripts

### `start.js`

This script conditionally starts zoom-utilites as either an Electron App or a PWA.

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
