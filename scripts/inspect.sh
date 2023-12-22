#!/bin/bash

# imports
source ./shared.sh

# Inspect a Docker container.
inspect() {
  CONTAINER_ID=$(docker ps -aqf "name=$IMAGE_NAME")
  docker exec -t -i $CONTAINER_ID /bin/bash
}

# Example usage:
#
# ./inspect.sh
inspect $SERVICE_NAME
