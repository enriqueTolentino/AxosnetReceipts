import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReceiptsService from '../../services/ReceiptsService';

const initialState = {
	receipts: []
};

export class ReceiptsIndex extends Component {
    state = initialState;

    receiptsService = new ReceiptsService();

    async componentDidMount() {
		this.setState({
			receipts: await this.receiptsService.GetAllReceipts()
		});
	}

	render() {
        const {receipts} = this.state;
        console.log(receipts);
		return (
			<Fragment>
				<div className="section">
					<div className="card container">
						<div className="card-content">
							<h3 className="title">My Receipts</h3>
							<Link to="/receipts/create" className="button is-link">
								<i className="fas fa-plus fa-fw" />New Receipt
							</Link>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ReceiptsIndex;
