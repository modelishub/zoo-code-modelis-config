# zoo-code-modelis-config

**Drop-in provider config for Zoo Code / Roo Code / Cline / Continue** — point at [Modelis](https://modelishub.com) (OpenAI-compatible, one key routes to GPT/Claude/Gemini/DeepSeek/Grok/Qwen, flat predictable pricing) in under 2 minutes.

Migrating off Roo Code (shut down)? This is the fastest path to a working provider config on the fork.

---

## 1. Get a free key (no card)

👉 https://modelishub.com/pricing — pick "Get your free API key on RapidAPI", subscribe to the free tier, copy your `X-RapidAPI-Key`.

## 2. Run the local bridge (one command)

Cline/Roo/Zoo send `Authorization: Bearer`; RapidAPI wants `X-RapidAPI-Key`. This bridges it:

```bash
npx modelis-openai
```

Leave it running. It listens on `http://127.0.0.1:8787`. Source (~120 lines, zero deps, read it before trusting it): https://github.com/modelishub/modelis-openai

## 3. Paste the config

### Zoo Code / Roo Code / Cline
Settings → **API Provider: `OpenAI Compatible`**
| Field | Value |
|---|---|
| Base URL | `http://127.0.0.1:8787/v1` |
| API Key | *your RapidAPI key* |
| Model ID | `modelis-auto` |

Or copy [`cline-settings.json`](./cline-settings.json) values directly.

### Continue
Copy [`continue-config.yaml`](./continue-config.yaml) into `~/.continue/config.yaml` (or merge the `models:` entry).

### Verify it's alive
```bash
node verify.mjs
# or: curl http://127.0.0.1:8787/health
```

---

## Model picker

| Write this | Get |
|---|---|
| `modelis-auto` | balanced default, auto-picks per request |
| `modelis-auto:basic` / `:standard` / `:premium` | pick the quality tier |
| `modelis-auto:claude-sonnet-4-6` (etc.) | pin an exact model |

Streaming + tool-calling both verified working — the two things agentic tools actually need.

## Why not just use the vendor's own key?

- **One key, every model** — no juggling separate OpenAI/Anthropic/Google keys as you switch tasks.
- **Flat per-call pricing** — an agent's retry loops don't spike your bill the way raw per-token metering does.
- **Zero migration** — OpenAI-compatible wire protocol, so it's a base_url swap, not a rewrite.

Not affiliated with Roo Code / Zoo Code / Cline / Continue — this is an independent config repo for people migrating providers.

## License

MIT — copy anything here into your own dotfiles.
