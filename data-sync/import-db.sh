#!/bin/bash

start_datetime=$(date -u +"%D %T %Z")
echo "[data export] Starting at $start_datetime"

aws s3 cp s3://artsy-data/rosalind/archive.pgdump archive.pgdump

pg_restore archive.pgdump -c -O -x -d $DATABASE_URL

end_datetime=$(date -u +"%D %T %Z")
echo "[data export] Ended at $end_datetime"
