import React, { Component } from 'react';
import ReceiptsService from '../../services/ReceiptsService';

export class ReceiptDelete extends Component {
	state = {
		loading: false
	};

	receiptsService = new ReceiptsService();

	confirmDelete = async (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		const ok = await this.receiptsService.Delete(this.props.idReceipt);

		if (ok) {
			this.props.activeDeleteModal({});
		}

		this.setState({
			loading: false
		});
	};

	render() {
		const { loading } = this.state;
		const { activeDeleteModal } = this.props;
		return (
			<div className="modal is-active">
				<div className="modal-background" onClick={() => activeDeleteModal({})} />
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">Delete Receipt</p>
						<button className="delete" aria-label="close" onClick={() => activeDeleteModal({})} />
					</header>
					<section className="modal-card-body">
						<div className="columns is-mobile">
							<div className="column has-text-centered">
								<p>Are you sure?</p>
							</div>
						</div>
					</section>
					<footer className="modal-card-foot">
						<div className="column has-text-right">
							<button
								className={'button is-link' + (loading ? ' is-loading' : '')}
								onClick={this.confirmDelete}
							>
								<span className="icon">
									<i className="fas fa-check" />
								</span>
								<span>Yes</span>
							</button>
						</div>
						<div className="column has-text-left">
							<button onClick={() => activeDeleteModal({})} className="button is-link is-light">
								<span className="icon">
									<i className="fas fa-times" />
								</span>
								<span>Cancel</span>
							</button>
						</div>
					</footer>
				</div>
			</div>
		);
	}
}

export default ReceiptDelete;
