import axios from 'axios';
import csv from 'csvtojson';

const showMonthRequest = () => {
	return {
		type: 'SHOW_MONTH_REQUEST'
	};
}


const showMonthSuccess = payload => {
	return {
		type: 'SHOW_MONTH_SUCCESS',
		payload,
	};
}

const showMonthFailed = () => {
	return {
		type: 'SHOW_MONTH_FAILED',
	}
}

export function showMonth(payload){
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(showMonthRequest());

			let data = [];
			(async () => {
				try{
					let csvString = await axios.get(`${process.env.PUBLIC_URL}/data/${payload.year}-${payload.month}.csv`);
					csv().fromString(csvString.data)
					.on('csv', d => {
						if(!isNaN(d[0])){
							const k = {};
							k.name = d[3] + d[4];
							k.datasetName = d[1];
							data.push(k);
						}
					})
					.on('done', async () => {
						const categories = {};
						Array.from(data).forEach(dataset => {
							categories[dataset.name] = categories.hasOwnProperty(dataset.name) ? categories[dataset.name] + 1 : 1;
						});

						const categoriesArr = [];
						Object.keys(categories).forEach((key) => {
							if(key && key.trim() !== ''){
								let k = {
									name: key,
									value: categories[key],
									group: key,
								};
								if(k.group.includes('政府') || k.group.includes('澎湖縣')) k.group = k.group.substr(0, 3);
								categoriesArr.push(k);
							}
						});

						const method = {
							groupBy: "group",
							data: categoriesArr,
							size: d => d.value,
						};
						resolve(
							dispatch(showMonthSuccess({
								month: payload.month,
								year: payload.year,
								data: {
									data: data,
									treemap: method,
								}
							}))
						);
					});

				}catch(err){
					dispatch(showMonthFailed())
					reject(err);
				}
			})();
		});
	}
}
