import * as React from "react";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Layout from "../constants/Layout";
import { ListItem } from "../components/ListItem";

const ScreenView = styled(View)`
  position: relative;
  flex: 1;
  background-color: #fff;
`;

const StyledText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

const PanelView = styled(View)`
  min-height: ${Layout.window.height}px;
  padding: 20px;
  background-color: #f7f5eee8;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
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

const CartEmpty = styled(Text)`
  font-size: 16px;
`;

export default function TabScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [ean, setEan] = useState<string | null>(null);
  const sheetRef = React.useRef<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    if (!enabled) {
      return;
    }
    setEnabled(false);

    setTimeout(() => {
      setEnabled(true);
    }, 300);
    setEan(data);

    sheetRef.current.snapTo(0);
  };

  return (
    <ScreenView>
      {hasPermission === null ? (
        <StyledText>Requesting for permission</StyledText>
      ) : hasPermission === false ? (
        <StyledText>Permission denied</StyledText>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <BottomSheet
        ref={sheetRef}
        snapPoints={[425, 40]}
        initialSnap={1}
        borderRadius={10}
        renderContent={() => (
          <>
            <HeaderView>
              <PanelHeaderView>
                <PanelHandleView />
              </PanelHeaderView>
            </HeaderView>
            <PanelView>
              {!ean && <CartEmpty>Shopping cart is currently empty.</CartEmpty>}
              {ean && <ListItem ean={ean} />}
            </PanelView>
          </>
        )}
      />
    </ScreenView>
  );
}
