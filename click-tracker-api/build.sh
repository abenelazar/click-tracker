#/bin/bash

yarn run build

NAME=abenelazar/click-tracker-api

docker build -t $NAME .
