# Minecraft Cape Proxy

! NOTICE ! The README is under construction.

Redirect to an API proxy for sessionserver instead of installing mods to enjoy custom capes in vanilla versions.

# Usage
First, you must setup HTTPS certificates and key. You should use trusted certificate, but you can alternatively use a self-signed certificate when testing. You can run following to generate a self-signed certificate:

`yarn run generate_key` Generates a key to dev/key.pem  
`yarn run generate_csr` Generate a CSR for creating a certificate (will prompt DN information) with the key at dev/key.pem and saves it to dev/csr.pem  
`yarn run generate_cert` Generates a certificate with dev/key.pem and dev/csr.pem and saves it to dev/cert.pem.

If you already have a key and certificate, place the key as dev/key.pem and certificate as dev/cert.pem.

Alternatively, if you do not wish to use HTTPS or HTTPS is already set up, set the environment variable USE_HTTP.