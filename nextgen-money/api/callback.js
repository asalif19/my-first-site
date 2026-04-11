export default async function handler(req, res) {
  const { code } = req.query;

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token, error } = await tokenRes.json();

  if (error || !access_token) {
    return res.redirect('/admin?error=auth_failed');
  }

  res.redirect(`/admin?token=${access_token}`);
}
