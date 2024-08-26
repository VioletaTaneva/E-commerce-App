import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

// Import constants and components
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import AppGradient from "@/components/AppGradient";

// Main component for the meditation practice page
const Page = () => {
    return (
        <View style={styles.container}>
            {/* Background gradient component */}
            <AppGradient
                // Define the background gradient colors
                colors={["#161b2e", "#0a4d4a", "#766e67"]}
            >
                {/* Header section with welcome message */}
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome Steven</Text>
                    <Text style={styles.subtitleText}>
                        Start your meditation practice today
                    </Text>
                </View>
                {/* FlatList to display meditation items */}
                <View style={styles.listContainer}>
                    <FlatList
                        data={MEDITATION_DATA}
                        contentContainerStyle={styles.list}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    router.push(`/meditate/${item.id}`)  // Navigate to meditation details
                                }
                                style={styles.pressableItem}
                            >
                                <ImageBackground
                                    source={MEDITATION_IMAGES[item.id - 1]}
                                    resizeMode="cover"
                                    style={styles.backgroundImage}
                                >
                                    <LinearGradient
                                        // Gradient overlay from transparent to black
                                        colors={[
                                            "transparent",
                                            "rgba(0,0,0,0.8)",
                                        ]}
                                        style={styles.gradient}
                                    >
                                        <Text style={styles.itemTitle}>
                                            {item.title}
                                        </Text>
                                    </LinearGradient>
                                </ImageBackground>
                            </Pressable>
                        )}
                    />
                </View>
            </AppGradient>
            {/* Status bar style */}
            <StatusBar style="light" />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginBottom: 24,
    },
    welcomeText: {
        color: '#E5E5E5',
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitleText: {
        color: '#D0D0D0',
        fontSize: 18,
        fontWeight: 'medium',
    },
    listContainer: {
        flex: 1,
    },
    list: {
        paddingBottom: 150,
    },
    pressableItem: {
        height: 192,
        marginVertical: 12,
        borderRadius: 10,
        overflow: 'hidden',
    },
    backgroundImage: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
    },
    gradient: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    itemTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

// Export
export default Page;
