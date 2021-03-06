GAIAMA_CONTENT_URL="https://gitlab.com/api/v4/projects/$GAIAMA_CONTENT_ID/repository/archive?sha=$BRANCH&private_token=$GAIAMA_CONTENT_TOKEN"
GAIAMA_CONTENT_HASH=$(curl -sI "$GAIAMA_CONTENT_URL" | grep -o -E 'filename="[^"]+' | sed -e 's/filename="//' | sed -e 's/.tar.gz//')
GAIAMA_CACHE_BASE="$NETLIFY_BUILD_BASE/cache/gaiama"
# Directory named after the latest content repo hash
GAIAMA_CACHE_DIR="$GAIAMA_CACHE_BASE/$GAIAMA_CONTENT_HASH"
GAIAMA_CONTENT_TAR="$GAIAMA_CACHE_DIR/content.tgz"
GAIAMA_CONTENT_DIR="$NETLIFY_BUILD_BASE/repo/content"

# if cache dir not existent, it must be old or missing
if [ ! -d "$GAIAMA_CACHE_DIR" ]; then
  echo "Cached content missing or not up to date"
  # let's clean up, to remove old cache files
  if [ -d "$GAIAMA_CACHE_BASE" ]; then
    echo "Removing old cache directory..."
    rm -Rf $GAIAMA_CACHE_DIR
    echo "Removed old cache directory"
  fi
  echo "Creating cache directory.."
  mkdir -p $GAIAMA_CACHE_DIR
  echo "Created cache directory"
  echo "Fetching content.."
  wget -O $GAIAMA_CONTENT_TAR $GAIAMA_CONTENT_URL
  echo "Content successfully fetched"
fi

echo "Creating content directory"
mkdir -p "$GAIAMA_CONTENT_DIR"
echo "Created content directory"
echo "Extracting tarball"
tar -xzf $GAIAMA_CONTENT_TAR -C "$GAIAMA_CONTENT_DIR"
echo "Extracted tarball"

echo "starting to build.."
yarn build
