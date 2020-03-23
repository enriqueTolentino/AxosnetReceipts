import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReceiptsService from '../../services/ReceiptsService';
import { formatDate, formatNumber, convertUTCDateToLocalDate } from '../../helpers/Formats';
import ReceiptDelete from '../../components/receipts/Delete';

const initialState = {
	receipts: [],
	receiptDelete: {},
	modalActive: false
};

export class ReceiptsIndex extends Component {
	state = initialState;

	receiptsService = new ReceiptsService();

	async componentDidMount() {
		this.setState({
			receipts: await this.receiptsService.GetAllReceipts()
		});
	}

	activeDeleteModal = async (receiptDelete) => {
		this.setState({
			modalActive: !this.state.modalActive,
			receiptDelete,
			receipts: await this.receiptsService.GetAllReceipts()
		});
	};

	render() {
		const { receipts, receiptDelete, modalActive } = this.state;
		const modalDelete = modalActive ? (
			<ReceiptDelete idReceipt={receiptDelete.idReceipt} activeDeleteModal={this.activeDeleteModal} />
		) : (
			''
		);
		return (
			<Fragment>
				<div className="section">
					<div className="card container">
						<div className="card-content">
							<h3 className="title">My Receipts</h3>
							<Link to="/receipts/create" className="button is-link">
								<i className="fas fa-plus fa-fw" />New Receipt
							</Link>
							<div className="table-container m-t-md">
								<table className="table is-fullwidth is-hoverable is-striped">
									<thead>
										<tr className="is-selected has-background-link">
											<th>ID</th>
											<th>Date</th>
											<th>Provider</th>
											<th>Amount</th>
											<th>Currency</th>
											<th />
										</tr>
									</thead>
									<tbody>
										{receipts.map((receipt, index) => (
											<tr key={index}>
												<td>{receipt.idReceipt}</td>
												<td>
													{formatDate(
														convertUTCDateToLocalDate(receipt.date),
														'MMMM dd, yyyy'
													)}
												</td>
												<td>{receipt.providerCode}</td>
												<td>{formatNumber.new(parseFloat(receipt.amount).toFixed(2), '$')}</td>
												<td>{receipt.currency.code}</td>
												<td>
													<Link
														to={'/receipts/edit/' + receipt.idReceipt}
														className="button is-small is-success m-r-sm"
													>
														<i className="fas fa-edit fa-fw" />Edit
													</Link>
													<button
														className="button is-small is-danger"
														onClick={() => this.activeDeleteModal(receipt)}
													>
														<i className="fas fa-trash-alt fa-fw" />Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{modalDelete}
			</Fragment>
		);
	}
}

export default ReceiptsIndex;
