import React from 'react';
import { View } from "react-native";
import StartButton from '../components/startbutton';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
      }}
    >
      <StartButton path="/breathing">Start</StartButton>
      
      <StartButton path="/settings">Settings</StartButton>

      <StartButton path="/breathsetup">SetUp</StartButton>
    </View>
  );
}
