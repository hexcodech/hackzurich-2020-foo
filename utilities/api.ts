import base64 from "base-64";
import { MigrosProduct } from "../types/Product";

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
        return fetchMigros(ean);
      }

      return data;
    });
