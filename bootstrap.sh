#!/bin/sh

if which gitbook 2>/dev/null; then
  echo "gitbook installed."
else
  echo "no gitbook installed. Begin to install."
  npm i gitbook -g
fi

cd ./docs
gitbook install
exit 0;
