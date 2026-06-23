# Deep Linking Implementation Summary

## ✅ What Was Implemented

### 1. **Deep Linking Configuration** ✓

- URI Scheme: `ecommerceapp://`
- Web URLs: `https://myshoplite.com` (HTTP & HTTPS)
- Route mapping for all screens: Home, ProductTabs, ProductDetail, Cart

### 2. **Navigation Setup** ✓

- Updated `appNavigationScreen.tsx` with React Navigation's `linking` configuration
- Added `useEffect` to listen for deep link events when app is open
- Fallback component (HomeScreen) for when navigation initializes

### 3. **Deep Link Handler** ✓

- Modified `productDetailsScreen.tsx` to accept both:
  - Direct navigation: `route.params?.product` (from ProductList navigation)
  - Deep link: `route.params?.id` (from deep link parsing)
- Implemented async product fetching by ID for deep link scenarios

### 4. **Helper Utilities** ✓

- Created `src/utils/deepLinking.ts`:
  - `useDeepLinking()` hook for in-app navigation
  - `buildDeepLink` object for constructing shareable URLs
  - `openDeepLink()` function for external links

### 5. **Configuration Files** ✓

- Updated `app.json` with scheme registration
- Created `src/config/deepLinkingConfig.ts` for centralized linking config
- Created comprehensive `DEEP_LINKING_SETUP.md` with iOS/Android setup instructions

### 6. **Tests** ✓

- Created `__tests__/deepLinking.test.ts`
- 9 test cases, all passing:
  - ✓ Prefix validation
  - ✓ Route mapping verification
  - ✓ URL format examples
  - ✓ Parameter variations

---

## 📋 Route Configuration

| Screen             | Deep Link                    | Web URL                              | Parameters        |
| ------------------ | ---------------------------- | ------------------------------------ | ----------------- |
| **Home**           | `ecommerceapp://`            | `https://myshoplite.com/`            | None              |
| **Products**       | `ecommerceapp://products`    | `https://myshoplite.com/products`    | None              |
| **Product Detail** | `ecommerceapp://product/123` | `https://myshoplite.com/product/123` | `id` (product ID) |
| **Cart**           | `ecommerceapp://cart`        | `https://myshoplite.com/cart`        | None              |

---

## 🔧 Usage Examples

### In-App Navigation (Recommended)

```tsx
import { useDeepLinking } from '@/utils/deepLinking';

export function ProductCard({ product }) {
  const { navigateToProduct } = useDeepLinking();

  return (
    <TouchableOpacity onPress={() => navigateToProduct(product.id)}>
      <Text>{product.name}</Text>
    </TouchableOpacity>
  );
}
```

### Build Shareable Links

```tsx
import { buildDeepLink } from '@/utils/deepLinking';

// Native app link
const link = buildDeepLink.product(123);
// "ecommerceapp://product/123"

// Web link
const webLink = buildDeepLink.webProduct(123);
// "https://myshoplite.com/product/123"

// SMS/Email sharing
Share.share({
  message: `Check out this product: ${webLink}`,
});
```

### Handle External Deep Links

```tsx
const { openDeepLink } = useDeepLinking();

openDeepLink('ecommerceapp://product/456');
```

---

## 🍎 iOS Setup

### 1. Register URI Scheme in Xcode

**Via Xcode GUI:**

1. Open `ios/ECommerceApp.xcworkspace`
2. Select **ECommerceApp** target → **Info** tab
3. Find **URL Types** section (or add if missing)
4. Click **+** to add new type
5. Set:
   - **Identifier**: `com.flydubai.ecommerceapp`
   - **URL Schemes**: `ecommerceapp`

**Or edit `ios/ECommerceApp/Info.plist` directly:**

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>ecommerceapp</string>
    </array>
    <key>CFBundleURLName</key>
    <string>com.flydubai.ecommerceapp</string>
  </dict>
</array>
```

### 2. Test on iOS Simulator

```bash
# Product detail
xcrun simctl openurl booted "ecommerceapp://product/42"

# Products list
xcrun simctl openurl booted "ecommerceapp://products"

# Cart
xcrun simctl openurl booted "ecommerceapp://cart"

# Home
xcrun simctl openurl booted "ecommerceapp://"
```

---

## 🤖 Android Setup

### 1. Update `android/app/src/main/AndroidManifest.xml`

Add intent-filter to MainActivity:

```xml
<activity
  android:name=".MainActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask">

  <!-- Deep linking for custom scheme -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="ecommerceapp" />
  </intent-filter>

  <!-- Web URL support (optional) -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
      android:scheme="https"
      android:host="myshoplite.com" />
  </intent-filter>

  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
</activity>
```

### 2. Test on Android Emulator

```bash
# Product detail
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://product/42"

# Products list
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://products"

# Cart
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://cart"

# Home
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://"
```

---

## 📁 Files Modified/Created

### Modified Files:

1. **app.json** - Added `"scheme": "ecommerceapp"`
2. **src/ui/navigation/appNavigationScreen.tsx** - Integrated linking config, added event listener
3. **src/ui/products/productDetails/productDetailsScreen.tsx** - Added ID parameter handling and async product fetching

### New Files:

1. **src/config/deepLinkingConfig.ts** - Centralized linking configuration
2. **src/utils/deepLinking.ts** - Helper hooks and utilities
3. ****tests**/deepLinking.test.ts** - Jest tests (9 tests, all passing ✓)
4. **DEEP_LINKING_SETUP.md** - Comprehensive setup guide

---

## ✅ Test Results

```
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Time:        0.364 s

Tests Passing:
✓ Deep Linking Configuration (6 tests)
  - Correct prefixes configured
  - Route mappings verified
  - All 4 routes configured

✓ Deep Link URL Examples (3 tests)
  - Native scheme validation
  - Web URL validation
  - Parameter variations
```

---

## 🚀 Next Steps

1. **iOS**: Add URL scheme in Xcode (see iOS Setup section)
2. **Android**: Update AndroidManifest.xml (see Android Setup section)
3. **Test**: Use provided terminal commands to test deep links
4. **Share**: Use `buildDeepLink` utilities to create shareable links

---

## 📚 Reference

- [React Navigation Deep Linking](https://reactnavigation.org/docs/deep-linking-guide/)
- [iOS URL Schemes](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app)
- [Android Deep Links](https://developer.android.com/training/app-links/deep-linking)

---

## 💡 Important Notes

### URI Scheme Choice

- **`ecommerceapp://`** - Based on your app name (recommended for your project)
- Alternative: `flydubai://` (brand-specific)
- Alternative: `myshoplite://` (existing brand name)

The scheme is uniquely registered to your app and won't conflict with others.

### How It Works

1. **User receives link**: SMS, email, notification, etc. with `ecommerceapp://product/123`
2. **OS recognizes scheme**: OS knows `ecommerceapp://` belongs to your app
3. **App launches** (or comes to foreground if already open)
4. **React Navigation parses URL**: Matches against `config.screens` mapping
5. **Route navigates**: App displays ProductDetail screen for product ID 123
6. **Product loads**: If passed via deep link, ProductDetail fetches product by ID

### Production Considerations

- Consider adding URL validation in production
- Log deep link events for analytics
- Handle error cases (invalid product IDs, etc.)
- Consider universal links (iOS) and App Links (Android) for web integration
