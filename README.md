# zoo-code-modelis-config

**Drop-in provider config for Zoo Code / Roo Code / Cline / Continue** — point at [Modelis](https://modelishub.com) (OpenAI-compatible gateway, one key for ~95 models; `modelis-auto` billed per call within tier limits) in under 2 minutes.

Migrating off Roo Code (shut down)? This is the fastest path to a working provider config on the fork.

---

## 1. Get a key

New accounts get **$1 free credit**. Sign up at [modelishub.com](https://modelishub.com) and copy your API key.

Add credit from the Modelis console when you need more:

- Card, via Creem
- Alipay or WeChat, via Afdian

## 2. Paste the config

Modelis is an OpenAI-compatible gateway. Base URL: `https://modelishub.com/v1`.

### Zoo Code / Roo Code / Cline

Settings → **API Provider: `OpenAI Compatible`**

| Field | Value |
|---|---|
| Base URL | `https://modelishub.com/v1` |
| API Key | *your Modelis API key* |
| Model ID | `modelis-auto` |

`modelis-auto` is the standard tier (same as `modelis-auto:standard`). Or copy [`cline-settings.json`](./cline-settings.json) values directly.

### Continue

Copy [`continue-config.yaml`](./continue-config.yaml) into `~/.continue/config.yaml` (or merge the `models:` entries).

### Verify it's alive

```bash
curl https://modelishub.com/v1/chat/completions \
  -H "Authorization: Bearer $MODELIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"modelis-auto","messages":[{"role":"user","content":"Reply with exactly: ok"}]}'
```

---

## Model picker

Tier selection uses these colon names. `modelis-auto` is the standard tier.

| Write this | Within-limit price | Included tokens |
|---|---|---|
| `modelis-auto` or `modelis-auto:standard` | $0.02 per call | 8k input / 2k output |
| `modelis-auto:basic` | $0.004 per call | 4k input / 1k output |
| `modelis-auto:premium` | $0.05 per call | 4k input / 1k output |

A call that stays inside that tier's input and output limits pays the per-call price. Usage above those limits is billed per token.

Named models are requested with their upstream model id and billed at the upstream price + 15%. The 15% is applied at top-up.

Streaming and tool-calling both work — the two things agentic tools actually need.

## Why not just use the vendor's own key?

- **One key, ~95 models** — no juggling separate OpenAI/Anthropic/Google keys as you switch tasks.
- **Per-call pricing on `modelis-auto`** — each request within the tier's token allowance costs the same, so retry loops are easy to budget. Usage above that allowance is billed per token. Named models are upstream price + 15% (applied at top-up).
- **Zero migration** — OpenAI-compatible wire protocol, so it's a base URL swap to `https://modelishub.com/v1`, not a rewrite.

Not affiliated with Roo Code / Zoo Code / Cline / Continue — this is an independent config repo for people migrating providers.

## License

MIT — copy anything here into your own dotfiles.
