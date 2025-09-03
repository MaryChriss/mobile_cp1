import { StyleSheet, Text, View, Image } from 'react-native'

export type Character = {
    id: number;
    name: string;
    age: string;
    gender: string;
    race: string;
    description: string;
    img: string;
    quote: string;
}

export default function CharacterRow({character}: {character: Character}) {
    return(
        <View style={ styles.container }>
            <Image
                source={ {uri: character.img } }
                style={ styles.image }
            />
            <Text style={ styles.title }>{character.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: 50,
        height: 80,
        borderRadius: 8,
        marginLeft: 12
    },
    title: {
        marginHorizontal: 10,
        fontSize: 16,
        width: '50%'
    },
    rating: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        color: "#666",
        marginRight: 12
    }
})