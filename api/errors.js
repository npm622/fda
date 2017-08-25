const responseHandler = ( response, reason, message, code ) => {
  console.log( `ERROR: webapp encountered unexpected error: ${reason}` );
  response.status( code || 500 ).json( { 'error': message } );
};

module.exports = {
  responseHandler: responseHandler
};
