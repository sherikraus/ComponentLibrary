// eslint-disable-next-line
const router = require('express').Router();

const routes = {
  '/account/jwt': require('./account').jwt, // GET
  '/wallet/conversionamounts': require('./wallet').conversionamounts, // GET
  '/wallet/convert': require('./wallet').convert, // POST

  // Add any additional mock API handlers here.
};

const mockHandler = async (request, response) => {
  const handler = routes[request.path];
  if (!handler) {
    response
        .status(404)
        .json({message: `API Method (${request.path}) not found`});
    return;
  }
  try {
    await handler(request, response);
    return;
  } catch (e) {
    console.error(`Mock api failed. Path: ${request.path}. Error:`, e);
    response.status(500).json(e);
    return;
  }
};

router.get('mock/*', mockHandler);
router.post('mock/*', mockHandler);

module.exports = router;
