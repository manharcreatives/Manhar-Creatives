const BASE_URLS = [
  'https://aiapiv2.pekpik.com/v1/chat/completions',
  'https://api.pekpik.com/v1/chat/completions',
];

const BACKUP_KEYS = [
  { key: process.env.LLM_KEY_1 || '', model: 'smart-chat', label: 'LLM_KEY_1' },
  { key: process.env.LLM_KEY_2 || '', model: 'smart-chat', label: 'LLM_KEY_2' },
  { key: process.env.LLM_KEY_3 || '', model: 'smart-chat', label: 'LLM_KEY_3' },
  { key: process.env.LLM_KEY_4 || '', model: 'deepseek-chat', label: 'LLM_KEY_4' },
  { key: process.env.LLM_KEY_5 || '', model: 'deepseek-chat', label: 'LLM_KEY_5' },
];

async function testKey(provider, baseUrl) {
  if (!provider.key) return { label: provider.label, model: provider.model, baseUrl, status: '❌ empty key', time: 0 };

  const start = Date.now();
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provider.key}`
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [{ role: 'user', content: 'Say "ok" in one word.' }],
        max_tokens: 10,
        temperature: 0.1
      }),
      signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined
    });

    const time = Date.now() - start;

    if (response.ok) {
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || '';
      return { label: provider.label, model: provider.model, baseUrl, status: '✅ OK', time: `${time}ms`, reply: reply.trim() };
    }

    const text = await response.text().catch(() => '');
    return { label: provider.label, model: provider.model, baseUrl, status: `❌ ${response.status}`, time: `${time}ms`, error: text.slice(0, 200) };
  } catch (e) {
    const time = Date.now() - start;
    return { label: provider.label, model: provider.model, baseUrl, status: '❌ error', time: `${time}ms`, error: e.message };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const results = [];

  for (const provider of BACKUP_KEYS) {
    for (const baseUrl of BASE_URLS) {
      results.push(await testKey(provider, baseUrl));
    }
  }

  // Find best
  const working = results.filter(r => r.status === '✅ OK');
  const best = working.length ? working.reduce((a, b) => {
    const aMs = parseInt(a.time);
    const bMs = parseInt(b.time);
    return aMs < bMs ? a : b;
  }) : null;

  return res.json({
    summary: {
      total: results.length,
      working: working.length,
      failed: results.length - working.length,
      bestKey: best ? `${best.label} (${best.model}) @ ${best.baseUrl} — ${best.time}` : 'none',
    },
    allKeysPresent: BACKUP_KEYS.filter(k => k.key).length,
    results
  });
}
