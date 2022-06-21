module.exports = async (request, response) => {
  response.json({
    token: 'mock-jwt-token',
    loggedIn: true,
  });
  return;
};
