#!/bin/bash

# imports
source ./shared.sh

# Inspect a Docker container.
inspect() {
  CONTAINER_ID=$(docker ps -aqf "name=$IMAGE_NAME")
  if [ -n "$CONTAINER_ID" ]
  then
    docker exec -it $CONTAINER_ID /bin/bash
  else
    echo "There are currently no active \"$IMAGE_NAME\" Docker containers to inspect."
  fi
}

# Example usage:
#
# ./inspect.sh
inspect $SERVICE_NAME
