import axios from 'axios';

const showBoardRequest = () => {
	return {
		type: 'SHOW_BOARD_REQUEST'
	};
}

const showBoardSuccess = payload => {
	return {
		type: 'SHOW_BOARD_SUCCESS',
		payload,
	};
}

const showBoardFailed = () => {
	return {
		type: 'SHOW_BOARD_FAILED'
	};
}

export function showBoard(payload){
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			dispatch(showBoardRequest());
			try{
				let data = await axios.get(`${process.env.PUBLIC_URL}/data/${payload.year}-${payload.month}-keyword.json`);
				data = data.data;
				Array.from(data).forEach(d => {
					// d.gv = d.gv.sort();
					let sortable = [];
					Object.keys(d.gv).forEach(gv => {
						let gvName = gv;
						switch(gvName){
							case '臺北大眾捷運股份有限公司':
								gvName = '北捷'; break;
							case '臺北自來水事業處':
								gvName = '北水'; break;
							case '國立嘉義大學':
								gvName = '嘉大'; break;
							case '國立彰化師範大學':
								gvName = '彰師'; break;
							case '國立彰化生活美學館':
								gvName = '彰美'; break;
							case '高雄市政府':
								gvName = '高市'; break;
							case '基隆市政府':
								gvName = '基隆'; break;
							case '台北市政府':
							case '臺北市政府':
								gvName = '北市'; break;
							case '新北市政府':
								gvName = '新北'; break;
							case '桃園市政府':
								gvName = '桃市'; break;
							case '桃園縣政府':
								gvName = '桃縣'; break;
							case '新竹縣政府':
								gvName = '竹縣'; break;
							case '新竹市政府':
								gvName = '竹市'; break;
							case '苗栗縣政府':
							case '苗栗縣立體育場':
								gvName = '苗栗'; break;
							case '台中市政府':
							case '臺中市政府':
								gvName = '臺中'; break;
							case '彰化縣政府':
								gvName = '彰化'; break;
							case '南投縣政府':
								gvName = '南投'; break;
							case '雲林縣政府':
								gvName = '雲林'; break;
							case '嘉義縣政府':
								gvName = '嘉縣'; break;
							case '台南市政府':
							case '臺南市政府':
								gvName = '臺南'; break;
							case '宜蘭縣政府':
								gvName = '宜蘭'; break;
							case '花蓮縣政府':
								gvName = '花蓮'; break;
							case '台東縣政府':
							case '臺東縣政府':
								gvName = '臺東'; break;
							case '金門縣政府':
								gvName = '金門'; break;
							case '屏東縣政府':
								gvName = '屏東'; break;
							case '連江縣政府':
								gvName = '連江'; break;
							case '嘉義市政府':
								gvName = '嘉市'; break;
							case '澎湖縣政府':
							case '澎湖縣':
								gvName = '澎湖'; break;
							default:
								gvName = gvName;
						}
						sortable.push([gv, gvName, d.gv[gv]]);
					});
					sortable = sortable.sort((a, b) => b[2] - a[2]);
					d.gv = sortable;
				});
				resolve(
					dispatch(showBoardSuccess({
						data,
					}))
				);
			}catch(err){
				dispatch(showBoardFailed())
				reject(err);
			}
		});
	}
}
