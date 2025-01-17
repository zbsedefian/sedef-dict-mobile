import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerShown: false, // Hides the header for all screens
      }}
    />
  );
}
