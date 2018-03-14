import { combineReducers } from 'redux';

// const k = {
// 	loading: false,
// 	filter: {
// 		year: k,
// 		month: k,
// 		city: k,
// 	},
// 	datasets: k,
//  boardData: k,
// }

const datasets = (state = {}, action) => {
	switch(action.type){
		case 'SHOW_MONTH_REQUEST':
			return {
				...state,
				data: null,
				datasets: null,
				loading: true,
			}
		case 'SHOW_MONTH_SUCCESS':
			return {
				...state,
				filter: {
					month: action.payload.month,
					year: action.payload.year,
					city: null,
					bureau: null,
				},
				data: action.payload.data,
				loading: false,
			}
		case 'SHOW_MONTH_FAILED':
			return {
				failed: true,
			}
		case 'SHOW_CITY_REQUEST':
			return {
				...state,
				data: null,
				datasets: null,
				loading: true,
			}
		case 'SHOW_CITY_SUCCESS':
			return {
				...state,
				filter: {
					...state.filter,
					city: action.payload.city,
					bureau: null,
				},
				data: action.payload.data,
				loading: false,
			}
		case 'SHOW_CITY_FAILED':
			return {
				failed: true,
			}
		case 'SHOW_BUREAU_REQUEST':
			return {
				...state,
				data: null,
				datasets: null,
				loading: true,
			}
		case 'SHOW_BUREAU_SUCCESS':
			return {
				...state,
				filter: {
					...state.filter,
					bureau: action.payload.bureau,
				},
				data: null,
				datasets: action.payload.datasets,
				loading: false,
			}
		case 'SHOW_BOARD_REQUEST':
			return {
				...state,
				boardData: null,
				loading: true,
			}
		case 'SHOW_BOARD_SUCCESS':
			return {
				...state,
				boardData: action.payload.data,
				loading: false,
			}
		case 'SHOW_BOARD_FAILED':
			return {
				failed: true,
			}
		default:
			return state;
	}
};

const dApp = combineReducers({datasets});

export default dApp;
