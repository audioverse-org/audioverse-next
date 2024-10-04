#!/bin/bash

script_dir=$(dirname "$(realpath "$0")")
log_file=$script_dir/record.proxy.log

touch "$log_file"

tsx $script_dir/record.proxy.ts > "$log_file" 2>&1 &
proxy_pid=$!

sleep 5

if ! curl -s http://localhost:3001/healthcheck > /dev/null; then
  echo "Proxy server failed to start."
  kill $proxy_pid
  exit 1
fi

NEXT_PUBLIC_API_URL="http://localhost:3001/graphql" npm run build

kill $proxy_pid