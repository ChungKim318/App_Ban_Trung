import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  defaultColor,
  handlePadding,
  handleMargin,
  handleRound,
  handleSquare,
  bgColor,
} from './shared';
const Block = ({
  flex,
  row,
  column,
  shadow,
  backgroundColor,
  space,
  padding,
  margin,
  alignStart,
  alignCenter,
  alignEnd,
  wrap,
  justifyCenter,
  justifyEnd,
  justifyStart,
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
  radius,
  height,
  width,
  style,
  children,
  square,
  round,
  safe,
  border,
  relative,
  absolute,
  top,
  left,
  right,
  bottom,
  borderColor,
  animated,
  flowHidden,
  scrollView,
  hideHorizontalScroll,
  hideVerticalScroll,
  ...props
}) => {
  const blockStyles = [
    flex && {flex: 1},
    flex === false && {flex: 0},
    width && {width: width},
    height && {height: height},
    row && styles.row,
    column && styles.column,
    flowHidden && styles.flowHidden,
    shadow && {...styles.shadow, shadowColor: defaultColor.shadow},
    wrap && {flexWrap: 'wrap'},
    backgroundColor && bgColor[backgroundColor],
    backgroundColor &&
      !defaultColor[backgroundColor] && {backgroundColor: backgroundColor},
    padding && {...handlePadding(padding)},
    margin && {...handleMargin(margin)},
    alignStart && styles.alignStart,
    alignCenter && styles.alignCenter,
    alignEnd && styles.alignEnd,
    justifyCenter && styles.justifyCenter,
    justifyStart && styles.justifyStart,
    justifyEnd && styles.justifyEnd,
    space && {justifyContent: `space-${space}`},
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
    radius && {borderRadius: radius},
    border && {borderWidth: 1},
    square && {...handleSquare(square)},
    round && {...handleRound(round)},
    borderColor && {borderColor: borderColor},
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    top !== -1 && {top: top},
    left !== -1 && {left: left},
    right !== -1 && {right: right},
    bottom !== -1 && {bottom: bottom},
    style,
  ];
  if (animated) {
    return (
      <Animated.View style={blockStyles} {...props}>
        {children}
      </Animated.View>
    );
  }
  if (scrollView) {
    return (
      <View style={styles.block}>
        <ScrollView
          contentContainerStyle={styles.flexGrow}
          showsHorizontalScrollIndicator={hideHorizontalScroll ? false : true}
          showsVerticalScrollIndicator={hideVerticalScroll ? false : true}>
          <View style={blockStyles} {...props}>
            {children}
          </View>
        </ScrollView>
      </View>
    );
  }
  if (safe) {
    return (
      <SafeAreaView style={styles.block}>
        <View style={blockStyles} {...props}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

export default Block;
const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flowHidden: {
    overflow: 'hidden',
  },
  flexGrow: {
    flexGrow: 1,
  },
});
