import React from "react";
import { FunctionComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const StyledBtn = styled(TouchableOpacity)<{ marginBottom?: number }>`
  border-color: #4990e2;
  border-width: 2px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)}px;
`;

const StyledText = styled(Text)`
  color: #4990e2;
  font-size: 20px;
`;

const Button: FunctionComponent<{
  title: string;
  onPress: () => void;
  marginBottom?: number;
}> = ({ onPress, title, marginBottom }) => {
  return (
    <StyledBtn onPress={onPress} marginBottom={marginBottom}>
      <StyledText>{title}</StyledText>
    </StyledBtn>
  );
};

export default Button;
