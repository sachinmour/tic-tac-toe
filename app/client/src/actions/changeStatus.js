import { CHANGE_STATUS } from './types';

const changeStatus = (status) => ({
    type: CHANGE_STATUS,
    status
});

export default changeStatus;
