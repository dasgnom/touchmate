module.exports = {
  api_url: 'http://localhost:8080/v3/',
  timezone_api: 'UTC',
  timezone_client: 'Europe/Berlin',
  datetimeformat: 'YYYY-MM-DD HH:mm:ss',
  privacy: {
    user_created: true,
    user_updated: true,
    user_email: true,
  },
  gravatar: {
    use: false, // if set to false assets/img/user.png is used as fallback
    base_url: 'https://www.gravatar.com/avatar/', // requires trailing slash!
    fallback: 'retro', // see https://de.gravatar.com/site/implement/images/ for details
    size: 200,
    rating: 'x', // see https://de.gravatar.com/site/implement/images/ for details
  },
};
