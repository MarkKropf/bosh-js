# bosh-js
An bosh client library in Javascript

## Quick Start

1. Install latest version of nodejs https://nodejs.org
2. Clone this repo
3. Create a config.json based on the provided sample with your bosh config
4. node ./test.js

All certificate authority certs must be rolled up into a single file bundle and referenced in the config.json.

## Troubleshooting

Set sslValidate to false in your config json if you get the following error and do not wish to use validated trusted certs.

```
events.js:85
      throw er; // Unhandled 'error' event
            ^
Error: unable to verify the first certificate
    at Error (native)
    at TLSSocket.<anonymous> (_tls_wrap.js:929:36)
    at TLSSocket.emit (events.js:104:17)
    at TLSSocket._finishInit (_tls_wrap.js:460:8)
```
