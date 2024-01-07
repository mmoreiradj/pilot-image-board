#!/bin/bash

set -e

COMMIT_SHA=$1
PR_NUMBER=$2

if [ -z "$COMMIT_SHA" ] || [ -z "$PR_NUMBER" ]; then
  echo "usage: $0 <commit_sha> <pr_number>"
  exit 1
fi

yq eval ".spec.source.helm.valuesObject" .infra/front.application.yaml > /tmp/front.values.yaml
yq eval ".spec.source.helm.valuesObject" .infra/back.application.yaml > /tmp/back.values.yaml

function update_ingress_values () {
  file_path=$1
  host=$2

  yq eval ".ingress.hosts[0].host = \"$host\"" -i $file_path
  yq eval ".ingress.tls[0].hosts[0] = \"$host\"" -i $file_path
  yq eval ".ingress.tls[0].secretName = \"$host-tls\"" -i $file_path
}

update_ingress_values /tmp/front.values.yaml pilot-image-board-pr-$PR_NUMBER.do.moreiradj.net
update_ingress_values /tmp/back.values.yaml api.pilot-image-board-pr-$PR_NUMBER.do.moreiradj.net

yq eval ".image.tag = \"$COMMIT_SHA\"" -i /tmp/front.values.yaml

yq eval ".image.tag = \"$COMMIT_SHA\"" -i /tmp/back.values.yaml
yq eval ".migration.image.tag = \"$COMMIT_SHA\"" -i /tmp/back.values.yaml
yq eval ".postgresql.auth.existingSecret = \"pilot-image-board-pr-$PR_NUMBER-back-postgresql\"" -i /tmp/back.values.yaml

echo "Created values files for front at /tmp/front.values.yaml and back at /tmp/back.values.yaml"
