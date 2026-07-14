import { Feather, FontAwesome } from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import api from "@/src/services/api";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import mapMarker from "../../src/images/map-marker.png";

interface OrphanageDetailsRouteParams {
  id: number;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: number;
    orphanage_id: number;
    url: string;
  }[];
}

export default function OrphanageDetails() {
  const route = useRoute();
  const params = route.params as OrphanageDetailsRouteParams;
  const [orphanage, setOrphanage] = useState<Orphanage | null>(null);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  function handleOpenGoogleMapsRoutes(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map((image) => {
            return (
              <Image
                key={image.id}
                style={styles.image}
                source={{ uri: image.url }}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage?.name}</Text>
        <Text style={styles.description}>{orphanage?.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: orphanage?.latitude ?? -23.7555744,
              longitude: orphanage?.longitude ?? -46.5755108,
              latitudeDelta: 0.0008,
              longitudeDelta: 0.0008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              coordinate={{
                latitude: orphanage?.latitude ?? -23.7555744,
                longitude: orphanage?.longitude ?? -46.5755108,
              }}
            >
              <Image
                source={mapMarker}
                style={{ width: 48, height: 54 }}
                resizeMode="contain"
              />
            </Marker>
          </MapView>

          <Pressable
            style={styles.routesContainer}
            onPress={() => {
              handleOpenGoogleMapsRoutes(
                orphanage?.latitude,
                orphanage?.longitude,
              );
            }}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </Pressable>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage?.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              {orphanage?.opening_hours}
            </Text>
          </View>
          {orphanage?.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                Atendemos fim de semana
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                Não atendemos fim de semana
              </Text>
            </View>
          )}
        </View>

        <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get("window").width,
    height: 240,
    resizeMode: "cover",
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: "#4D6F80",
    fontSize: 30,
    fontFamily: "Nunito_700Bold",
  },

  description: {
    fontFamily: "Nunito_600SemiBold",
    color: "#5c8599",
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "#B3DAE2",
    marginTop: 40,
    backgroundColor: "#E6F7FB",
  },

  mapStyle: {
    width: "100%",
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  routesText: {
    fontFamily: "Nunito_700Bold",
    color: "#0089a5",
  },

  separator: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#D3E2E6",
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  scheduleItem: {
    width: "48%",
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: "#E6F7FB",
    borderWidth: 1,
    borderColor: "#B3DAE2",
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: "#EDFFF6",
    borderWidth: 1,
    borderColor: "#A1E9C5",
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: "#FFEBF0",
    borderWidth: 1,
    borderColor: "#FF669D",
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: "#5C8599",
  },

  scheduleTextGreen: {
    color: "#37C77F",
  },

  scheduleTextRed: {
    color: "#FF669D",
  },

  contactButton: {
    backgroundColor: "#3CDC8C",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFF",
    fontSize: 16,
    marginLeft: 16,
  },
});
