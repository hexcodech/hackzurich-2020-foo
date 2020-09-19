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
  const price = children.toString().split(".");

  const fr = price[0];
  const rp = price.length > 0 ? price[1].padEnd(2, "0") : "00";

  return (
    <PriceView>
      <PriceText>{`${fr}.${rp}`}</PriceText>
    </PriceView>
  );
};

export default Price;
