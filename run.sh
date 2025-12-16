#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="nginx-webpage:latest"
CONTAINER_NAME="nginx-webpage"
HOST_PORT=900
CONTAINER_PORT=80

echo "Building image ${IMAGE_NAME}..."
docker build -t "$IMAGE_NAME" .

existing=$(docker ps -a -q --filter "name=^/${CONTAINER_NAME}$" ) || true
if [ -n "$existing" ]; then
  echo "Stopping and removing existing container: $CONTAINER_NAME"
  docker rm -f "$CONTAINER_NAME"
fi

echo "Running container as name: $CONTAINER_NAME"
container_id=$(docker run -d --name "$CONTAINER_NAME" -p ${HOST_PORT}:${CONTAINER_PORT} "$IMAGE_NAME")

echo "Container started. ID: $container_id"

docker ps --filter "id=$container_id" --format "table {{.Names}}\t{{.ID}}\t{{.Status}}\t{{.Ports}}"

echo
echo "You can open: http://localhost:${HOST_PORT}"

exit 0
