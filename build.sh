#/bin/bash

(cd click-tracker-api && exec sh build.sh) 
(cd click-tracker-dash && exec sh build.sh) 

docker-compose up -d
