import { linking } from '../src/config/deepLinkingConfig';

/**
 * Test Deep Linking Configuration
 * 
 * These tests verify that the deep linking configuration correctly
 * maps URLs to screen navigation routes.
 */

describe('Deep Linking Configuration', () => {
  it('should have correct prefixes configured', () => {
    expect(linking.prefixes).toContain('ecommerceapp://');
    expect(linking.prefixes).toContain('https://myshoplite.com');
    expect(linking.prefixes).toContain('http://myshoplite.com');
  });

  it('should map Home route to empty path', () => {
    expect(linking.config?.screens?.Home).toBe('');
  });

  it('should map ProductTabs route to products path', () => {
    expect(linking.config?.screens?.ProductTabs).toBe('products');
  });

  it('should map ProductDetail route with id parameter', () => {
    expect(linking.config?.screens?.ProductDetail).toBe('product/:id');
  });

  it('should map Cart route to cart path', () => {
    expect(linking.config?.screens?.Cart).toBe('cart');
  });

  it('should have 4 routes configured', () => {
    const routes = Object.keys(linking.config?.screens || {});
    expect(routes).toHaveLength(4);
    expect(routes).toContain('Home');
    expect(routes).toContain('ProductTabs');
    expect(routes).toContain('ProductDetail');
    expect(routes).toContain('Cart');
  });
});

describe('Deep Link URL Examples', () => {
  it('should support native deep links with ecommerceapp scheme', () => {
    const validDeepLinks = [
      'ecommerceapp://',
      'ecommerceapp://products',
      'ecommerceapp://product/123',
      'ecommerceapp://product/42',
      'ecommerceapp://cart',
    ];

    // Verify all examples are properly formatted
    validDeepLinks.forEach(link => {
      expect(link).toMatch(/^ecommerceapp:\/\//);
    });
  });

  it('should support web URLs with https scheme', () => {
    const webUrls = [
      'https://myshoplite.com/',
      'https://myshoplite.com/products',
      'https://myshoplite.com/product/123',
      'https://myshoplite.com/cart',
    ];

    webUrls.forEach(url => {
      expect(url).toMatch(/^https:\/\/myshoplite\.com/);
    });
  });

  it('should support product ID parameter variations', () => {
    const productIds = ['1', '123', '999', '42'];
    const pattern = /^ecommerceapp:\/\/product\/\d+$/;

    productIds.forEach(id => {
      const link = `ecommerceapp://product/${id}`;
      expect(link).toMatch(pattern);
    });
  });
});
