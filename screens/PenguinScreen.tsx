import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Leaf from "../components/Leaf";

const color = 'rgb(0, 153, 255)';

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [11.5, 10.4, 9, 8.5, 7.3, 6.6],
      color: (opacity = 1) => `rgba(0, 153, 255, ${opacity})`, // optional
      strokeWidth: 5 // optional
    }
  ],
  //legend: ["Rainy Days"] // optional
};

const chartConfig = {
  backgroundColor: "white",
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => color,
  //barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const ScreenView = styled(SafeAreaView)`
  position: relative;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

const StyledText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

const CO2Text = styled(Text)`
  font-size: 30px;
  font-weight: bold;
`;

const CO2subtext = styled(Text)`
  font-size: 15px;
  font-weight: bold;
`;

const Seperator = styled(View)`
  height: 10px;
  width: 80%;
`;

const HSeperator = styled(View)`
  height: 1px;
  width: 10px;
`;

const Subscript = styled(Text)`
  vertical-align: sub;
`;


const Row = styled(View)`
  flex-direction: row;
`;

const Col = styled(View)`
  flex-direction: column;
`

export default function TabPenguin() {
  return (
    <ScreenView>
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        withDots={false}
      />
      
      <Seperator />
      <Row>
        <Leaf />
        <HSeperator />
        <Col>
          <CO2Text>1.2 kg CO2<</CO2Text>
          <Seperator />
          <CO2subtext>durchschnittlich pro Produkt in den letzten 30 Tagen</CO2subtext>
        </Col>
        
      </Row>
      <Seperator />
      <MaterialCommunityIcons
              size={300}
              name="penguin"
              color={color}
              style={{ marginBottom: -3 }}
            />
    </ScreenView>
  );
}
