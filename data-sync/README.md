# Data Sync Ops

Dockerfile and scripts for copying production data to the staging database.
This image is used in a cron job which runs on the staging and production Kubernetes
clusters each Monday morning.

## Deploying changes

After changing any files in the `data-sync` directory,
run `data-sync/publish-sync-dockerfile.sh` to build and publish the
new sync image.
