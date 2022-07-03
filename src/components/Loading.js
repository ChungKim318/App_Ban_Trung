import React from 'react';
import {ActivityIndicator} from 'react-native';
import Block from './Block';
import {defaultColor} from './shared';
const Loading = ({
  color,
  large,
  customStyleContainer,
  isLoading,
  children,
  type,
}) => {
  if (type === 'onlyLoad') {
    return (
      <Block alignCenter justifyCenter flex style={customStyleContainer}>
        <ActivityIndicator
          color={color || defaultColor.primary}
          size={large ? 'large' : 'small'}
        />
      </Block>
    );
  } else {
    if (isLoading) {
      return (
        <Block alignCenter justifyCenter flex style={customStyleContainer}>
          <ActivityIndicator
            color={color || defaultColor.primary}
            size={large ? 'large' : 'small'}
          />
        </Block>
      );
    } else {
      return children;
    }
  }
};

export default Loading;
