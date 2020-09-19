import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { useContext, useMemo, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import useSWR from "swr";
import { ScannerParamList } from "../navigation/BottomTabNavigator";
import { fetchMigros } from "../utilities/api";
import { AppContext } from "../utilities/context";
import Button from "../components/Button";

const ScreenView = styled(SafeAreaView)`
  position: relative;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

const Name = styled(View)``;

const ProductTitle = styled(Text)`
  font-size: 24px;
  margin-bottom: 2px;
`;
const ProductOrigin = styled(Text)`
  font-size: 18px;
  color: #9b9b9b;
`;

const QuantityView = styled(View)`
  border: #4990e2 2px solid;
  padding: 15px;
  border-radius: 10px;
`;
const QuantityText = styled(Text)`
  color: #4990e2;
  font-size: 30px;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const Buttons = styled(View)`
  margin: 0px 16px;
`;

interface IProps {
  route: RouteProp<ScannerParamList, "ProductDetail">;
  navigation: StackNavigationProp<ScannerParamList, "ProductDetail">;
}

const ProductDetailScreen: React.FunctionComponent<IProps> = ({
  navigation,
  route: {
    params: { ean },
  },
}) => {
  const { data, error, isValidating } = useSWR(
    ["MIGROS_PRODUCT", ean],
    (_, ean) => fetchMigros(ean)
  );

  const { products, removeProduct, updateQuantity } = useContext(AppContext);

  const product = useMemo(() => {
    if (data?.products && data.products.length > 0) {
      return data.products[0];
    }

    return null;
  }, [data]);

  const cartEntry = useMemo(() => products.find((p) => p.ean === ean), [
    products,
    ean,
  ]);

  useEffect(() => {
    if (data?.products && data.products.length === 0 && ean) {
      //useless
      removeProduct(ean);
    }
  }, [data]);

  const origin = useMemo(() => {
    if (product?.origins.producing_country) {
      return product.origins.producing_country;
    } else if (product?.origins.country_of_origin) {
      return `aus ${product.origins.country_of_origin}`;
    }

    return null;
  }, [product]);

  if (!product || !ean) {
    return (
      <ScreenView>
        <ActivityIndicator size="large" color="#000" />
      </ScreenView>
    );
  }

  return (
    <ScreenView>
      <Image
        source={{ uri: product.image_transparent.original }}
        style={{ width: 150, height: 150, marginBottom: 50 }}
      />
      <Row>
        <QuantityView>
          <QuantityText>{cartEntry?.quantity || 0}</QuantityText>
        </QuantityView>
        <Buttons>
          <Button
            title="+"
            onPress={() =>
              cartEntry?.quantity && updateQuantity(ean, cartEntry.quantity + 1)
            }
            marginBottom={4}
          />
          <Button
            title="–"
            onPress={() =>
              cartEntry?.quantity && updateQuantity(ean, cartEntry.quantity - 1)
            }
          />
        </Buttons>
        <Name>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductOrigin>{origin}</ProductOrigin>
        </Name>
      </Row>
    </ScreenView>
  );
};

export default ProductDetailScreen;
