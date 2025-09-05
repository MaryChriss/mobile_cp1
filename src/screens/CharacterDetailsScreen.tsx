import { View, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../services/characterService";
import { Character } from "../components/CharacterRow";

const HUMAN_BG = require("../../assets/background-human.png");
const DEMON_BG = require("../../assets/background-demon.png");

type RouteParams = { CharacterDetails: { character: Character } };
type DetailsRouteProp = RouteProp<RouteParams, "CharacterDetails">;

const CharacterDetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const initialCharacter = route?.params?.character;
  const id = initialCharacter?.id;

  const { data: freshCharacter, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id as number | string),
    enabled: !!id,
    initialData: initialCharacter,
  });

  const character = freshCharacter ?? initialCharacter;
  if (!character) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>Personagem não encontrado.</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const race = String(character.race || "").toLowerCase();
  const bg = race.includes("demon") ? DEMON_BG : HUMAN_BG;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <View>
            <Image
              source={{ uri: character.img }}
              style={{
                width: "60%",
                height: 320,
                alignSelf: "center",
                marginTop: 20,
                borderRadius: 8,
              }}
            />
          </View>

          <View style={styles.content}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginVertical: 12,
                textAlign: "center",
              }}
            >
              {character.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 12,
                gap: 10,
                justifyContent: "center",
              }}
            >
              <InfoPill label="Idade:" value={character.age} />
              <InfoPill label="Raça:" value={character.race} />
              <InfoPill label="Gênero:" value={character.gender} />
            </View>

            <Text style={{ marginBottom: 12, fontSize: 17, fontWeight: "500" }}>
              {character.description}
            </Text>

            <Text style={styles.synopsisContainer}>
              <Text style={[styles.text]}>{character.quote}</Text>
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const InfoPill = ({ label, value }: { label: string; value: string }) => (
  <View
    style={{
      backgroundColor: "#f0f0f0",
      padding: 6,
      borderRadius: 4,
      flexDirection: "row",
    }}
  >
    <Text>{label} </Text>
    <Text style={{ color: "#bb0f0f", fontWeight: "bold" }}>{value}</Text>
  </View>
);

export default CharacterDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    marginTop: -20,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 13,
    marginRight: 13,
  },
  text: {
    fontSize: 17,
  },
  synopsisContainer: {
    backgroundColor: "#000000",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    fontStyle: "italic",
  },
  synopsisContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
