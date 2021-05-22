import React, { FC } from 'react';
import { AppProps } from 'next/app';

import '../styles/globals.css'
import 'antd/dist/antd.css';

import { wrapper } from '../redux/store'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
