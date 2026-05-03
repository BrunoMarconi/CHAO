export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ ok: false });

  const secret = process.env.RECAPTCHA_SECRET;
  const r = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`
  });
  const data = await r.json();
  // score >= 0.5 = humano, < 0.5 = probable bot
  res.json({ ok: data.success && data.score >= 0.5, score: data.score });
}
