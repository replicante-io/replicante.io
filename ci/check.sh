#!/bin/bash -ex
#
# Usage: ci/check.sh
#
(cd themes/replicante/src; npm outdated || true)
