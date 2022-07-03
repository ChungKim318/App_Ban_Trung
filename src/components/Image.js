import React, {useState} from 'react';
import {Image} from 'react-native';
import {handleRound, handleSquare} from './shared';
const ImageView = ({
  imageUri,
  width,
  height,
  radius,
  contain,
  square,
  round,
  local,
  style,
  source,
  ...props
}) => {
  const [error, setError] = useState(false);
  const imageStyle = [
    width && {width: width},
    height && {height: height},
    square && {...handleSquare(square)},
    round && {...handleRound(round)},
    radius && {borderRadius: radius},
    style,
  ];

  return (
    <Image
      source={imageUri ? {uri : imageUri} : source}
      onError={() => setError(true)}
      style={imageStyle}
      {...props}
    />
  );
};

export default ImageView;
