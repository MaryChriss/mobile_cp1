import { StyleSheet, Text, View, Image } from "react-native";

export type Character = {
  id: number;
  name: string;
  age: string;
  gender: string;
  race: string;
  description: string;
  img: string;
  quote: string;
};

export default function CharacterRow({ character }: { character: Character }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: character.img }} style={styles.image} />
      <Text style={styles.title}>{character.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebebeb",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 18,
    borderRadius: 5,
    marginBottom: 13,
  },
  image: {
    width: 50,
    height: 80,
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 26,
  },
  title: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
    width: "50%",
    alignItems: "center",
    textAlign: "center",
  },
  rating: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },
});
