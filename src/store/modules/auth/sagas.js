import { takeLatest, all, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';
import { signInSucess, signFailure, signUpSucess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload;

    const { data } = yield call(api.post, 'login/authentication', {
      email,
      senha,
    });

    const [, token] = data.split(' ');

    const userRequest = yield call(api.post, 'usuario/usuario-logado', {
      email,
    });
    const user = userRequest.data;
    const { id } = user;

    try {
      const providerRequest = yield call(
        api.put,
        'prestador/verificar/usuario',
        {
          id,
        }
      );

      const provider = providerRequest.data;

      yield put(signInSucess(token, user, provider));
      history.push('/');
    } catch (error) {
      yield put(signInSucess(token, user));
      history.push('/');
    }
  } catch (error) {
    yield put(signFailure());

    toast.error('Falha ao tentar logar, confirme seus dados');
  }
}

export function* signUp({ payload }) {
  const cep = payload.cep.replace(/[^\d]+/g, '');

  const {
    nome,
    senha,
    email,
    bairro,
    cidade,
    imagem,
    rua,
    numero,
    uf,
  } = payload;
  try {
    yield call(api.post, 'usuario', {
      nome,
      email,
      senha,
      imagem,
      endereco: {
        cep,
        cidade,
        uf,
        bairro,
        rua,
        numero,
      },
    });

    yield put(signUpSucess());

    history.push('/signin');

    toast.success('Usuário criado com sucesso');
  } catch (error) {
    yield put(signFailure());

    toast.error('Falha ao tentar criar usuário');
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
