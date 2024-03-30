# backend-v2
TypeScript implement of [edgeless-rearend-v2](https://github.com/EdgelessPE/ept-rearend-v2), using AList as storage provider

## Test with Caddy
run command `.\caddy run -c caddy.cfg -a caddyfile`

caddy.cfg:

```
pineapple.edgeless.top {
    reverse_proxy localhost:3000
    tls pineapple.edgeless.top_bundle.crt pineapple.edgeless.top.key
}
```