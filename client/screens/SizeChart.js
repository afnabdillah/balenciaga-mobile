import { WebView } from 'react-native-webview';
import React from "react";

const SizeChart = () => {
  return (
      <WebView 
        source={{ uri: 'https://www.uniqlo.com/id/id/size/443172_size.html' }}
        style={{flex: 1}}
      />
  );
};

export default SizeChart;
