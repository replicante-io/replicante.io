#!/bin/bash -e
usage() {
  echo "Usage: ./book.sh [OPTIONS] BOOK VERSION SOURCE"
  echo "  BOOK     Name of the book to build"
  echo "  VERSION  Name of the version to build"
  echo "  SOURCE   Path to the book sources"
  echo ""
  echo "The following options are also available:"
  echo "  --clean  Delete the output directory before building"
  echo "  --help   Show this error message"
  exit ${1:-1}
}


### main ###
clean="no"
book=""
version=""
src=""

while [ $# -ne 0 ]; do
  arg=$1
  shift

  case ${arg} in
    # Options
    --clean) clean="yes";;
    --help)  usage 0;;

    # Non-options arguments
    [^-]*)
      if [ $# -ne 2 ]; then
        echo "Invalid number of arguments"
        usage
      fi
      book=${arg}
      version=${1}
      src=${2}
      shift 2
      ;;

    # Anything else
    *)
      echo "Unknown argument: ${arg}"
      usage;;
  esac
done

target="static/docs/${book}/${version}/"
if [ "${clean}" == "yes" ]; then
  echo "Deleteing '${version}' of '${book}' from '${target}'"
  rm -r "${target}"
  echo "Done"
fi

echo "Will build '${version}' version of '${book}' from '${src}' ..."
gitbook build "${src}" "${target}"
echo "Done"
