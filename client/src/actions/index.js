import {fetchWords} from "../api/fetchWords";

export const fetchAllWords = () => (dispatch, getState) => {
    return fetchWords().then((data) => {
        dispatch({
            type: "START_GAME",
            payload: data
        });
    });
}