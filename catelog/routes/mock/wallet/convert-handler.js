module.exports = async (request, response) => {
  const apiKey = request.header('Ocp-Apim-Subscription-Key');
  const jwtToken = request.header('Authorization');
  if (!apiKey || !jwtToken) {
    response.status(401).json(accessDenied);
    return;
  }

  response.send('126 award miles accrued for MP# 300020350 under transaction WRI-1601674262');
  return;
};

const accessDenied = {
  'statusCode': 401,
  'message': 'Access denied due to missing subscription key. ' +
    'Make sure to include subscription key when making requests to an API.',
};
