import { View, StyleSheet, Text, Image, ScrollView, Alert } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"    

import { useRoute } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"

import { useState } from "react"

const CharacterDetailsScreen = () => {

    const route = useRoute()
    const { character } = route.params as { character: Character }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* Image */}
                <View>
                    <Image 
                        source={{ uri: character.poster }} 
                        style={{ width: '100%', height: 320 }}
                    />
                    <LinearGradient
                        colors={['transparent', 'white']}
                        style={ styles.gradient }
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 0, y: 1 }}
                    />

                </View>

                <View style={ styles.content }>
                    {/* Título */}
                    <Text style={{ fontSize: 32, fontWeight: 'bold', marginVertical: 12 }}>
                        { character.title }
                    </Text>

                    {/* Nota */}
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <AntDesign name="star" size={20} color='#f7cb46' />
                        <Text 
                            style={[styles.text, { marginBottom: 12 }]}
                        >
                            { character.rating }/10
                        </Text>
                    </View>

                    {/* Categorias */}
                    <Text style={[styles.text, { marginBottom: 12 }]}>
                        { character.categories }
                    </Text>


                    {/* Sinopse */}
                    <ScrollView 
                        style={ styles.synopsisContainer }
                        contentContainerStyle={ styles.synopsisContent }
                    >
                        <Text style={[styles.text, {
                                marginBottom: 12, 
                                fontSize: 18, 
                                fontWeight: '600'}]}
                        >
                            Sinopse
                        </Text>
                        <Text style={[styles.text, { marginBottom: 24 }]}>
                            {character.synopsis}
                        </Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default CharacterDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        flex: 1
    },
    text: {
        fontSize: 17
    },
    synopsisContainer: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        padding: 14,
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 12
    },
    synopsisContent: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})
