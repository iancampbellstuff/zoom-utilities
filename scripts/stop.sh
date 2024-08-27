#!/bin/bash

# imports
source ./shared.sh

# Stop the running container and delete the image.
stop() {
  docker compose down -v
  docker image rm "$IMAGE_NAME" --force
}

# Example usage:
#
# ./stop.sh
stop
