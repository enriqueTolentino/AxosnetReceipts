import React, { Component, Fragment } from 'react';
import ReceiptsService from '../../services/ReceiptsService';
import ReceiptForm from '../../components/receipts/Form';
import { Redirect } from 'react-router-dom';
import CheckSession from '../../components/auth/CheckSession';

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

export class ReceiptsEdit extends Component {
	state = initialState;

    receiptsService = new ReceiptsService();
    
    async componentDidMount() {
        const { id } = this.props.match.params;
		this.setState({
			receipt: await this.receiptsService.GetReceiptById(id)
		});
	}

	editSubmit = async (receipt) => {
		const id = await this.receiptsService.Edit(receipt);

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
				<CheckSession />
				{redirectRender}
				<div className="section">
					<div className="card container">
						<div className="card-content">
							<h3 className="title">Edit Receipt</h3>
							<ReceiptForm receipt={receipt} formSubmit={this.editSubmit} />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ReceiptsEdit;
