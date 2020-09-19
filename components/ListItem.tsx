import React, { useContext, useEffect, useMemo } from "react";
import { FunctionComponent } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import styled from "styled-components";
import useSwr from "swr";
import { fetchEco, fetchMigros, MAP_RATING_TO_COLOR } from "../utilities/api";
import { AppContext } from "../utilities/context";
import Leaf from "./Leaf";
import Price from "./Price";

type IProps = { ean: string; quantity: number };

const ItemView = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 40px;
`;

const ItemRow = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  padding-bottom: 25px;
`;

const Name = styled(View)`
  margin-left: 16px;
`;

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

  margin-right: 15px;
`;
const QuantityText = styled(Text)`
  color: #000;
  font-size: 30px;
`;

const LeafWrapper = styled(View)`
  margin-left: 15px;
`;

export const ListItem: FunctionComponent<IProps> = React.memo(
  ({ ean, quantity }) => {
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

    const { data: eaternityData } = useSwr(
      ["EATERNITY", product?.name],
      (_, name) =>
        name ? fetchEco(name, origin || undefined) : Promise.resolve(null)
    );

    useEffect(() => {
      if (data?.products && data.products.length === 0) {
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

    const origin = useMemo(() => {
      if (product?.origins.producing_country) {
        return product.origins.producing_country;
      } else if (product?.origins.country_of_origin) {
        return `aus ${product.origins.country_of_origin}`;
      }

      return null;
    }, [product]);

    if (!product) {
      return (
        <ItemView>
          <ActivityIndicator size="small" color="#000" />
        </ItemView>
      );
    }

    return (
      <ItemView>
        <ItemRow>
          <Image
            source={{ uri: product.image_transparent.original }}
            style={{ width: 75, height: 75 }}
          />
          <Name>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductOrigin>{origin}</ProductOrigin>
          </Name>
        </ItemRow>
        <ItemRow>
          <QuantityView>
            <QuantityText>{quantity}</QuantityText>
          </QuantityView>
          <Price>{quantity * product.price.item.price}</Price>
          <LeafWrapper>
            <Leaf
              color={MAP_RATING_TO_COLOR[eaternityData?.recipe.rating || "A"]}
            />
          </LeafWrapper>
        </ItemRow>
      </ItemView>
    );
  }
);
