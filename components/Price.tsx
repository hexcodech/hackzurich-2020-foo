import React from "react";
import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const PriceView = styled(View)`
  border: #000 2px solid;
  padding: 15px;
  border-radius: 10px;
`;
const PriceText = styled(Text)`
  color: #000;
  font-size: 30px;
`;

interface IProps {
  children: number;
}

const Price: FunctionComponent<IProps> = ({ children }) => {
  return (
    <PriceView>
      <PriceText>{children.toFixed(2)}</PriceText>
    </PriceView>
  );
};

export default Price;
