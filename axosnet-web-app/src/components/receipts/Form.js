import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ReceiptForm extends Component {
	render() {
		return (
			<form>
				<div className="field">
					<label className="label">Provider</label>
					<div className="control">
						<input className="input" type="text" placeholder="X0X000XXX0" maxLength="10" required="true" />
					</div>
					<p className="help">Maximum 10 characters</p>
				</div>
				<div className="field">
					<label className="label">Amount ($)</label>
					<div className="control">
						<input className="input" type="number" min="1" step="any" required="true" />
					</div>
				</div>
				<div className="field">
					<label className="label">Currency</label>
					<div className="control">
						<input className="input" type="number" min="1" step="any" required="true" />
					</div>
				</div>
				<div className="field">
					<label className="label">Date</label>
					<div className="control">
						<input className="input" type="date" required="true" />
					</div>
				</div>
				<div className="field">
					<label className="label">Comments</label>
					<div className="control">
						<textarea className="textarea" placeholder="Add if you have any comment" />
					</div>
				</div>
				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link">Submit</button>
					</div>
					<div className="control">
						<Link to="/receipts" className="button is-link is-light">Cancel</Link>
					</div>
				</div>
			</form>
		);
	}
}

export default ReceiptForm;
