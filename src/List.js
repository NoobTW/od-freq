import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router-dom';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faSolid);

class List extends Component {
	render(){
		return (<div className="App">
			<header className="App-header">
				<h1 className="App-title">地方政府開放資料平台局處單位數量呈現</h1>
			</header>
			<h2>請選擇時間</h2>
			<div className="datasets">
				<ul>
					<li><Link to={`${process.env.PUBLIC_URL}/treemap/2017/3`}><FontAwesomeIcon icon="folder" /> 2017-03</Link></li>
					<li><Link to={`${process.env.PUBLIC_URL}/treemap/2017/8`}><FontAwesomeIcon icon="folder" /> 2017-08</Link></li>
					<li><Link to={`${process.env.PUBLIC_URL}/treemap/2018/1`}><FontAwesomeIcon icon="folder" /> 2018-01</Link></li>
				</ul>
			</div>
		</div>)
	}
}

export default List;
