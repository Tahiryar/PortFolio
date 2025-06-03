const auth = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  
  if (!apiKey) {
    return res.status(401).json({ msg: 'No API key, authorization denied' });
  }

  try {
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ msg: 'Invalid API key' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = auth;