import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { RectButton } from "react-native-gesture-handler";
import mapMarker from "../src/images/map-marker.png";
import api from "../src/services/api";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  useFocusEffect(
    useCallback(() => {
      api.get("orphanages").then((response) => {
        setOrphanages(response.data);
      });
    }, []),
  );

  const router = useRouter();
  const [mapReady, setMapReady] = useState(false);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
        initialRegion={{
          latitude: -23.7555744,
          longitude: -46.5755108,
          latitudeDelta: 0.0008,
          longitudeDelta: 0.0008,
        }}
      >
        {mapReady &&
          orphanages.map((orphanage) => {
            return (
              <Marker
                key={orphanage.id}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
                onPress={() => router.push(`/orphanage/${orphanage.id}`)}
              >
                <Image
                  source={mapMarker}
                  style={{ width: 48, height: 54 }}
                  resizeMode="contain"
                />
              </Marker>
            );
          })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} Orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={() => router.push("/CreateOrphanage/SelectMapPosition")}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 24,

    backgroundColor: "#fff",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 5,
  },
  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
