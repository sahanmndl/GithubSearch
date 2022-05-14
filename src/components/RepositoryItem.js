import {TouchableOpacity, Image, Text, View, Linking, Platform, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const RepositoryItem = ({item}) => {

    const {full_name, owner, html_url, description, language, stargazers_count, forks_count, open_issues} = item

    return (
        <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(html_url.toString())}>
            <View style={styles.topBar}>
                <Image
                    style={styles.profileImage}
                    source={{uri: owner.avatar_url}}
                    defaultSource={require('../../assets/default_avatar.png')}
                />
                <Text style={styles.title} numberOfLines={1}>
                    {full_name}
                </Text>
            </View>
            <Text style={styles.description} numberOfLines={5}>
                {description}
            </Text>
            <View style={styles.languageBar}>
                <Text style={styles.language} numberOfLines={1}>
                    {language}
                </Text>
            </View>
            <View style={styles.bottomBars}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/star.png')}
                />
                <Text style={styles.counts} numberOfLines={1}>
                    {stargazers_count}
                </Text>
            </View>
            <View style={styles.bottomBars}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/fork.png')}
                />
                <Text style={styles.counts} numberOfLines={1}>
                    {forks_count}
                </Text>
            </View>
            <View style={styles.bottomBars}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/issues.png')}
                />
                <Text style={styles.counts} numberOfLines={1}>
                    {open_issues}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default RepositoryItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingStart: 8,
        paddingEnd: 8,
        borderRadius: 8,
        marginVertical: 8,
        width: Platform.OS === 'web' ? "50%" : "100%",
        backgroundColor: "#FFF",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
    },
    topBar: {
        flexDirection: "row",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        marginStart: 8,
        color: Colors.LINK_BLUE
    },
    profileImage: {
        width: 25,
        height: 25,
        resizeMode: "center"
    },
    description: {
        fontSize: 15,
        marginVertical: 8
    },
    languageBar: {
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    language: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.RED,
    },
    bottomBars: {
        flexDirection: "row",
        marginTop: 8
    },
    logo: {
        width: 18,
        height: 18,
        resizeMode: "cover"
    },
    counts: {
        fontSize: 14,
        fontWeight: "normal",
        color: Colors.DARK,
        marginStart: 8,
    }
})