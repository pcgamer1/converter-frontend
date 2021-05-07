import axios from 'axios';

import {BASE_URL, LOCAL_BASE_URL} from '../config'

if(process.env.NODE_ENV != 'production') {
  axios.defaults.baseURL = LOCAL_BASE_URL
}
else {
  axios.defaults.baseURL = BASE_URL
}

export const loadAPI = async (url, opts = {}) => {
  const {
    onSuccess = (data) => data,
    onFailure = (error) => error,
    secure = false,
    defaultData,
    headers,
    ...options
  } = opts;

  try {
    const res = await axios(url, {
      headers: {
        // ...(secure ? { Authorization: `Bearer ${await getAccessToken()}` } : {}),
        ...headers,
      },
      ...options,
    });

    const { data, status } = res;
    await onSuccess(data);
    return { data, status, error: undefined, loading: false };
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      await onFailure(data);
      return { data: undefined, status, error: data, loading: false };
    }

    if (error.request) {
      const e = { message: 'error in request setup' };
      // noinspection JSCheckFunctionSignatures
      return { data: undefined, status: 0, error: e, loading: false };
    }

    throw Error(error);
  }
};
