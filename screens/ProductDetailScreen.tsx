import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { useContext, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import useSwr from "swr";
import { ScannerParamList } from "../navigation/BottomTabNavigator";
import { fetchEco, fetchMigros, MAP_RATING_TO_COLOR } from "../utilities/api";
import { AppContext } from "../utilities/context";
import Button from "../components/Button";
import Leaf from "../components/Leaf";
import Heart from "../components/Heart";
import { NutritionFacts } from "../types/Product";
import Price from "../components/Price";
import Money from "../components/Money";

const NUTRIENTS_SHOULD: { [key: string]: number } = {
  PIM_NUT_ENERGY: 8400,
  PIM_NUT_FETT: 78,
  PIM_NUT_FETT_GES: 20,
  PIM_NUT_KOHLENHY: 275,
  PIM_NUT_ZUCKER: 53.5,
  PIM_NUT_PROTEINE: 50,
};

const ScreenView = styled(SafeAreaView)`
  position: relative;
  flex: 1;
  background-color: #fff;
  justify-content: flex-start;
  padding: 20px;
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
  border: #000 2px solid;
  padding: 15px;
  border-radius: 10px;
`;
const QuantityText = styled(Text)`
  color: #000;
  font-size: 30px;
`;

const CenterRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Buttons = styled(View)`
  margin: 0px 16px;
`;

const IconRow = styled(View)`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const IconWrapper = styled(View)`
  margin-right: 16px;
`;

const TitleWrapper = styled(Text)`
  font-size: 24px;
  margin-bottom: 8px;
`;

const TextWrapper = styled(Text)`
  font-size: 16px;
  margin-bottom: 4px;
`;

interface IProps {
  route: RouteProp<ScannerParamList, "ProductDetail">;
  navigation: StackNavigationProp<ScannerParamList, "ProductDetail">;
}

type Nutrient = NutritionFacts["nutrients"];

const ProductDetailScreen: React.FunctionComponent<IProps> = ({
  navigation,
  route: {
    params: { ean },
  },
}) => {
  const { data, error, isValidating } = useSwr(
    ["MIGROS_PRODUCT", ean],
    (_, ean) => fetchMigros(ean)
  );

  const { products, removeProduct, updateProduct } = useContext(AppContext);

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
    if (product?.origins?.producing_country) {
      return product.origins.producing_country;
    } else if (product?.origins?.country_of_origin) {
      return `aus ${product.origins.country_of_origin}`;
    }

    return null;
  }, [product]);

  const { data: eaternityData } = useSwr(
    ["EATERNITY", product?.name],
    (_, name) =>
      name ? fetchEco(name, origin || undefined) : Promise.resolve(null)
  );

  useEffect(() => {
    if (data?.products && data.products.length === 0 && ean) {
      //useless
      removeProduct(ean);
    } else if (eaternityData) {
      const p = products.find((p) => p.ean === ean);

      if (p) {
        updateProduct(
          p.ean,
          p.quantity,
          parseInt(eaternityData.recipe["co2-value"])
        );
      }
    }
  }, [data, eaternityData]);

  if (!product || !ean) {
    return (
      <ScreenView>
        <ActivityIndicator size="large" color="#000" />
      </ScreenView>
    );
  }

  //@ts-ignore
  const nut: Nutrient[] = [
    ...(product.nutrition_facts?.standard.nutrients || []),
    ...(product.additional_nutrition_facts?.standard.nutrients || []),
  ];

  return (
    <ScreenView>
      <ScrollView>
        <CenterRow>
          <Image
            source={{ uri: product.image_transparent.original }}
            style={{ width: 150, height: 150, marginBottom: 50 }}
          />
        </CenterRow>
        <Row>
          <QuantityView>
            <QuantityText>{cartEntry?.quantity || 0}</QuantityText>
          </QuantityView>
          <Buttons>
            <Button
              title="+"
              onPress={() =>
                cartEntry?.quantity &&
                updateProduct(ean, cartEntry.quantity + 1, cartEntry.score)
              }
              marginBottom={4}
            />
            <Button
              title="–"
              onPress={() =>
                cartEntry?.quantity &&
                cartEntry.quantity > 1 &&
                updateProduct(ean, cartEntry.quantity - 1, cartEntry.score)
              }
            />
          </Buttons>
          <Name>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductOrigin>{origin}</ProductOrigin>
          </Name>
        </Row>
        <IconRow>
          <IconWrapper>
            <Money />
          </IconWrapper>
          <Price color="#4990E2">
            {cartEntry ? cartEntry.quantity * product.price.item.price : 0}
          </Price>
        </IconRow>
        <IconRow>
          <IconWrapper>
            <Leaf
              color={MAP_RATING_TO_COLOR[eaternityData?.recipe.rating || "A"]}
            />
          </IconWrapper>
          <View>
            <Text style={{ marginBottom: 4, fontWeight: "800" }}>
              Klimabewertung
            </Text>
            {!eaternityData && <ActivityIndicator size="small" color="#000" />}
            {eaternityData && (
              <>
                <TextWrapper>
                  Bewertung: {eaternityData.recipe.rating}
                </TextWrapper>
                <TextWrapper>
                  Kostet {eaternityData.recipe["co2-value"]} g CO2
                </TextWrapper>
              </>
            )}
          </View>
        </IconRow>
        {nut.length > 0 && (
          <IconRow>
            <IconWrapper>
              <Heart />
            </IconWrapper>
            <View>
              <Text style={{ marginBottom: 4, fontWeight: "800" }}>
                Anteil täglicher Bedarf
              </Text>
              {Object.keys(NUTRIENTS_SHOULD)
                .map((c) => {
                  const n = product.nutrition_facts?.standard.nutrients.find(
                    (n) => n.code === c
                  );
                  if (!n) {
                    return null;
                  }

                  const p = ((100 * n.quantity) / NUTRIENTS_SHOULD[c]).toFixed(
                    2
                  );

                  return [`${n.name.replaceAll("davon ", "")}: ${p}%`, p];
                })
                .filter((e) => e)
                //@ts-ignore
                .sort(([_, v1], [__, v2]) => v2 - v1)
                .slice(0, 2)
                .map((s, index) => (
                  <Text key={index} style={{ marginBottom: 3 }}>
                    {s[0]}
                  </Text>
                ))}
            </View>
          </IconRow>
        )}
        {/* <IconRow>
          <IconWrapper>
            <Airplane />
          </IconWrapper>
          <View>
            <TextWrapper>hi</TextWrapper>
            <TextWrapper>hi</TextWrapper>
          </View>
        </IconRow> */}
        {nut.length > 0 && (
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        )}
        {nut.length > 0 && <TitleWrapper>Inhaltsstoffe</TitleWrapper>}
        {nut.map((n) => (
          <TextWrapper key={n.code}>
            {`${
              !n.rda_percent_operator || n.rda_percent_operator === "="
                ? ""
                : n.rda_percent_operator + " "
            }${n.quantity} ${n.quantity_unit} ${n.name}`}
          </TextWrapper>
        ))}
      </ScrollView>
    </ScreenView>
  );
};

export default ProductDetailScreen;
