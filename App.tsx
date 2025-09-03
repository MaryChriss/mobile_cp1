import { Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 

import CharacterDetailsScreen from './src/screens/CharacterDetailsScreen';
import CharacterFormScreen from './src/screens/CharacterListScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <NavigationContainer
        theme={{
          ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'white', primary: '#EB4435' }
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="CharacterDetailsScreen"
            component={CharacterDetailsScreen}
            options={({ navigation, route }) => ({
              headerBackButtonDisplayMode: 'minimal',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CharacterFormScreen', {
                    character: route.params?.character,
                  })}>
                  <Text style={{ color: '#eb4435', fontSize: 18 }}>
                    Editar
                  </Text>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name="CharacterFormScreen"
            component={CharacterFormScreen}
            options={({ navigation }) => ({
              headerBackButtonDisplayMode: 'minimal',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.popToTop()}>
                  <Text style={{ color: '#eb4435', fontSize: 18 }}>
                    Voltar ao início
                  </Text>
                </TouchableOpacity>
              )
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
