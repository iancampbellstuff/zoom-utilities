# zoom-utilities scripts

Helper scripts for the zoom-utilities monorepo.

## Start

This script starts the code with docker-compose.

```sh
./start.sh

# tail logs:
./start.sh -t
```

## Inspect

This script inspects the running Docker comtainer for this monorepo.

```sh
./inspect.sh
```

## Stop

This script stops the running container and deletes the image.

```sh
./stop.sh
```
