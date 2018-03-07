import React, { Component } from 'react';
import './App.css';

import { Redirect } from 'react-router-dom';
import { Treemap } from 'd3plus-react';
import { connect } from 'react-redux'

import * as actionCreators from './actions';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faBrands from '@fortawesome/fontawesome-free-brands';

fontawesome.library.add(faSolid, faBrands);

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: null,
			datasets: null,
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
		if(this.props.match.params.city){
			await this.setState({
				...this.state,
				city: this.props.match.params.city,
			});
		}
		if(this.props.match.params.bureau){
			await this.setState({
				...this.state,
				bureau: this.props.match.params.bureau,
			});
		}

		if(this.state.bureau){
			this.props.showBureauFromMonth({
				year: this.state.year,
				month: this.state.month,
				name: this.state.bureau,
			});
		}
		else if(this.state.city){
			this.props.showCityFromMonth({
				year: this.state.year,
				month: this.state.month,
				city: this.state.city,
			});
		}else{
			this.props.showMonth({
				year: this.state.year,
				month: this.state.month,
			});
		}
	}

	handleClick(d){
		let oldPath = this.props.history.location.pathname;
		if(oldPath.endsWith('/')){
			oldPath = oldPath.slice(0, -1);
		}
		if(!this.props.filter.city){
			this.props.history.push(`${oldPath}/${d.group}`);
			this.props.showCity({
				city: d.group,
				treemap: this.props.data.treemap,
				data: this.props.data,
			});
		}else{
			this.props.history.push(`${oldPath}/${d.name}`);
			this.props.showBureau({
				bureau: d.name,
				data: this.props.data.data,
			});
		}
	}

	render() {
		if(this.props.failed){
			return (<Redirect to={`${process.env.PUBLIC_URL}/`} />);
		}
		const handleClick = this.handleClick.bind(this);
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">地方政府開放資料平台局處單位數量呈現</h1>
				</header>
				{this.props.loading ? (<div className="loading">
					<FontAwesomeIcon icon="spinner" className="loading fa-5x fa-spin" />
					<p>正在載入資料集......</p>
				</div>) : null}
				{this.props.data ? (<div className="treemap">
					<h2>{this.props.filter.city ? this.props.filter.city + '政府資料集' : null}</h2>
					<Treemap config={{
						...this.props.data.treemap,
						on: {
							click: function(d, i) {
								// this._tooltipClass.data([]).render();
								console.log(this);
								handleClick(d);
							}
						}
					}} />
				</div>) : null}
				{this.props.datasets ? (<div className="datasets">
					<h2>{this.props.filter.bureau}共有 {this.props.datasets.length} 個資料集</h2>
					<ul>
						{this.props.datasets.map(dataset =>
							<li><FontAwesomeIcon icon="file" /> {dataset.datasetName}</li>
						)}
					</ul>
				</div>) : null}
				{this.props.filter !== undefined ? (
					<footer>
						資料來源：各地方政府({this.props.filter.year}-{this.props.filter.month}) | Build with <FontAwesomeIcon icon={['fab', 'react']} /> | <a href="https://github.com/NoobTW/od-freq">開放原始碼</a>.
					</footer>
				): (
					<footer>
						資料來源：各地方政府 | Build with <FontAwesomeIcon icon={['fab', 'react']} /> | <a href="https://github.com/NoobTW/od-freq">開放原始碼</a>.
					</footer>
				)}
			</div>
		);
	}
}

const mapStateToProps = store => (
	{
		failed: store.datasets.failed,
		loading: store.datasets.loading,
		filter: store.datasets.filter,
		data: store.datasets.data,
		datasets: store.datasets.datasets,
	}
)

export default connect(mapStateToProps, actionCreators)(App);
