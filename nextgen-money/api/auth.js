export default function handler(req, res) {
  const host = req.headers.host;
  const proto = host.startsWith('localhost') ? 'http' : 'https';
  const redirectUri = `${proto}://${host}/api/callback`;

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state: req.query.state || '',
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
