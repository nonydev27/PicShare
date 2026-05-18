import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
