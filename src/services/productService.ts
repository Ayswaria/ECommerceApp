import { Product } from '../models/product';
import { ApiEndpoints } from '../constants/apiEndpoints';

const FALLBACK_IMAGE = 'https://picsum.photos/300/200';
const USE_LOCAL_SAMPLE_DATA = true;

function getSafeImage(rawImage: unknown): string {
  if (typeof rawImage !== 'string') {
    return FALLBACK_IMAGE;
  }

  const trimmed = rawImage.trim();
  return trimmed.length > 0 ? trimmed : FALLBACK_IMAGE;
}

function normalizeProduct(raw: any, index: number): Product {
  const imageList = Array.isArray(raw?.images)
    ? raw.images.filter(
        (u: unknown): u is string => typeof u === 'string' && !!u?.trim(),
      )
    : [];

  const primaryImage = getSafeImage(raw?.image || imageList[0]);

  const parsedId = Number(raw?.id);

  return {
    id: Number.isFinite(parsedId) ? parsedId : index + 1,
    name: String(raw?.name ?? 'Unknown Product'),
    description: String(raw?.description ?? ''),
    price: Number(raw?.price ?? 0),
    strikePrice: Number(raw?.strikePrice ?? raw?.price ?? 0),
    category: String(raw?.category ?? 'General'),
    image: primaryImage,
    rating: Number(raw?.rating ?? 0),
    stock: Number(raw?.stock ?? 0),
    tag: String(raw?.tag ?? 'Featured'),
  };
}

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    if (USE_LOCAL_SAMPLE_DATA) {
      const localProducts = require('../../utils/mockJson/sample.json');
      const list = Array.isArray(localProducts) ? localProducts : [];
      return list.map(normalizeProduct);
    }

    const response = await fetch(ApiEndpoints.products);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.map(normalizeProduct);
    }

    if (Array.isArray(data?.products)) {
      return data.products.map(normalizeProduct);
    }

    return [];
  }
}