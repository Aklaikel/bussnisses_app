
"use client";
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import Navbar from './Navbar';

const ReduxWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <main>
        <Navbar />
      </main>
      {children}
    </Provider>
  );
};

export default ReduxWrapper;