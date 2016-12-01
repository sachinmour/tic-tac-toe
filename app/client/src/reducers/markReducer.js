import { SET_MARK } from '../actions/types';

const defaultState = {
    user: 'x',
    machine: 'o'
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_MARK:
            return {
                user: action.mark,
                machine: action.mark === 'x' ? 'o' : 'x'
            };
        default:
            return state;
    }
}
