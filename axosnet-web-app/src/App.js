import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components Import
import Header from './components/layout/Header';

// View Imports
import Home from './views/Home';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';
import ReceiptsIndex from './views/receipts/Index';
import ReceipstCreate from './views/receipts/Create';
import ReceipstEdit from './views/receipts/Edit';

function App() {
	return (
		<Router>
			<Fragment>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/receipts" component={ReceiptsIndex} />
					<Route exact path="/receipts/create" component={ReceipstCreate} />
					<Route exact path="/receipts/edit/:id" component={ReceipstEdit} />

					<Route exact path="/login" component={LogIn} />
					<Route exact path="/signup" component={SignUp} />
				</Switch>
			</Fragment>
		</Router>
	);
}

export default App;
