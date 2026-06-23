# Deep Linking Setup Guide

## Overview

This app supports deep linking via React Navigation using the `ecommerceapp://` URI scheme.

## Configuration Summary

### URI Scheme

- **Scheme**: `ecommerceapp://`
- **Web URLs**: `https://myshoplite.com`, `http://myshoplite.com`

### Route Mapping

| Route          | Deep Link                    | Web URL                              |
| -------------- | ---------------------------- | ------------------------------------ |
| Home           | `ecommerceapp://`            | `https://myshoplite.com/`            |
| Products       | `ecommerceapp://products`    | `https://myshoplite.com/products`    |
| Product Detail | `ecommerceapp://product/123` | `https://myshoplite.com/product/123` |
| Cart           | `ecommerceapp://cart`        | `https://myshoplite.com/cart`        |

## iOS Configuration

### 1. **Register URI Scheme in Xcode**

#### Option A: Via Xcode GUI

1. Open `ios/ECommerceApp.xcworkspace` in Xcode
2. Select the ECommerceApp target
3. Go to **Info** tab
4. Scroll to **URL Types** section (or add if missing)
5. Click the **+** button to add new URL type
6. Set:
   - **Identifier**: `com.flydubai.ecommerceapp`
   - **URL Schemes**: `ecommerceapp`

#### Option B: Direct in Info.plist

Add to `ios/ECommerceApp/Info.plist`:

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

### 2. **Test Deep Links on iOS**

**Using Terminal (Simulator)**:

```bash
# Open product with ID 42
xcrun simctl openurl booted "ecommerceapp://product/42"

# Navigate to products
xcrun simctl openurl booted "ecommerceapp://products"

# Navigate to cart
xcrun simctl openurl booted "ecommerceapp://cart"

# Navigate to home
xcrun simctl openurl booted "ecommerceapp://"
```

**Using Safari in Simulator**:

1. Open Safari
2. Type in address bar: `ecommerceapp://product/123`
3. Press Enter

---

## Android Configuration

### 1. **Update AndroidManifest.xml**

Edit `android/app/src/main/AndroidManifest.xml` and add intent-filter to MainActivity:

```xml
<activity
  android:name=".MainActivity"
  android:label="@string/app_name"
  android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
  android:windowSoftInputMode="adjustResize"
  android:launchMode="singleTask">

  <!-- Add this intent-filter for deep linking -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="ecommerceapp" />
  </intent-filter>

  <!-- Optional: Add web URL support -->
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

### 2. **Test Deep Links on Android**

**Using Terminal (Emulator)**:

```bash
# Open product with ID 42
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://product/42"

# Navigate to products
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://products"

# Navigate to cart
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://cart"

# Navigate to home
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://"
```

**Using Chrome in Emulator**:

1. Open Chrome
2. Type in address bar: `ecommerceapp://product/123`
3. Press Enter (or let it redirect)

---

## Usage in Code

### Direct Navigation (Recommended for In-App)

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

### Build Deep Link for Sharing

```tsx
import { buildDeepLink } from '@/utils/deepLinking';

// Build shareable link
const shareLink = buildDeepLink.product(123);
// "ecommerceapp://product/123"

// Or web URL
const webLink = buildDeepLink.webProduct(123);
// "https://myshoplite.com/product/123"
```

### Open External Deep Link

```tsx
import { useDeepLinking } from '@/utils/deepLinking';

const { openDeepLink } = useDeepLinking();

openDeepLink('ecommerceapp://product/456');
```

---

## Troubleshooting

### iOS

- **Deep link not working**: Verify URL scheme is registered in Xcode Info tab
- **App not launching**: Check Info.plist structure and ensure scheme matches
- **Simulator issues**: Try `xcrun simctl openurl booted "ecommerceapp://..."` with different ID

### Android

- **Deep link not working**: Ensure AndroidManifest.xml intent-filter is correct
- **App not launching**: Check app installation with `adb shell pm list packages | grep ecommerce`
- **Emulator issues**: Restart emulator if URL handling doesn't work

### Both

- **Check Logs**:
  - iOS: `console.log()` in `useEffect` of AppNavigationScreen
  - Android: `adb logcat` to see system and app logs
- **Test URL Format**: Ensure URL matches exactly (case-sensitive parameters)

---

## Files Modified

1. **app.json** - Added `"scheme": "ecommerceapp"`
2. **src/config/deepLinkingConfig.ts** - Deep linking configuration (new)
3. **src/ui/navigation/appNavigationScreen.tsx** - Integrated linking config
4. **src/ui/products/productDetails/productDetailsScreen.tsx** - Handle `:id` param
5. **src/utils/deepLinking.ts** - Helper hooks and utilities (new)

---

## Next Steps

1. **iOS Setup**: Add URL scheme in Xcode (see iOS Configuration)
2. **Android Setup**: Update AndroidManifest.xml (see Android Configuration)
3. **Test**: Use terminal commands to test deep links
4. **Share**: Use `buildDeepLink` utilities to create shareable links

---

## References

- [React Navigation Deep Linking](https://reactnavigation.org/docs/deep-linking-guide/)
- [iOS URL Schemes](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app)
- [Android Deep Links](https://developer.android.com/training/app-links/deep-linking)
