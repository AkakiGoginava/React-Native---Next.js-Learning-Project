# Pickup Android mobile app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

To run a development build on an Android device using Expo Application Services (EAS):

1. Log into EAS

   ```bash
   eas login
   ```

2. Create a build (Only needed when native code changes)

   ```bash
   // From apps/mobile directory
   eas build --platform android --profile development
   ```

3. Download and install the development build on your Android device

4. Start the app

   ```bash
   // From apps/mobile directory
   pnpm dev
   // Or from root directory
   pnpm turbo dev
   ```
