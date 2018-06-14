#!/bin/bash -e
usage() {
  echo "Usage: ./build-books.sh"
  exit ${1:-1}
}


### main ###
while [ $# -ne 0 ]; do
  arg=$1
  shift

  case ${arg} in
    --help)
      usage 0;;
    *)
      echo "Unknown argument: ${arg}"
      usage;;
  esac
done


### re-build all current books ###
echo "Re building master for all books ..."
./book.sh --clean manual master ../replicante/docs/manual/
./book.sh --clean specs master ../replicante/docs/specs/
echo "Done"
