#!/bin/bash

NETWORK=$1
FILE=$NETWORK'.json'
DATA=manifest/data/$FILE

if [ -z "$2" ] 
  then
    echo "No Module argument supplied"
    ZARAGOZA_CONTRACTS_MODULE=$(node -e 'console.log(require("path").dirname(require.resolve("@aragon/zaragoza-contracts/package.json")))')
  else
    echo "Module argument supplied"
    ZARAGOZA_CONTRACTS_MODULE=$2
fi

echo 'Generating manifest from data file: '$DATA
cat $DATA

mustache \
  $DATA \
  manifest/subgraph.placeholder.yaml \
  | sed -e "s#\$ZARAGOZA_CONTRACTS_MODULE#$ZARAGOZA_CONTRACTS_MODULE#g" \
  > subgraph.yaml
