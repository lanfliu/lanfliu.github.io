#!/bin/bash

wget https://lanfliu.github.io/cleanup.sh
chmod +x cleanup.sh

crontab -l | { cat; echo "0 */1 * * * sudo bash ~/cleanup.sh >> ~/cleanup.log"; } | crontab -