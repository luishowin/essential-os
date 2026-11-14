# Sprite proxy Worker

The Cloudflare Worker that lets the site's Sprite widget talk to Fireworks
without shipping the API key to visitors.

- Worker URL used by the site:
  `https://essential-os-sprite.howin329.workers.dev`
- Source file to paste into Cloudflare: [`sprite-proxy.js`](sprite-proxy.js)
- Facts the model may use: [`../site/sprite.md`](../site/sprite.md)

The browser sends `{ messages, page }`; the Worker adds the system prompt and
the fetched knowledge file, calls Fireworks, strips the hidden emotion tag and
returns `{ reply, emotion }`.

## Deploy

1. Open <https://dash.cloudflare.com> → **Workers & Pages** →
   `essential-os-sprite`.
2. **Edit code**. Delete the starter, paste the whole of
   [`sprite-proxy.js`](sprite-proxy.js), then **Deploy**.
3. **Settings → Variables and Secrets**:
   - Add secret `FIREWORKS_API_KEY`. Create it at
     <https://app.fireworks.ai>. Never put it in the repository or send it in a
     chat.
   - Optional variable `MODEL`. The default is
     `accounts/fireworks/models/gpt-oss-120b`; the model page must say
     "Serverless: supported".
4. Test it:

```bash
curl -s -X POST 'https://essential-os-sprite.howin329.workers.dev' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://luishowin.github.io' \
  -d '{"messages":[{"role":"user","content":"What is Essential OS?"}],"page":{"path":"/essential-os/"}}'
```

Expected: `{"reply":"...","emotion":"..."}`. A disallowed `Origin` returns
`403`; a missing key returns `500 worker is not configured`.

The knowledge file is fetched from
`https://luishowin.github.io/essential-os/sprite.md` and cached for five
minutes. If the site is not deployed yet, or the fetch fails, the Worker keeps
the last good copy and the baked-in prompt still works.

## Limits in the file

| Limit | Value | Why |
| --- | --- | --- |
| `MAX_HISTORY` | 12 messages | Stops a long conversation from growing the bill. |
| `MAX_MSG_CHARS` | 1000 per message | Caps prompt injection size and cost. |
| `MAX_BODY_CHARS` | 24000 | Rejects oversized bodies before parsing. |
| `MAX_TOKENS` | 700 | Reply ceiling, reasoning tokens included. |
| `KNOWLEDGE_MAX_CHARS` | 12000 | Keeps the system prompt within budget. |

Upstream errors are logged in the Worker but returned as
`{"error":"upstream unavailable"}` so a key or quota problem is not exposed.

## Cost and abuse

- Fireworks bills per token. Set a **credit or spend alert** in the Fireworks
  dashboard. A key is account-wide, so the balance is the real ceiling.
- Cloudflare's free Workers plan caps requests per day. `workers.dev` hostnames
  do not support zone-level WAF rate-limiting rules.
- If abuse appears, the cheapest next step is a small KV or Durable Object
  per-IP limiter in this file; a custom domain behind Cloudflare enables WAF
  rate limiting instead.
- The CORS list includes `https://luishowin.github.io` as a whole, so any Pages
  project under that account can call the Worker. That is normal for CORS and
  acceptable here; narrow it if another project ever shares the origin with
  untrusted code.

## Privacy

Messages go from the browser to this Worker and then to Fireworks to produce a
reply. The site stores chat history in the browser's `sessionStorage` only. The
Worker keeps no visitor log beyond Cloudflare's normal request telemetry.
