import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components Import
import Header from './components/layout/Header';

// View Imports
import Home from './views/Home';

function App() {
	return (
		<Router>
			<Fragment>
				<Header />
				<div className="container is-fluid site-content">
					<Switch>
						<Route exact path="/" component={Home} />
						{/* <Route exact path="/login" component={Login} /> */}
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
}

export default App;
