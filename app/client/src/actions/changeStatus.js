import {CHANGE_STATUS} from './types';

const changeStatus = (status) => (
    (dispatch) => (
        dispatch({
            type: CHANGE_STATUS,
            status
        })
    )
);

export default changeStatus;
