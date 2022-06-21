module.exports = async (request, response) => {
  const mpn = request.query.mileagePlanNumber;
  if (!mpn) {
    response.status(404);
    return;
  }

  const apiKey = request.header('Ocp-Apim-Subscription-Key');
  const jwtToken = request.header('Authorization');
  if (!apiKey || !jwtToken) {
    response.status(401);
    return;
  }

  if (mpn === '000') {
    response
        .status(200)
        .json({
          'conversionAmounts': [
            {},
            {},
            {},
            {},
          ],
          'toUnitDisplayName': 'miles',
        });
    return;
  }

  response
      .status(200)
      .json({
        'conversionAmounts': [{
          'from': 1443.08,
          'to': 144308,
        },
        {
          'from': 1082.31,
          'to': 108231,
        },
        {
          'from': 721.54,
          'to': 72154,
        },
        {
          'from': 360.77,
          'to': 36077,
        },
        ],
        'currentBalance': 1443.08,
        'toUnitDisplayName': 'miles',
      });
  return;
};

