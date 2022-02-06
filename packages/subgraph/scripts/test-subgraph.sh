#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [ ! -d "$PWD/build/" ]; then
  echo "The /build doesn’t exist. Did you run: yarn build ?"
  exit 1
fi

if [ -z $TEST_BINARY ]
then
  TEST_BINARY="binary-linux-20"
fi

rm -r tests/.bin

curl -OL https://github.com/LimeChain/matchstick/releases/download/0.2.3/$TEST_BINARY
chmod a+x $TEST_BINARY

./$TEST_BINARY

rm $TEST_BINARY
