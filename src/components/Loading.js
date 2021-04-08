import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const Loading = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vw',
        alignItems: 'center',
        justifyItems: 'center'
      }}
    >
      <div style={{margin: '10px'}}>
        <LoadingOutlined style={{ fontSize: 30 }} />
      </div>
      <p>Loading...</p>
    </div>
  );
};
