#!/bin/bash

# Check for version number input
if [ -z "$1" ]; then
  echo "Please provide a version number (e.g., v1.2.3)."
  exit 1
fi

VERSION=$1
DATE=$(date +"%Y-%m-%d")

# Create a new directory for the version
mkdir -p ../archive/$VERSION

# Copy current prototype to the new version directory
cp -r ../current/* ../archive/$VERSION/

# Update the index page with a new link
echo "<a href='./archive/$VERSION'>Version $VERSION ($DATE)</a>" >> ../index.html

echo "Version $VERSION archived successfully."