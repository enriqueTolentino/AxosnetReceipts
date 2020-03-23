import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReceiptsService from '../../services/ReceiptsService';
import { formatDate, formatNumber, convertUTCDateToLocalDate } from '../../helpers/Formats';

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
		const { receipts } = this.state;
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
														className="button is-small is-primary m-r-sm"
													>
														<i class="fas fa-edit fa-fw" />Edit
													</Link>
													<Link to="/receipts/create" className="button is-small is-danger">
														<i class="fas fa-trash-alt fa-fw" />Delete
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ReceiptsIndex;
