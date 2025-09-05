import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CharacterDetailsScreen from "./src/screens/CharacterDetailsScreen";
import CharacterListScreen from "./src/screens/CharacterListScreen";
import { Character } from "./src/components/CharacterRow";

type RootStackParamList = {
  CharacterList: undefined;
  CharacterDetails: { character: Character };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "white",
            primary: "#EB4435",
          },
        }}
      >
        <Stack.Navigator initialRouteName="CharacterList">
          <Stack.Screen
            name="CharacterList"
            component={CharacterListScreen}
            options={{ title: "Demon Slayer" }}
          />
          <Stack.Screen
            name="CharacterDetails"
            component={CharacterDetailsScreen}
            options={({ navigation, route }) => ({
              title: "Detalhes",
              headerBackButtonDisplayMode: "minimal",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
