import { Product } from '../models/Product';

export function groupProductsByTag(
  products: Product[],
) {
  return products.reduce(
    (acc, product) => {
      if (!acc[product.tag]) {
        acc[product.tag] = [];
      }

      acc[product.tag].push(product);

      return acc;
    },
    {} as Record<string, Product[]>,
  );
}