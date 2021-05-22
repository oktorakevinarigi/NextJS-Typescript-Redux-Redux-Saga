import { all } from 'redux-saga/effects';
import App from './app';

function* rootSaga(): Generator {
    yield all([
        App(),
    ]);
}

export default rootSaga