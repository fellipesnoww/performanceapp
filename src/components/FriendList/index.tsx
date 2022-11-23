import React, {useMemo} from 'react'
import { View, Text, FlatList } from 'react-native'
import {Friend} from '../Friend';


interface Props {
    data: {
        id: number;
        name: string;
        likes: number;
        online: string;
    }[];
    follow: () => void;
}

export default function FriendList({ data, follow }:Props) {

    const totalLikes = useMemo(() => {
        return data.reduce((likes, friend) => {
            return likes + friend.likes;
        }, 0);
    }, [data]);

    return (
        <View>
            <Text>Total de likes: {totalLikes}</Text>
            {/* Não é a abordagem ideal para casos de listas muito grandes */}
            {/* {
                data.map(friend => (                    
                    <Friend 
                        key={String(friend.id)}
                        data={friend}
                        follow={follow}
                    />
                ))
            } */}
            <FlatList 
                keyExtractor={(item) => String(item.id)}
                data={data}
                renderItem={({item}) => (
                    <Friend 
                        key={String(item.id)}
                        data={item}
                        follow={follow}
                    />
                )}
            />
        </View>
    )
}
