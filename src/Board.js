import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import './App.css';

import { Link } from 'react-router-dom';
import * as actionCreators from './actions';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faBrands from '@fortawesome/fontawesome-free-brands';

fontawesome.library.add(faSolid, faBrands);

class Board extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: null,
			i: 1,
		}
	}

	async componentWillMount(){
		if(this.props.match.params.month){
			let month = ~~this.props.match.params.month;
			if(month < 10) month = `0${month}`;
			await this.setState({
				...this.state,
				month,
			});
		}
		if(this.props.match.params.year){
			await this.setState({
				...this.state,
				year: this.props.match.params.year,
			});
		}
		this.props.showBoard({
			year: this.state.year,
			month: this.state.month
		});
	}

	render() {
		this.setState({i: 1});
		if(this.props.failed){
			return (<Redirect to={`${process.env.PUBLIC_URL}/`} />);
		}
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">地方政府開放資料集熱門關鍵字</h1>
				</header>
				{this.props.loading ? (<div className="loading">
					<FontAwesomeIcon icon="spinner" className="loading fa-5x fa-spin" />
					<p>正在載入資料集......</p>
				</div>) : null}
				{this.props.data ? (<table className="board">
					<tbody>
						<tr>
							<th>名次</th>
							<th>關鍵字</th>
							<th>次數</th>
							<th>政府</th>
						</tr>
						{console.log(this.props.data)}
						{
							this.props.data.map(d =>
								<tr>
									<td className="rank">{this.setState({i: this.state.i+1})}</td>
									<td className="name">{d.name}</td>
									<td className="count">{d.total}</td>
									<td className="gv">{
										d.gv.map(gv => {
											let k = <span><Link to={`${process.env.PUBLIC_URL}/treemap/${this.state.year}/${this.state.month}/${
												gv[0].includes('政府') || gv[0].includes('澎湖縣') ? gv[0].substr(0, 3) : gv[0]}`}>{gv[1]}</Link>{gv[2]}　</span>
											return k
										})
									}</td>
								</tr>
							)
						}
					</tbody>
				</table>) : null}
			</div>
		);
	}
}

const mapStateToProps = store => (
	{
		failed: store.datasets.failed,
		loading: store.datasets.loading,
		data: store.datasets.boardData,
	}
)

export default connect(mapStateToProps, actionCreators)(Board);
