#!/bin/bash

rm ./public/index.html
mv -r ./public/img ./dist/img
cp ./public/* ./dist/
