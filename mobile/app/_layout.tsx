import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "./components/Header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="orphanage/[id]"
          options={{
            headerShown: true,
            header: () => <Header showCancelButton={false} title="Orfanato" />,
          }}
        />
        <Stack.Screen
          name="CreateOrphanage/SelectMapPosition"
          options={{
            headerShown: true,
            header: () => <Header title="Selecione a posição no mapa" />,
          }}
        />
        <Stack.Screen
          name="CreateOrphanage/OrphanageData"
          options={{
            headerShown: true,
            header: () => <Header title="Dados do Orfanato" />,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
