export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.redirect('/admin?error=no_code');
  }

  const clientId = (process.env.OAUTH_CLIENT_ID || '').trim();
  const clientSecret = (process.env.OAUTH_CLIENT_SECRET || '').trim();

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const json = await tokenRes.json();
  const { access_token, error, error_description } = json;

  if (error || !access_token) {
    return res.redirect(`/admin?error=${encodeURIComponent(error_description || error || 'unknown')}`);
  }

  res.redirect(`/admin?token=${access_token}`);
}
