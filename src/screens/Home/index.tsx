import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import FriendList from '../../components/FriendList';

interface Data {
    id: number;
    name: string;
    likes: number;
    online: string;
}

export default function Home() {
    const [name, setName] = useState('');
    const [friends, setFriends] = useState([]);


    async function handleSearch(){
        const response = await fetch(`http://10.0.0.113:3333/friends?q=${name}`);
        const data = await response.json();

        const formattedData = data.map((item: Data) => {
            return {
                id: item.id,
                name: item.name,
                likes: item.likes,
                online: `${new Date().getHours()}:${new Date().getMinutes()}`,
            }
        });
        
        setFriends(formattedData);
    }

    const handleFollow = useCallback(() => {
        console.log('follow/unfollow');
    }, []);
    
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Amigos</Text>

            <TextInput
                style={styles.input}
                placeholder='Nome do cliente'
                onChangeText={setName}
            />

            <Button 
                title='Buscar'
                onPress={handleSearch}
            />

            {/* <ScrollView style={styles.list}> */}
                <FriendList 
                    data={friends}
                    follow={handleFollow}
                />
            {/* </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        padding: 25
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        padding: 7,
        marginVertical: 10
    },
    list: {
        marginTop: 20
    }
    
})