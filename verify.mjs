#!/usr/bin/env node
// Zero-dependency smoke test for the modelis-openai local bridge.
// Usage: node verify.mjs   (run `npx modelis-openai` in another terminal first)
import http from 'node:http';

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port: 8787, path, method: 'GET' }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

function post(path, payload, headers = {}) {
  const data = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: '127.0.0.1', port: 8787, path, method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data), ...headers } },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const health = await get('/health').catch((e) => ({ error: e.message }));
if (health.error) {
  console.error(`✗ Can't reach http://127.0.0.1:8787 — is \`npx modelis-openai\` running? (${health.error})`);
  process.exit(1);
}
console.log(`✓ Local bridge is up (health ${health.status})`);

const key = process.env.MODELIS_RAPIDAPI_KEY;
if (!key) {
  console.log('… Skipping live call (set MODELIS_RAPIDAPI_KEY to your RapidAPI key to test a real request).');
  process.exit(0);
}

const chat = await post(
  '/v1/chat/completions',
  { model: 'modelis-auto', messages: [{ role: 'user', content: 'Reply with exactly: ok' }] },
  { Authorization: `Bearer ${key}` }
).catch((e) => ({ error: e.message }));

if (chat.error || chat.status !== 200) {
  console.error(`✗ Chat completion failed (status ${chat.status ?? 'n/a'}): ${chat.body ?? chat.error}`);
  process.exit(1);
}
console.log(`✓ Live chat completion succeeded: ${chat.body.slice(0, 200)}`);
