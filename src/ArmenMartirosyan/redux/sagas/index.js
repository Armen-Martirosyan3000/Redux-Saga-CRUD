import { takeEvery, put, call} from  "redux-saga/effects";
import { fetchData,deleteData,createData } from '../../api';
import { setDataPlayer} from "../actions/getApi";

//READ
export function* handlePlayers() {
    const data = yield call(fetchData);
    yield put(setDataPlayer(data));
}
//DELETE
export function* deletePlayers(id) {
   yield call(deleteData,id);
   const data=yield call(fetchData);
    yield put(setDataPlayer(data));
}

//CREATE
export function* createDataPlayers(userData) {
    yield call(createData,userData);
  const data=yield call(fetchData);
  yield put(setDataPlayer(data));
}

export function* watchFetchData() {
    yield takeEvery("FETCH_DATA", handlePlayers);
    yield takeEvery("DELETE_DATA", deletePlayers);
    yield takeEvery("CREATE_DATA", createDataPlayers);
}

export default function* rootSaga() {
    yield watchFetchData();
}
