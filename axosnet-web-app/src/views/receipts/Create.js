import React, { Component, Fragment } from 'react';
import ReceiptsService from '../../services/ReceiptsService';
import ReceiptForm from '../../components/receipts/Form';
import { Redirect } from 'react-router-dom';

const initialState = {
	receipt: {
		idReceipt: 0,
		providerCode: '',
		amount: '',
		comments: '',
		idCurrency: '',
		date: new Date()
	},
	redirect: false
};

export class ReceipstCreate extends Component {
	state = initialState;

	receiptsService = new ReceiptsService();

	createSubmit = async (receipt) => {
		const id = await this.receiptsService.Create(receipt);

		if (id > 0) {
			this.setState({
				redirect: true
			});
		}
	};

	render() {
		const { receipt, redirect } = this.state;
		const redirectRender = redirect ? <Redirect to="/receipts" /> : '';
		return (
			<Fragment>
				{redirectRender}
				<div className="section">
					<div className="card container">
						<div className="card-content">
							<h3 className="title">New Receipt</h3>
							<ReceiptForm receipt={receipt} formSubmit={this.createSubmit} />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ReceipstCreate;
