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
			<h2>請選擇資料</h2>
			<div className="datasets">
				<ul>
					<li><Link className="list-link" to={`${process.env.PUBLIC_URL}/treemap/2017/3`}><FontAwesomeIcon icon="briefcase" /> 2017-03（以局處分類）</Link></li>
					<li><Link className="list-link" to={`${process.env.PUBLIC_URL}/board/2017/3`}><FontAwesomeIcon icon="fire" /> 2017-03（以關鍵字排行）</Link></li>
					<li><Link className="list-link" to={`${process.env.PUBLIC_URL}/treemap/2017/8`}><FontAwesomeIcon icon="briefcase" /> 2017-08（以局處分類）</Link></li>
					<li><Link className="list-link" to={`${process.env.PUBLIC_URL}/board/2017/8`}><FontAwesomeIcon icon="fire" /> 2017-08（以關鍵字排行）</Link></li>
					<li><Link className="list-link" to={`${process.env.PUBLIC_URL}/treemap/2018/1`}><FontAwesomeIcon icon="briefcase" /> 2018-01（以局處分類）</Link></li>
					<li><Link className="list-link" to={`${process.env.PUBLIC_URL}/board/2018/1`}><FontAwesomeIcon icon="fire" /> 2018-01（以關鍵字排行）</Link></li>
				</ul>
			</div>
		</div>)
	}
}

export default List;
