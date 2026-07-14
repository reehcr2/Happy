import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface HeaderProps {
  title: string;
  showCancelButton?: boolean;
}
export default function Header({
  title,
  showCancelButton = true,
}: HeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <BorderlessButton onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCancelButton ? (
        <BorderlessButton onPress={() => router.replace("/")}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    padding: 24,
    backgroundColor: "#f9fafc",
    borderBottomWidth: 1,
    borderColor: "#dde3f0",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
  },
});
