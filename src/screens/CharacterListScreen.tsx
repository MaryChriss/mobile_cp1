import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert, Pressable } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCharacter, getCharacters} from "../services/characterService";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CharacterRow, { Character } from "../components/CharacterRow";

const CharacterListScreen = () => {
    const navigation = useNavigation();
    const queryClient = useQueryClient()

    const { data: character, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ['character'],
        queryFn: getCharacters,
        select: (data) => data.sort((a: Character, b: Character) => a.name.localeCompare(b.name)), 
    });

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries( { queryKey: ["character"] })
        }, [queryClient])
    );

    const renderHiddenItem = (data: any) => (
        <View style={ styles.rowBack }>
            <TouchableOpacity
                style={ styles.backRightBtn }
                onPress={() => {
                    Alert.alert(
                        'Confirmar Exclusão',
                        "Tem certeza que deseja excluir este item?",
                        [
                            { text: "Cancelar", style: 'cancel' },
                            { text: "Excluir", style: 'destructive', onPress: () => deleteRow(data.item.id) },
                        ],
                        { cancelable: true }
                    );
                }}
            >
                <Text style={ styles.backTextWhite }>Excluir</Text>
            </TouchableOpacity>
        </View>
    )

    const deleteRow = async (characterID: number) => {
        try {
            await deleteCharacter(characterID)
            queryClient.invalidateQueries({ queryKey: ["character"] });

        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o personagem")
        }
    };

    if (isLoading) {
        return(
            <View style={styles.center}>
                <ActivityIndicator size='large' color="#eb4435" />
            </View>
        )
    }

    if (isError) {
        return(
           <View style={styles.center}>
                <Text>Erro ao carregar Personagens!</Text>
            </View>
        )
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <SwipeListView
                    style={ styles.list }
                    data={character}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.navigate('CharacterDetailsScreen', { character: item })}
                        >
                            <CharacterRow character={item} />
                        </Pressable>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}

                    // Pull to refresh
                    refreshControl={
                        <RefreshControl
                            refreshing={false}  
                            onRefresh={refetch} 
                            colors={["#cecece"]}
                            tintColor="#cecece"
                        />
                    }

                    // Swipe to Delete
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                    disableRightSwipe={true}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default CharacterListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee'
    },
    list: {
        marginVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    },
   center: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },
    // Swipe to Delete
    rowBack: {
        alignItems: 'flex-end',
        backgroundColor: '#FF4136',
        justifyContent: 'flex-end',
        borderRadius: 8,
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75, // Mesma largura do rightOpenValue
        height: '100%',
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight: 'bold',
    },
})
