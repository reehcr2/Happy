import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

import mapMarkerImg from "../../src/images/map-marker.png";

export default function SelectMapPosition() {
  const router = useRouter();

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  function handleSelectMapPosition(event: MapPressEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    router.push({
      pathname: "/CreateOrphanage/OrphanageData",
      params: {
        latitude: String(position.latitude),
        longitude: String(position.longitude),
      },
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        onPress={handleSelectMapPosition}
        initialRegion={{
          latitude: -23.7555744,
          longitude: -46.5755108,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
      >
        {position.latitude !== 0 && (
          <Marker coordinate={position}>
            <Image
              source={mapMarkerImg}
              style={{ width: 48, height: 54 }}
              resizeMode="contain"
            />
          </Marker>
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },
  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});
