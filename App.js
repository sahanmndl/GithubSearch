import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import RepositoryItem from "./src/components/RepositoryItem";

export default function App() {

    return (
        <View style={styles.container}>
            <RepositoryItem/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
});
