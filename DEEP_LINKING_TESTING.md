# Deep Linking Testing Guide

## Quick Test Commands

### iOS Simulator

```bash
# Test 1: Navigate to product with ID 1
xcrun simctl openurl booted "ecommerceapp://product/1"

# Test 2: Navigate to products list
xcrun simctl openurl booted "ecommerceapp://products"

# Test 3: Navigate to cart
xcrun simctl openurl booted "ecommerceapp://cart"

# Test 4: Navigate to home
xcrun simctl openurl booted "ecommerceapp://"

# Test 5: Web URL (if app is registered for web deep linking)
xcrun simctl openurl booted "https://myshoplite.com/product/42"
```

### Android Emulator

```bash
# Test 1: Navigate to product with ID 1
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://product/1"

# Test 2: Navigate to products list
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://products"

# Test 3: Navigate to cart
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://cart"

# Test 4: Navigate to home
adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://"

# Test 5: Web URL (if configured)
adb shell am start -W -a android.intent.action.VIEW -d "https://myshoplite.com/product/42"
```

---

## Manual Testing in Simulator/Emulator

### iOS Simulator - Using Safari

1. **Start iOS Simulator**

   ```bash
   xcrun simctl openurl booted "ecommerceapp://product/1"
   ```

2. **Open Safari in Simulator** (Cmd+R)
3. **Type in address bar**: `ecommerceapp://product/123`
4. **Press Enter**
5. App should launch/activate and navigate to ProductDetail screen

### Android Emulator - Using Chrome

1. **Start Android Emulator**

   ```bash
   adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://product/1"
   ```

2. **Open Chrome in Emulator**
3. **Type in address bar**: `ecommerceapp://product/123`
4. **Press Enter**
5. App should launch/activate and navigate to ProductDetail screen

---

## In-App Testing

### Test Deep Link Navigation Programmatically

```tsx
// In any component
import { useDeepLinking } from '@/utils/deepLinking';

export function TestDeepLinking() {
  const { navigateToProduct, navigateToProducts, navigateToCart } =
    useDeepLinking();

  return (
    <View>
      <Button
        title="Test Product Detail (ID: 1)"
        onPress={() => navigateToProduct(1)}
      />
      <Button title="Test Products List" onPress={() => navigateToProducts()} />
      <Button title="Test Cart" onPress={() => navigateToCart()} />
    </View>
  );
}
```

---

## Testing with Links from Other Apps

### iOS

1. **Open Notes app**
2. **Type**: `ecommerceapp://product/123`
3. **Long press** the text
4. **Tap "Open in App"**
5. **Select your app**
6. App should navigate to ProductDetail

### Android

1. **Open Messages app or any text input**
2. **Type**: `ecommerceapp://product/123`
3. **Long press** the link
4. **Tap "Open Link"**
5. **Select your app**
6. App should navigate to ProductDetail

---

## Testing with Share Functionality

### Using buildDeepLink

```tsx
import { Share } from 'react-native';
import { buildDeepLink } from '@/utils/deepLinking';

export function ShareProduct({ product }) {
  const link = buildDeepLink.product(product.id);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${product.name}": ${link}`,
        url: buildDeepLink.webProduct(product.id),
        title: product.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <Button title="Share" onPress={handleShare} />;
}
```

---

## Expected Test Results

### Scenario 1: Product Detail Navigation

**Link**: `ecommerceapp://product/1`

- ✓ App launches or comes to foreground
- ✓ ProductDetail screen displays
- ✓ Product with ID 1 is shown
- ✓ All product details (images, price, description) load

### Scenario 2: Products List Navigation

**Link**: `ecommerceapp://products`

- ✓ App launches or comes to foreground
- ✓ ProductTabs screen displays
- ✓ Products list tab is active
- ✓ Product list loads

### Scenario 3: Cart Navigation

**Link**: `ecommerceapp://cart`

- ✓ App launches or comes to foreground
- ✓ Cart screen displays
- ✓ Shows current cart items (if any)

### Scenario 4: Home Navigation

**Link**: `ecommerceapp://`

- ✓ App launches or comes to foreground
- ✓ Home screen displays
- ✓ Shows product categories/featured products

---

## Debugging Deep Links

### Enable Logging

The app already logs deep link events. Check console:

```tsx
// In appNavigationScreen.tsx - already implemented
Linking.addEventListener('url', ({ url }) => {
  console.log('Deep link received:', url);
});
```

**Check logs**:

- iOS: Xcode console or `xcrun simctl spawn booted log stream --predicate 'process == "ECommerceApp"'`
- Android: `adb logcat | grep -i "deep link"`

### Verify Route Mapping

Run Jest tests:

```bash
npx jest __tests__/deepLinking.test.ts --watchman=false
```

Should see all 9 tests passing.

### Check Configuration

1. **Verify app.json**

   ```json
   {
     "scheme": "ecommerceapp"
   }
   ```

2. **Verify iOS Info.plist** (should have URL types)

   ```xml
   <key>CFBundleURLTypes</key>
   <array>
     <dict>
       <key>CFBundleURLSchemes</key>
       <array>
         <string>ecommerceapp</string>
       </array>
     </dict>
   </array>
   ```

3. **Verify Android AndroidManifest.xml** (should have intent-filter)
   ```xml
   <intent-filter>
     <action android:name="android.intent.action.VIEW" />
     <category android:name="android.intent.category.DEFAULT" />
     <category android:name="android.intent.category.BROWSABLE" />
     <data android:scheme="ecommerceapp" />
   </intent-filter>
   ```

---

## Common Issues & Solutions

### Issue: Deep link not working on iOS

**Solution**:

1. Verify URL scheme registered in Xcode Info tab
2. Check Info.plist for correct structure
3. Try: `xcrun simctl openurl booted "ecommerceapp://"`
4. Check Xcode console for errors

### Issue: Deep link not working on Android

**Solution**:

1. Verify AndroidManifest.xml has intent-filter
2. Rebuild app: `npx react-native run-android`
3. Try: `adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://"`
4. Check: `adb logcat` for errors

### Issue: Product not loading from deep link

**Solution**:

1. Check ProductService.getProducts() is working
2. Verify product ID is valid (exists in mock data)
3. Check console logs for fetch errors
4. ProductDetailScreen should show "Loading..." if fetching

### Issue: App not launching from link

**Solution**:

1. Ensure app is properly built and installed
2. iOS: Check scheme in URL matches CFBundleURLSchemes exactly
3. Android: Rebuild after manifest changes: `cd android && ./gradlew clean`
4. Restart simulator/emulator

---

## Performance Notes

- Deep link parsing is fast (handled by React Navigation)
- Product fetching happens asynchronously
- No noticeable delay for product detail display
- Links work whether app is:
  - **Cold start** (app not running) - launches and navigates
  - **Background** (app backgrounded) - brings to foreground and navigates
  - **Foreground** (app already open) - navigates without relaunching

---

## Testing Checklist

- [ ] iOS deep link: `ecommerceapp://product/1` works
- [ ] Android deep link: `adb shell ... ecommerceapp://product/1` works
- [ ] Web link: `https://myshoplite.com/product/1` opens (if web configured)
- [ ] Jest tests: `npm test __tests__/deepLinking.test.ts` passes (9/9)
- [ ] In-app navigation: `useDeepLinking()` functions work
- [ ] Build deep link: `buildDeepLink.product(123)` creates correct URL
- [ ] Share functionality: Links shareable via Share.share()
- [ ] Cold start: App launches from background and navigates correctly
- [ ] App foreground: Navigates without relaunching
- [ ] Invalid ID: Shows error gracefully

---

## Real-World Testing Scenarios

### Scenario A: Push Notification

1. Send push notification with body: "Check this product: ecommerceapp://product/42"
2. Tap notification
3. App should open ProductDetail for product 42

### Scenario B: SMS Marketing

1. Customer receives SMS: "Sale on our featured products: ecommerceapp://products"
2. Tap link
3. App should open Products list

### Scenario C: Email Campaign

1. Customer receives email with link: `https://myshoplite.com/product/99`
2. Tap link on mobile device
3. App should open (if installed) or fallback to web

### Scenario D: Social Media Share

1. Customer shares product via Share button in app
2. Sends link: `ecommerceapp://product/123`
3. Recipient taps link
4. App opens to ProductDetail

---

For more details, see:

- [DEEP_LINKING_SETUP.md](./DEEP_LINKING_SETUP.md)
- [DEEP_LINKING_SUMMARY.md](./DEEP_LINKING_SUMMARY.md)
- [src/config/deepLinkingConfig.ts](./src/config/deepLinkingConfig.ts)
- [src/utils/deepLinking.ts](./src/utils/deepLinking.ts)
