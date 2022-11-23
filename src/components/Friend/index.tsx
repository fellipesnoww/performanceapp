import React, { memo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface Props {
    data: {
        id: number;
        name: string;
        likes: number;
        online: string;
    },
    follow: () => void;
}

function FriendComponent({ data, follow }:Props) {
    return (
        <View style={{marginBottom: 10}}>
            <Text> {data.name} - Likes: {data.likes}</Text>
            <TouchableOpacity onPress={follow}>
                <Text>Deixar de seguir</Text>
            </TouchableOpacity>
            <Text>
                Oline em {data.online}
            </Text>
        </View>
    )
}


//Exporta o componente entre a função de memo, fazendo com que o mesmo
//só seja recalculado caso haja alterações
export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.data, nextProps.data); //So vai recalcular esse componente caso os dados passados como props seja diferente
});