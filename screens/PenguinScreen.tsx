import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

const ScreenView = styled(SafeAreaView)`
  position: relative;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

const Seperator = styled(View)`
  height: 1px;
  width: 80%;
`;

export default function TabPenguin() {
  return (
    <ScreenView>
      <StyledText>Tab Penguin</StyledText>
      <Seperator />
    </ScreenView>
  );
}
