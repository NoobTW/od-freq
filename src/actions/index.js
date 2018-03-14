import { showMonth } from './months';
import { showCity } from './city';
import { showBureau } from './bureau';
import { showBoard } from './board';

const showCityFromMonth = payload => {
	return (dispatch, getState) => {
		dispatch(showMonth({
			year: payload.year,
			month: payload.month,
		})).then(() => {
			dispatch(showCity({
				city: payload.city,
				treemap: getState().datasets.data.treemap,
				data: getState().datasets.data,
			}));
		});
	}
}

const showBureauFromMonth = payload => {
	return (dispatch, getState) => {
		dispatch(showMonth({
			year: payload.year,
			month: payload.month,
		})).then(() => {
			dispatch(showBureau({
				bureau: payload.name,
				data: getState().datasets.data.data,
			}));
		});
	}
}

export { showMonth, showCity, showCityFromMonth, showBureau, showBureauFromMonth, showBoard };
