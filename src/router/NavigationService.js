import * as React from 'react';

export const navigationRef1 = React.createRef();

export function navigate(name, params) {
  navigationRef1.current?.navigate(name, params);
}
