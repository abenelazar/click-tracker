#/bin/bash

$(cd click-tracker-api && sh build.sh) 
$(cd click-tracker-dash && sh build.sh) 

docker-compose up -d
