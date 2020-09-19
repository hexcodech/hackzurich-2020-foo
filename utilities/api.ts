import base64 from "base-64";
import { MigrosProduct, ProductEcoMeta } from "../types/Product";

const username = "hackzurich2020";
const password = "uhSyJ08KexKn4ZFS";

export const fetchMigros = (
  ean: string
): Promise<{ total_hits: number; products: MigrosProduct[] }> =>
  fetch(
    `https://hackzurich-api.migros.ch/products?search=${ean}&verbosity=full`,
    {
      headers: {
        Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
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
