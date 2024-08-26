import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TimerContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

// Define the durations available for meditation
const Durations = [
    { title: "10 seconds", duration: 10 },
    { title: "5 minutes", duration: 5 * 60 },
    { title: "10 minutes", duration: 10 * 60 },
    { title: "15 minutes", duration: 15 * 60 },
];

const AdjustMeditationDuration = () => {
    // Extract the setDuration function from the TimerContext
    const { setDuration } = useContext(TimerContext);

    // When pressed, set the duration and navigate back
     const handlePress = (duration: number) => {
        setDuration(duration);
        router.back();
    };

    // Render the component
    return (
        <View style={styles.container}>
            {/* AppGradient provides a gradient background */}
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                {/* Pressable component to navigate back */}
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="leftcircleo" size={50} color="white" />
                </Pressable>

                {/* Main content container */}
                <View style={styles.content}>
                    <Text style={styles.title}>Adjust your meditation duration</Text>

                    {/* Render a button for each duration option */}
                    {Durations.map((duration) => (
                        <CustomButton
                            key={duration.title}
                            title={duration.title}
                            onPress={() => handlePress(duration.duration)} // Handle press
                            containerStyles='mb-5'
                        />
                    ))}
                </View>
            </AppGradient>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 8,
        left: 6,
        zIndex: 10,
    },
    content: {
        justifyContent: 'center',
        height: '80%',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        marginBottom: 16,
    }
});

// Export
export default AdjustMeditationDuration;
