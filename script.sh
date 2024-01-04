#!/bin/bash

APP_VERSION="1.2.3"
CHART_FILE="./.kubernetes/charts/back/Chart.yaml"

sed -i "s/appVersion: \".*\"/appVersion: \"$APP_VERSION\"/" "$CHART_FILE"

current_version=$(awk '/version:/ {print $2}' "$CHART_FILE")
IFS='.' read -r major minor patch <<< "$current_version"
new_minor=$((minor + 1))
new_version="$major.$new_minor.$patch"
sed -i "s/version: .*/ version: \"$new_version\"/" "$CHART_FILE"
