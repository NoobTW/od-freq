const showBureauRequest = () => {
	return {
		type: 'SHOW_BUREAU_REQUEST'
	}
}

const showBureauSuccess = payload => {
	return {
		type: 'SHOW_BUREAU_SUCCESS',
		payload,
	}
}

const showBureauFailed = () => {
	return {
		type: 'SHOW_BUREAU_FAILED',
	}
}

export function showBureau(payload) {
	return dispatch => {
		dispatch(showBureauRequest());

		const datasets = payload.data.filter(x => x.name === payload.bureau);
		if(datasets.length){
			dispatch(showBureauSuccess({
				bureau: payload.bureau,
				datasets: datasets,
			}));
		}else{
			dispatch(showBureauFailed())
		}
	}
}