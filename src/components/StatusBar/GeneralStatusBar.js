import React from 'react'
import { View, Text,StatusBar,Platform } from 'react-native'

const GeneralStatusBar = ({ backgroundColor, ...props }) => (
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
);

export default GeneralStatusBar
