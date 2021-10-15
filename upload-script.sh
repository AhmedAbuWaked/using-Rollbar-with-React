version=$(git rev-parse HEAD)
for filename in ./sourceMaps/*; do
  sliced=${filename//.\/sourceMaps/""}
  without_map=${sliced//.map/""}
  minified_url=//localhost:3000/static/js$without_map
  source_map=@${filename//.\//""}

  curl https://api.rollbar.com/api/1/sourcemap \
  -F access_token=d0ec87ec5c97449fac49285bab41f7a4 \
  -F version="$version" \
  -F minified_url=$minified_url \
  -F source_map="$source_map"
done
