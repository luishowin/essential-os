# Sprite (vendored)

`sprite.js` and `sprite.css` are unmodified copies of
[luishowin/sprite](https://github.com/luishowin/sprite), MIT licensed.

- Source commit: `716538b`
- Upstream version: 2.0.0 plus the unreleased site-agnostic changes
- Configuration for this site: [`../sprite-config.js`](../sprite-config.js)

To update:

```bash
cd /path/to/sprite
git pull
cp sprite.js sprite.css /path/to/essential-os/site/sprite/
```

Then update the commit hash above and test the widget locally. Do not edit the
vendored files: site copy belongs in `sprite-config.js`, and behaviour belongs
upstream.

`index.html` sets a small fail-closed `SPRITE_CONFIG` before loading
`sprite-config.js`, so a missing config file leaves the widget offline rather
than falling back to Sprite's Beben defaults. Keep that guard in place.
