import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrenciesService from '../../services/CurrenciesService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class ReceiptForm extends Component {
	state = {
		receipt: this.props.receipt,
		currencies: [],
		loading: false
	};

	currenciesService = new CurrenciesService();

	async componentDidMount() {
		this.setState({
			currencies: await this.currenciesService.GetAllCurrencies()
		});
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            receipt: nextProps.receipt
        });
	}

	updateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			receipt: {
				...this.state.receipt,
				[name]: value
			}
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.formSubmit(this.state.receipt);
	};

	render() {
		const { providerCode, amount, idCurrency, date, comments } = this.state.receipt;
		const { currencies } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="field">
					<label className="label">Provider</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="X0X000XXX0"
							maxLength="10"
							required={true}
							value={providerCode}
							name="providerCode"
							onChange={this.updateState}
						/>
					</div>
					<p className="help">Maximum 10 characters</p>
				</div>
				<div className="field">
					<label className="label">Amount ($)</label>
					<div className="control">
						<input
							className="input"
							type="number"
							min="1"
							step="any"
							required={true}
							value={amount}
							name="amount"
							onChange={this.updateState}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Currency</label>
					<div className="control">
						<div className="select is-fullwidth">
							<select value={idCurrency} name="idCurrency" onChange={this.updateState} required={true}>
								<option value="">select an option</option>
								{currencies.map((currency, index) => (
									<option key={index} value={currency.idCurrency}>
										{currency.code}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="field">
					<label className="label">Date</label>
					<div className="control">
						<DatePicker
							className="input"
							selected={date}
							onChange={(date) => {
								this.setState({
									receipt: {
										...this.state.receipt,
										date
									}
								});
							}}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Comments</label>
					<div className="control">
						<textarea
							className="textarea"
							placeholder="Add if you have any comment"
							value={comments}
							name="comments"
							onChange={this.updateState}
						/>
					</div>
				</div>
				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link">Submit</button>
					</div>
					<div className="control">
						<Link to="/receipts" className="button is-link is-light">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		);
	}
}

export default ReceiptForm;
