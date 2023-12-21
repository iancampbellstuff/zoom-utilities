#!/bin/bash

# imports
source ./shared.sh

# Stop the running container and delete the service images.
stop() {
  docker-compose down
  docker image rm "$APP_NAME-$CLIENT"
  docker image rm "$APP_NAME-$SERVER"
}

# Example usage:
#
# ./stop.sh
stop
