class FdaClient {

  static fetchAllLeagues() {
    return fetch( '/leagues' )
      .then( res => res.json() )
      .catch( err => err );
  }

  static fetchLeagueById(id) {
    return fetch( `/leagues/${id}` )
      .then( res => res.json() )
      .catch( err => err );
  }

  static fetchAllPlayers() {
    return fetch( '/players' )
      .then( res => res.json() )
      .catch( err => err );
  }
}

export default FdaClient;
