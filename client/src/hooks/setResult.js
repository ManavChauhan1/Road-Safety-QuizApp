import { postServerData } from '../helper/helper.js';
import * as Action from '../redux/result_reducer.js'

export const pushAnswer = (result) => async(dispatch) => {
    try{
        await dispatch(Action.pushResultAction(result))
    } catch(error){
        console.log(error);
    }
}

export const UpdateResult = (index) => async(dispatch) => {
    try{
        dispatch(Action.updateResultAction(index))
    } catch(error){
        console.log(error);
    }
}

//Insert User Data
export const usePublishResult = (resultData) => {
    const { result, username} = resultData;
    (async() => {
        try{
            if(resultData.result != [] && !username) throw new Error("Couldn't get Result...!");
            await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData, data => data);
        }catch(error){
            console.log(error);
        }
    })();
}