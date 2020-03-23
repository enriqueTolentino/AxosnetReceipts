import React, { Component } from 'react';
import ReceiptForm from '../../components/receipts/Form';

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
	render() {
		const { receipt } = this.state;
		return (
			<div className="section">
				<div className="card container">
					<div className="card-content">
						<h3 className="title">New Receipt</h3>
						<ReceiptForm receipt={receipt} />
					</div>
				</div>
			</div>
		);
	}
}

export default ReceipstCreate;
