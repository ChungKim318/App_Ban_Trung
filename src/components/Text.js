import React from 'react';
import {Text, StyleSheet, Animated} from 'react-native';
import {defaultColor, handlePadding, handleMargin, textColor} from './shared';

const Typography = ({
  flex,
  children,
  animated,
  medium,
  bold,
  light,
  size,
  color,
  center,
  right,
  justify,
  padding,
  margin,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  numberOfLines,
  underline,
  style,
  ...props
}) => {
  const textStyle = [
    flex && {flex: 1},
    medium && styles.medium,
    light && styles.regular,
    bold && styles.bold,
    !medium && !light && styles.regular,
    size && {fontSize: size},
    color && textColor[color],
    color && !defaultColor[color] && {color: color},
    !color && {color: defaultColor.text},
    center && styles.center,
    underline && styles.underline,
    right && styles.right,
    justify && styles.justify,
    padding && {...handlePadding(padding)},
    margin && {...handleMargin(margin)},
    paddingTop && {paddingTop: paddingTop},
    paddingRight && {paddingRight: paddingRight},
    paddingBottom && {paddingBottom: paddingBottom},
    paddingLeft && {paddingLeft: paddingLeft},
    marginBottom && {marginBottom: marginBottom},
    marginTop && {marginTop: marginTop},
    marginRight && {marginRight: marginRight},
    marginLeft && {marginLeft: marginLeft},
    paddingHorizontal && {paddingHorizontal: paddingHorizontal},
    paddingVertical && {paddingVertical: paddingVertical},
    marginHorizontal && {marginHorizontal: marginHorizontal},
    marginVertical && {marginVertical: marginVertical},
    style,
  ];
  if (animated) {
    return (
      <Animated.Text numberOfLines={numberOfLines} style={textStyle} {...props}>
        {children}
      </Animated.Text>
    );
  }
  return (
    <Text numberOfLines={numberOfLines} style={textStyle} {...props}>
      {children}
    </Text>
  );
};

export default Typography;
const styles = StyleSheet.create({
  regular: {
   
  },
  bold: {
    fontWeight: 'bold'
  },
  medium: {
    
  },
  light: {
    
  },
  center: {
      textAlign : 'center'
  },
  right: {
   
  },
  justify: {
    
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
