import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div style={{width:'100%',height:'1000px',display:'flex',justifyContent:'center',paddingTop:'20px'}}>
        <InfinitySpin 
        width='200'
        color="#4fa94d"

      />  
      </div>
    );
};

export default Loader;