import React from 'react';
import {TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native';
import {defaultColor, handlePadding, handleMargin, bgColor} from './shared';
const Button = ({
  flex,
  title,
  color,
  size,
  medium,
  light,
  backgroundColor,
  width,
  height,
  children,
  center,
  shadow,
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
  justifyCenter,
  justifyEnd,
  justifyStart,
  alignStart,
  alignCenter,
  alignEnd,
  padding,
  margin,
  space,
  radius,
  border,
  borderBottomWidth,
  borderColor,
  row,
  style,
  thl,
  underlayColor,
  ...props
}) => {
  const buttonStyles = [
    flex && {flex: 1},
    row && styles.row,
    backgroundColor && bgColor[backgroundColor],
    backgroundColor &&
      !defaultColor[backgroundColor] && {backgroundColor: backgroundColor},
    width && {width: width},
    height && {height: height},
    center && styles.center,
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
    alignStart && styles.alignStart,
    alignCenter && styles.alignCenter,
    alignEnd && styles.alignEnd,
    justifyCenter && styles.justifyCenter,
    justifyStart && styles.justifyStart,
    justifyEnd && styles.justifyEnd,
    padding && {...handlePadding(padding)},
    margin && {...handleMargin(margin)},
    space && {justifyContent: `space-${space}`},
    shadow && {...styles.shadow, shadowColor: defaultColor.shadow},
    radius && {borderRadius: radius},
    border && {borderWidth : 1},
    borderBottomWidth && {borderBottomWidth: borderBottomWidth},
    borderColor && {borderColor : borderColor},
    style,
  ];
  if (thl) {
    return (
      <TouchableHighlight
        style={buttonStyles}
        underlayColor={underlayColor}
        {...props}>
        {children}
      </TouchableHighlight>
    );
  }
  return (
    <TouchableOpacity  activeOpacity={0.5} style={buttonStyles} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  center: {justifyContent: 'center', alignItems: 'center'},
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  shadow: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
});
