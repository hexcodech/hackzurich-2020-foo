import React from "react";
import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const PriceView = styled(View)<{ color: string }>`
  border: ${({ color }) => (color ? color : "#000")} 2px solid;
  padding: 15px;
  border-radius: 10px;
`;
const PriceText = styled(Text)<{ color: string }>`
  color: ${({ color }) => (color ? color : "#000")};
  font-size: 30px;
`;

interface IProps {
  color?: string;
  children: number;
}

const Price: FunctionComponent<IProps> = ({ children, color }) => {
  return (
    <PriceView color={color}>
      <PriceText color={color}>{children.toFixed(2)}</PriceText>
    </PriceView>
  );
};

export default Price;
