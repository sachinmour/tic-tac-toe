import { SET_MARK } from './types';

const setMark = (mark) => (
    (dispatch) => (
        dispatch({
            type: SET_MARK,
            mark
        })
    )
);

export default setMark;
