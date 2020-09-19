export type ProductEcoMeta = {
  recipe: {
    "co2-value": string;
    rating: "A" | "B" | "C" | "D" | "E";
    "food-unit": number;
  };
};

export interface NutritionFacts {
  nutrients: {
    code: string;
    name: string;
    category: string;
    quantity: number;
    rda_percent_operator: "=" | "<" | ">";
    quantity_unit: string;
  }[];
  base_description: string;
  base_quantity: number;
  base_unit: number;
}

interface MigrosLink {
  url: string;
  name: string;
  type: string;
}

export interface MigrosProduct {
  id: string;
  name: string;
  description: { text: string };
  regulated_description: string;
  status: {
    seasonal: boolean;
    selling_start_date: string;
  };
  categories: {
    code: string;
    name: string;
    parent_code: string;
    image: { original: string; stack: string };
  }[];
  nutrition_facts?: {
    standard: NutritionFacts;
    portion: NutritionFacts;
  };
  additional_nutrition_facts?: {
    standard: NutritionFacts;
    portion: NutritionFacts;
  };
  features: {
    label_code: string;
    label: string;
    values: { value_code: string; value: string }[];
    category_code: string;
  }[];
  image: {
    original: string;
    stack: string;
  };
  image_transparent: {
    original: string;
    stack: string;
  };
  links: {
    migros_ch: MigrosLink;
    migipedia: MigrosLink;
  };
  receipt_text: string;
  price: {
    item: {
      price: number;
      quantity: number;
      display_quantity: string;
    };
  };
  origins?: {
    producing_country?: "Schweizer Produkt";
    country_of_origin?: string;
  };
  package: {
    net_weight: number;
    brutto_weight: number;
  };
  related_products?: {
    purchase_recommendations?: {
      product_ids: string[];
    };
  };
}
