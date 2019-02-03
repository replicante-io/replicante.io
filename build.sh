#!/bin/bash
set -e

# Keep track of some options
CLEAN="no"
DIST_PATH="dist/"
DOCS_PATH="static/docs"


# Helper functions
## Build https://docusaurus.io/ project and copy it into the sites statics.
docubuild() {
  name=$1
  project=$2
  doc_project=$3
  target="${DOCS_PATH}/${name}"
  echo "---> Building docusaurus project '${name}' ..."

  # Move to project directory and build.
  (cd "${project}/website"; npm run build)

  # Maybe clean and copy built project.
  if [ "${CLEAN}" == "yes" ]; then
    echo "---> Cleaning '${name}' target '${target}' ..."
    rm -r "${target}"
  fi
  echo "---> Copying '${name}' docs into '${target}' ..."
  cp --no-target-directory -r "${project}/website/build/${doc_project}" "${target}"
  echo '---> Done'
}

## Print script usage and exit.
usage() {
  echo 'Usage: ./build.sh [options]'
  echo ''
  echo 'Helper script to build replicante.io'
  echo ''
  echo 'Options:'
  echo '  --clean         Deletes the dest/ directory before re-creating it'
  echo '  -h|--help|help  Print this message and exit'
}


# Parse the given arguments
while [ $# -ne 0 ]; do
  arg=$1
  shift

  case "${arg}" in
    --clean)
      CLEAN="yes"
      ;;
    -h|--help|help)
      usage
      exit 0
      ;;
    *)
      echo "Unrecognised argument '${arg}'"
      usage
      exit 1
      ;;
  esac
done


# Start by building docusaurus sites
echo '--> Building docs ...'
docubuild 'agents' '../agents/docs' 'replicante'
docubuild 'manual' '../replicante/docs/manual' 'replicante'
docubuild 'notes' '../replicante/docs/notes' 'replicante'
docubuild 'specs' '../replicante/docs/specs' 'replicante'
echo '--> Done'

# Finally build the site itself.
echo '--> Building site ...'
if [ "${CLEAN}" == "yes" ]; then
  echo "--> Cleaning site target ${DIST_PATH}"
  rm -r "${DIST_PATH}"
fi
hugo
echo '--> Done'
