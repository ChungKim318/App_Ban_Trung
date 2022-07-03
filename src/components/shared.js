export const defaultColor = {
  background: '#FFF',
  primary: '#fec44b',
  newPrimary: '#f89822',
  text: '#000',
  secondary: '#FF8908',
  secondaryText: '#15202B',
  blue: '#2537D8',
  shadows: 'rgba(0,0,0,0.3)',
};
export const textColor = {
  background: {color: defaultColor.background},
  primary: {color: defaultColor.primary},
  text: {color: defaultColor.text},
  secondary: {color: defaultColor.secondary},
  secondaryText: {color: defaultColor.secondaryText},
  blue: {color: defaultColor.blue},
  shadows: {color: defaultColor.shadows},
};
export const bgColor = {
  background: {backgroundColor: defaultColor.background},
  primary: {backgroundColor: defaultColor.primary},
  text: {backgroundColor: defaultColor.text},
  secondary: {backgroundColor: defaultColor.secondary},
  secondaryText: {backgroundColor: defaultColor.secondaryText},
  blue: {backgroundColor: defaultColor.blue},
  shadows: {backgroundColor: defaultColor.shadows},
};
export const handlePadding = (number) => {
  return {
    paddingLeft: number,
    paddingRight: number,
    paddingBottom: number,
    paddingTop: number,
  };
};
export const handleMargin = (number) => {
  return {
    marginLeft: number,
    marginRight: number,
    marginBottom: number,
    marginTop: number,
  };
};
export const handleSquare = (number) => {
  return {
    width: number,
    height: number,
  };
};
export const handleRound = (number) => {
  return {
    width: number,
    height: number,
    borderRadius: number / 2,
  };
};
