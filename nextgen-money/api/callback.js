export default async function handler(req, res) {
  const { code, state } = req.query;

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
      state,
    }),
  });

  const { access_token, error } = await tokenRes.json();

  if (error || !access_token) {
    const msg = JSON.stringify({ error: error || 'no_token' });
    return res.send(`<script>
      window.opener.postMessage('authorization:github:error:${msg}', '*');
      window.close();
    </script>`);
  }

  const token = JSON.stringify({ token: access_token, provider: 'github' });
  res.send(`<script>
    window.opener.postMessage('authorization:github:success:${token}', '*');
    window.close();
  </script>`);
}
