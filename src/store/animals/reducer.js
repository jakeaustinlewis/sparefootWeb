import { handleActions } from 'redux-actions';
import { actions } from './actions';

export const initialState = {
	loading: false,
	error: false,
	errorMessage: null,
	animals: []
};

const reducer = handleActions({
	[actions.GET_ANIMALS_REQUEST]: (state) => ({ ...state, loading: true }),
	[actions.GET_ANIMALS_SUCCESS]: (state, { payload }) => ({ ...state, animals: payload, loading: false }),
	[actions.GET_ANIMALS_FAILURE]: (state) => ({ ...state, error: true, loading: false })
}, initialState);


export default reducer;
