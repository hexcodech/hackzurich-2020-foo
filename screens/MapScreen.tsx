import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import BottomSheet from "reanimated-bottom-sheet";
import Layout from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import useSWR from "swr";
import { getGeoPurchases } from "../utilities/api";

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

const PanelView = styled(View)`
  min-height: ${Layout.window.height}px;
  padding: 20px;
  background-color: #f7f5eee8;
`;

const HeaderView = styled(View)`
  background-color: #f7f5eee8;
  shadow-color: #000;
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const PanelHeaderView = styled(View)`
  align-items: center;
`;

const PanelHandleView = styled(View)`
  width: 40px;
  height: 8px;
  border-radius: 4px;
  background-color: #00000040;
  margin-bottom: 10px;
`;

const tableHead = ["Gemeinde", "g CO2", "Einkäufe"];

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#fff0" },
  text: { margin: 10 },
});

export default function TabMap() {
  const sheetRef = React.useRef<any>(null);

  const { data } = useSWR(["geo-purchases"], () => getGeoPurchases());

  return (
    <ScreenView>
      <StyledText>Tab Map</StyledText>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[Layout.window.height - 100, 425, 13]}
        initialSnap={2}
        borderRadius={10}
        enabledContentTapInteraction={false}
        renderContent={() => (
          <>
            <HeaderView>
              <PanelHeaderView>
                <PanelHandleView />
              </PanelHeaderView>
            </HeaderView>
            <PanelView>
              <ScrollView>
                {data ? (
                  <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                    <Row
                      data={tableHead}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                    <Rows
                      data={data
                        .sort((e1, e2) => e1.score - e2.score)
                        .slice(0, 8)
                        .map((e) => [e.city, `${e.score}g`, e.count])}
                      textStyle={styles.text}
                    />
                  </Table>
                ) : (
                  <ActivityIndicator size="large" color="#000" />
                )}
              </ScrollView>
            </PanelView>
          </>
        )}
      />
    </ScreenView>
  );
}
