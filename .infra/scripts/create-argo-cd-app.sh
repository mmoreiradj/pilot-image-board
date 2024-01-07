#!/bin/bash

set -e

APP_NAME="$1"
NAMESPACE="$2"
COMMIT_SHA="$3"
HELM_VALUES_FILE="$4"
CHART="$5"

if [ -z "$APP_NAME" ] || [ -z "$NAMESPACE" ] || [ -z "$COMMIT_SHA" ] || [ -z "$HELM_VALUES_FILE" ] || [ -z "$CHART" ]; then
  echo "usage: $0 <app_name> <namespace> <commit_sha> <helm_values_file> <chart>"
  exit 1
fi

argocd app create "$APP_NAME" \
  --repo 'https://github.com/mmoreiradj/pilot-image-board.git' \
  --path ".infra/charts/$CHART" \
  --dest-server 'https://kubernetes.default.svc' \
  --dest-namespace "$NAMESPACE" \
  --revision "$COMMIT_SHA" \
  --project 'mmoreiradj' \
  --values-literal-file $HELM_VALUES_FILE \
  --sync-policy automated \
  --auto-prune \
  --self-heal \
  --allow-empty \
  --sync-option Validate=false \
  --sync-option CreateNamespace=true \
  --sync-option PrunePropagationPolicy=foreground \
  --sync-option PruneLast=true \
  --sync-option RespectIgnoreDifferences=true \
  --sync-retry-limit 5 \
  --sync-retry-backoff-duration 5s \
  --sync-retry-backoff-factor 2 \
  --sync-retry-backoff-max-duration 3m \
  --revision-history-limit 3 \
  --upsert \
  --grpc-web
