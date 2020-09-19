import * as React from "react";
import { useState, useEffect, useContext, FunctionComponent } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Layout from "../constants/Layout";
import { ListItem } from "../components/ListItem";
import { AppContext } from "../utilities/context";
import {
  BottomTabParamList,
  ScannerParamList,
} from "../navigation/BottomTabNavigator";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { submitPurchase } from "../utilities/api";

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

const Checkout = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  background-color: #4990e2;

  margin-top: 10px;
`;

interface IProps {
  route: RouteProp<ScannerParamList, "ScannerScreen">;
  navigation: StackNavigationProp<ScannerParamList, "ScannerScreen">;
}

const ScannerScreen: FunctionComponent<IProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [enabled, setEnabled] = useState(true);
  const sheetRef = React.useRef<any>(null);
  const { products, addProduct, setProducts } = useContext(AppContext);

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
    }, 1000);

    addProduct(data, 1);

    sheetRef.current.snapTo(1);
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
        snapPoints={[Layout.window.height - 100, 425, 40]}
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
                {products.length === 0 && (
                  <CartEmpty>
                    Der Warenkorb ist moment leer. Scannen Sie die den Barcode
                    auf Produkten.
                  </CartEmpty>
                )}
                {products.map((product) => (
                  <TouchableOpacity
                    key={product.ean}
                    onPress={() => {
                      navigation.navigate("ProductDetail", {
                        ean: product.ean,
                      });
                    }}
                  >
                    <ListItem ean={product.ean} quantity={product.quantity} />
                  </TouchableOpacity>
                ))}
                {(products.length > 0 || true) && (
                  <Checkout
                    onPress={() => {
                      Promise.all(
                        products.map((p) =>
                          submitPurchase(p.score || 0, p.quantity)
                        )
                      ).then(() => {
                        sheetRef.current.snapTo(2);
                        setProducts([]);
                      });
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Einkauf abschliessen</Text>
                  </Checkout>
                )}
                <View style={{ height: 280 }} />
              </ScrollView>
            </PanelView>
          </>
        )}
      />
    </ScreenView>
  );
};

export default ScannerScreen;
