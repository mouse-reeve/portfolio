#!/bin/bash

source bin/activate
echo "import activity;activity.update();exit()" | python
