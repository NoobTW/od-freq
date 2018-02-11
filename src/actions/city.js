const showCityRequest = () => {
	return {
		type: 'SHOW_CITY_REQUEST'
	}
}

const showCitySuccess = payload => {
	return {
		type: 'SHOW_CITY_SUCCESS',
		payload,
	}
}

const showCityFailed = () => {
	return {
		type: 'SHOW_CITY_FAILED',
	}
}

export function showCity(payload){
	return dispatch => {
		dispatch(showCityRequest());

		let c = payload.treemap.data.filter(x => x.group === payload.city);

		if(c.length){
			dispatch(showCitySuccess({
				city: payload.city,
				data: {
					...payload.data,
					treemap: {
						...payload.treemap,
						data: c,
						groupBy: 'name'
					}
				}
			}));
		}else{
			dispatch(showCityFailed());
		}
	}
}