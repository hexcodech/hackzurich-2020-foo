import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

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
  color: (opacity = 1) => `rgba(0, 153, 255, ${opacity})`,
  //barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

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
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        withDots={false}
      />
      <StyledText>Tab Penguin</StyledText>
      <Seperator />
      
    </ScreenView>
  );
}
