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
# inspects the client service by default:
./inspect.sh

# inspect the client service:
./inspect.sh client

# inspect the server service:
./inspect.sh server
```

## Stop

This script stops the running container and delete the service images.

```sh
./stop.sh
```
