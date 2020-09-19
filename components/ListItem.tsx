import React, { useMemo } from "react";
import { FunctionComponent } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import styled from "styled-components";
import useSwr from "swr";
import { fetchMigros } from "../utilities/api";
import Price from "./Price";

type IProps = { ean: string };

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
  border: #4990e2 2px solid;
  padding: 15px;
  border-radius: 10px;

  margin-right: 15px;
`;
const QuantityText = styled(Text)`
  color: #4990e2;
  font-size: 30px;
`;

export const ListItem: FunctionComponent<IProps> = React.memo(({ ean }) => {
  const { data, error, isValidating } = useSwr(ean, fetchMigros);

  const product = useMemo(() => {
    if (data?.products && data.products.length > 0) {
      return data.products[0];
    }

    return null;
  }, [data]);

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
          <QuantityText>3</QuantityText>
        </QuantityView>
        <Price>{product.price.item.price}</Price>
      </ItemRow>
    </ItemView>
  );
});
