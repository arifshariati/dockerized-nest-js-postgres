#!/bin/bash
# Install the new package
npm install $1
# Rebuild the Docker image
docker-compose build
# Restart the Docker containers
docker-compose up -d