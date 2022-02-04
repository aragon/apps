#!/bin/bash

if [ ! -d "$PWD/build/" ]; then
  echo "The /build doesn’t exist. Did you run: yarn build ?"
  exit 1
fi

rm -r tests/.bin

curl -OL https://github.com/LimeChain/matchstick/releases/download/0.2.3/binary-linux-20
chmod a+x binary-linux-20

./binary-linux-20

rm binary-linux-20
