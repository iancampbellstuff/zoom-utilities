# zoom-utilities scripts

Helper scripts for the zoom-utilities monorepo.

## Setup

- [Install Docker Desktop](https://docs.docker.com/desktop/install/mac-install/ 'https://docs.docker.com/desktop/install/mac-install/')

- Or, install Docker Desktop with [Homebrew](https://docs.brew.sh/Installation 'https://docs.brew.sh/Installation'):

```sh
brew install --cask docker
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
