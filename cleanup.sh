#!/bin/bash

function cleanup() {
    folder=${1}
    echo "processing ${folder}"
    mkdir -p ${folder}
    cd ${folder}
    find ./* -mmin +40 -type d -exec rm -rf {} \;
}
echo `date`
cleanup "/mnt/yarn/usercache/root/filecache/"
cleanup "/mnt/yarn/usercache/hadoop/filecache/"