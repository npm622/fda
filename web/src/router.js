import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LandingPage, DraftBoard} from './components';

const FdaRouter = () => {
  <Router>
    <div>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/leagues/:leagueId/draft-board" component={DraftBoard} />
    </div>
  </Router>
};

export default FdaRouter;
