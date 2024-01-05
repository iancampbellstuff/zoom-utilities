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

# Build and start the Docker container.
#
# Example usage:
#
# start
# start 1
# start 0
start() {
  local TAIL=$1
  docker compose build --no-cache
  docker compose up -d
  if [ $TAIL == 1 ]; then
    docker compose logs -f --tail=10
  fi
}

# Example usage:
#
# ./start.sh
# ./start.sh -t
start $TAIL_LOGS
