import { CHANGE_STATUS } from '../actions/types';

const defaultState = 'newGame';

export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_STATUS:
            return action.status;
        default:
            return state;
    }
}
