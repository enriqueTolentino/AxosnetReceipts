import React, { Component } from 'react';
import ReceiptForm from '../../components/receipts/Form';

export class ReceipstCreate extends Component {
	render() {
		return (
			<div className="section">
				<div className="card container">
					<div className="card-content">
						<h3 className="title">New Receipt</h3>
                        <ReceiptForm />
					</div>
				</div>
			</div>
		);
	}
}

export default ReceipstCreate;
