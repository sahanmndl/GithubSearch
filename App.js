import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, ActivityIndicator, FlatList} from 'react-native';
import RepositoryItem from "./src/components/RepositoryItem";
import {useEffect, useState} from "react";
import Colors from "./src/constants/Colors";
import {Appbar, Searchbar} from "react-native-paper";

export default function App() {

    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [page, setPage] = useState(1)
    const [paginationLoader, setPaginationLoader] = useState(false)
    const [searchQuery, setSearchQuery] = useState("react-native")
    const [error, setError] = useState(null)

    const getRepositories = async () => {
        setPaginationLoader(true)
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc&page=${page}&per_page=10`)
            const json = await response.json()
            setOriginalData([...originalData, ...json?.items])
            setFilteredData([...originalData, ...json?.items])
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
            setPaginationLoader(false)
        }
    }

    useEffect(() => {
        getRepositories()
    }, [page])

    const renderPaginationLoader = () => {
        return (
            paginationLoader ?
                <View style={styles.footer}>
                    <ActivityIndicator size="large" color={Colors.RED}/>
                </View> : null
        )
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = originalData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1;
            })
            setFilteredData(newData)
            setSearchQuery(text)
        } else {
            setFilteredData(originalData)
            setSearchQuery(text)
        }
    }

    const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase()
        const queryData = originalData.filter((item) => {
            return contains(item, formattedQuery)
        })
        setFilteredData(queryData)
        setSearchQuery(text)
    }

    const contains = ({name, description}, query) => {
        return !!(name.includes(query) || description.includes(query));
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    Error fetching data... Check your network connection or API rate limit just exceeded!
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar
                style="light"
            />
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Github Search" color="#FFF"/>
            </Appbar.Header>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search for repositories..."
                value={searchQuery}
                onChangeText={(text) => handleSearch(text)}
            />
            <View style={styles.innerContainer}>
                {loading ? <ActivityIndicator size="large" color={Colors.RED}/> : (
                    <FlatList
                        style={styles.flatList}
                        data={filteredData}
                        keyExtractor={({id}) => id}
                        onEndReached={() => setPage(page + 1)}
                        ListFooterComponent={renderPaginationLoader()}
                        renderItem={({item}) => (
                            <RepositoryItem
                                item={item}
                            />
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    searchBar: {
        marginBottom: 8
    },
    header: {
        backgroundColor: Colors.DARK
    },
    flatList: {
        flex: 1,
    },
    footer: {
        alignItems: "center"
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.RED
    }
});
