import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCharacters } from "../services/characterService";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CharacterRow, { Character } from "../components/CharacterRow";

type Nav = ReturnType<typeof useNavigation>;

const CharacterListScreen = () => {
  const navigation = useNavigation<Nav>();
  const queryClient = useQueryClient();

  const {
    data: characters,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["characters"], // plural, cache da coleção
    queryFn: getCharacters,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ["character"] });
    }, [queryClient])
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#eb4435" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar Personagens!</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: 160,
            height: 150,
            alignSelf: "center",
            marginBottom: 10,
            marginTop: 20,
          }}
        />
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          Escolha seu personagem abaixo
        </Text>
        <SwipeListView
          style={styles.list}
          data={characters}
          keyExtractor={(item: Character) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate(
                  "CharacterDetails" as never,
                  { character: item } as never
                )
              }
            >
              <CharacterRow character={item} />
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={refetch}
              colors={["#cecece"]}
              tintColor="#cecece"
            />
          }
          rightOpenValue={-75}
          disableRightSwipe
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CharacterListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
  list: {
    marginVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: "100%",
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
