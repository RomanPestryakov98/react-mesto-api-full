import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import EmailContext from '../contexts/EmailContext';
import Header from './Header';
import Footer from './Footer';

function ProtectedRoute({ component: Component, ...props }) {
	const email = useContext(EmailContext);
	return (
		<Route>
			{() =>
				props.loggedIn ?
					<>
						<Header email={email} />
						<Component {...props} />
						<Footer />
					</>

					: <Redirect to="./sign-in" />
			}
		</Route>
	)
}

export default ProtectedRoute;