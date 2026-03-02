// app/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      initialRouteName="index" // Home is the root
      screenOptions={{
        headerShown: false, // no header on all pages
      }}
    />
  );
}