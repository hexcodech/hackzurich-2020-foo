import base64 from "base-64";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { MigrosProduct, ProductEcoMeta } from "../types/Product";
import Constants from "expo-constants";

const username = "hackzurich2020";
const password = "uhSyJ08KexKn4ZFS";

const DEVICE_ID = "gurke";

export const fetchMigros = (
  ean: string
): Promise<{ total_hits: number; products: MigrosProduct[] }> =>
  fetch(
    `https://hackzurich-api.migros.ch/products?search=${ean}&verbosity=full`,
    {
      headers: {
        Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
        "Accept-Language": "de-DE, de-CH, de",
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if ("code" in data) {
        console.log(data);
        return Promise.reject("dumb api");
      }

      return data;
    });

export const submitPurchase = (
  score: number,
  quantity: number
): Promise<{ total_hits: number; products: MigrosProduct[] }> =>
  fetch(`http://192.168.0.43:3000/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify({
      deviceId: DEVICE_ID,
      date: Date.now(),
      score,
      count: quantity,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if ("code" in data) {
        console.log(data);
        return Promise.reject("dumb api");
      }

      return data;
    });

export const getPurchases = (
  timestamp: number
): Promise<{ score: number; count: number }> =>
  fetch(
    `http://192.168.0.43:3000/purchase/user/${DEVICE_ID}?when=${timestamp}`
  ).then((resp) => resp.json());

export const getGeoPurchases = (): Promise<
  { plz: number; score: number; count: number; city: string }[]
> =>
  fetch(
    `http://192.168.0.43:3000/purchase/geographic-areas/?when=${Date.now()}`
  ).then((resp) => resp.json());

export const fetchEco = (
  name: string,
  origin?: string
): Promise<ProductEcoMeta | null> => {
  const body = origin
    ? {
        name,
        origin,
        /*transport: "air/ground" , production, conservation, packaging*/
      }
    : { name };

  return fetch(`http://192.168.0.43:3000/eaternity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
};

export const MAP_RATING_TO_COLOR = {
  A: "#7ED321",
  B: "#f39c12",
  C: "#d35400",
  D: "#e74c3c",
  E: "#c0392b",
};
