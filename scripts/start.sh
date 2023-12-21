#!/bin/bash

# imports
source ./shared.sh

TAIL_LOGS=0
while getopts "t" flag
do
  case $flag in
    t) TAIL_LOGS=1 ;;
  esac
done

# Start a docker-compose orchestration.
#
# Example usage:
#
# start
# start 1
# start 0
start() {
  local TAIL=$1
  docker-compose down
  BUILDKIT_PROGRESS=plain DOCKER_BUILDKIT=1 docker-compose up -d --build
  if [ $TAIL == 1 ]; then
    docker-compose logs -f --tail=10
  fi
}

# Example usage:
#
# ./start.sh
# ./start.sh -t
start $TAIL_LOGS
