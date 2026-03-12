---
name: sniff-test
description: Bring up the server locally and exercise a large swath of its functionality directly via a browser.
---

# Sniff test


- [ ] Bring up a server
- [ ] Use Chrome Devtools MCP to open Chrome
- [ ] Ask user to log in
- [ ] Perform manual verification


## Bring up a server

- Kill whatever process is running on port :5000: `lsof -ti:5000 | xargs kill -9 2>/dev/null; echo "Port 5000 cleared"`
- Bring up the local dev server: `foreman start -f Procfile.dev`
- Wait for server: `until nc -z localhost 5000; do sleep 1; date; done; echo "Ready"`
- When ready, continue

## Use Chrome Devtools MCP to open Chrome

- Use the Chrome Devtools MCP server to open a browser to http://localhost:5000

## Ask user to log in

- Use `AskUserQuestion` to prompt the user to
  - enter their credentials to log into the locally running app in Chrome Devtools MCP/Chrome
  - confirm when they are done so you can proceed

## Perform manual verification

### Enter a gene

- In the "Add a gene" field type `print` and select the option `Prints`
- Eventually the app should show a grid of artworks (some images may be blank -- that is ok)

### Enter a tag

- In the "Add a tag" field type `woman` and select the option `Woman`
- Eventually the app should update and show a different grid of artworks

### Enter an artist

- In the "Add an artist" field type `shahzia` and select the option `Shahzia Sikander`
- Eventually the app should update and show a different grid of artworks

### Enter a gallery

- In the "Select a partner" field type `pace` and select the option `Pace Prints`
- Eventually the app should update and show the same artwork result

### Enter a fair

- In the "Select a fair" field type `ifpda` and select the option `IFPDA Print Fair 2016`
- Eventually the app should update and show the same artwork result

## Tear down the server

- Kill the server process that you spawned with `foreman`
