import { fetchAnimals } from '../../api';

export const actions = {
	GET_ANIMALS_REQUEST: 'ANIMALS:GET_ANIMALS_REQUEST',
	GET_ANIMALS_SUCCESS: 'ANIMALS:GET_ANIMALS_SUCCESS',
	GET_ANIMALS_FAILURE: 'ANIMALS:GET_ANIMALS_FAILURE'
};

export const getAnimals = () => {
	return (dispatch) => {
		dispatch({ type: actions.GET_ANIMALS_REQUEST });

		return fetchAnimals().then(
			(payload) => {
				dispatch({ type: actions.GET_ANIMALS_SUCCESS, payload});
			},
			(error) => {
				dispatch({ type: actions.GET_ANIMALS_FAILURE });
				throw error;
			}
		);
	}
}