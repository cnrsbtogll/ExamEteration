import React from 'react';
import FastImage from 'react-native-fast-image';

const AppImage = ({url, ...otherProps}) => {
  return (
    <FastImage
      source={typeof url === 'string' ? {uri: url} : url}
      resizeMode={FastImage.resizeMode.contain}
      {...otherProps}
    />
  );
};

export default AppImage;
