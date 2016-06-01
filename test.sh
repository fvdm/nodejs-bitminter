#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$CODECLIMATE_REPO_TOKEN" != "" ]; then
  istanbul cover test.js --print none --report lcovonly
  codeclimate-test-reporter < ./coverage/lcov.info
else
  node test.js
fi

