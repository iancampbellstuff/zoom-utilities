#!/bin/bash

# imports
source ./shared.sh

SERVICE_NAME=$1
if [ -z "$SERVICE_NAME" ]; then
  # client is the default service name
  SERVICE_NAME="$CLIENT"
fi
if [[ "$SERVICE_NAME" != $CLIENT ]] || [[ "$SERVICE_NAME" != $SERVER ]]; then
  echo "Invalid argument $SERVICE_NAME passed!"
  exit 1
fi

# Inspect a Docker container.
#
# $1 - service name of the Docker container to inspect
#
# Example usage:
#
# inspect client
# inspect server
inspect() {
  local SERVICE=$1
  CONTAINER_ID=$(docker ps -aqf "name=$APP_NAME-$SERVICE_NAME")
  docker exec -t -i $CONTAINER_ID /bin/bash
}

# Example usage:
#
# ./inspect.sh
# ./inspect.sh client
# ./inspect.sh server
inspect $SERVICE_NAME
