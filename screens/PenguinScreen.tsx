import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Leaf from "../components/Leaf";
import useSWR from "swr";
import { getPurchases } from "../utilities/api";

const color = "rgb(0, 153, 255)";

const screenWidth = Dimensions.get("window").width;

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const chartConfig = {
  backgroundColor: "white",
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => color,
  //barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const ScreenView = styled(SafeAreaView)`
  position: relative;
  flex: 1;
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 0 15px;
`;

const StyledText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

const CO2Text = styled(Text)`
  font-size: 30px;
`;

const CO2subtext = styled(Text)`
  font-size: 15px;
`;

const Seperator = styled(View)`
  height: 5px;
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
  align-items: center;
`;

const Col = styled(View)`
  flex-direction: column;
`;

export default function TabPenguin() {
  const { data } = useSWR(["purchases"], () =>
    Promise.all(
      new Array(5)
        .fill(0)
        .map((_, index) =>
          getPurchases(Date.now() - index * 1000 * 60 * 60 * 24 * 30)
        )
        .reverse()
    )
  );

  const month = new Date().getMonth();
  const last4 = [
    ...(month - 3 < 0 ? MONTHS.slice(11 + (month - 3), 11) : []),
    ...MONTHS.slice(Math.max(month - 3, 0), month + 1),
  ];

  return (
    <ScreenView>
      {data ? (
        <LineChart
          data={{
            labels: last4,
            datasets: [
              {
                data: data.map((e) => e.score),
                color: (opacity = 1) => `rgba(0, 153, 255, ${opacity})`, // optional
                strokeWidth: 5, // optional
              },
            ],
            //legend: ["Rainy Days"] // optional
          }}
          width={screenWidth - 50}
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
          withDots={false}
          fromZero
        />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
      <Seperator />
      <Seperator />
      <Seperator />
      <Row>
        <Leaf />
        <HSeperator />
        <Col>
          <CO2Text>
            {data ? data[data.length - 1].score.toFixed(2) : "0.00"}g CO2
          </CO2Text>
          <Seperator />
          <CO2subtext>Schnitt der letzten 30 Tagen</CO2subtext>
        </Col>
      </Row>
      {/* <Seperator />
      <MaterialCommunityIcons
        size={50}
        name="penguin"
        color={color}
        style={{ marginBottom: -3 }}
      /> */}
    </ScreenView>
  );
}
