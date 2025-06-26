#!/bin/sh

http-server dist/client &

node /app/server.js 
