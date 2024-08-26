import { AntDesign } from "@expo/vector-icons";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
} from "react-native";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallary";
import AppGradient from "@/components/AppGradient";

const AffirmationPractice = () => {
    // Get itemId from URL parameters
    const { itemId } = useLocalSearchParams();

    // Set and store the current affirmation and sentences
    const [affirmation, setAffirmation] = useState<GalleryPreviewData | undefined>(undefined);
    const [sentences, setSentences] = useState<string[]>([]);

    useEffect(() => {
        // Function to find the affirmation by itemId
        const findAffirmation = () => {
            // Flatten the categories and find the affirmation with the matching itemId
            const affirmationToStart = AFFIRMATION_GALLERY
                .flatMap(category => category.data)
                .find(a => a.id === Number(itemId));

            // If the affirmation is found, set it in state
            if (affirmationToStart) {
                setAffirmation(affirmationToStart);

                // Split the affirmation text into sentences, remove empty strings
                const affirmationsArray = affirmationToStart.text
                    .split(".")
                    .filter(sentence => sentence.trim() !== "");

                // Update state with the array of sentences
                setSentences(affirmationsArray);
            }
        };

        // Call the function to find and set the affirmation
        // [itemId] array ensures the function is only called when itemId changes
        findAffirmation();
    }, [itemId]);

    return (
        <View style={styles.container}>
            {/* Background image for the affirmation practice */}
            <ImageBackground
                source={affirmation?.image}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                {/* Gradient overlay for better text readability */}
                <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
                    {/* Back button to navigate to the previous screen */}
                    <Pressable
                        onPress={() => router.back()}  // onPress
                        style={styles.backButton}
                    >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    {/* ScrollView to allow scrolling through long content */}
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Container for the sentences */}
                        <View style={styles.contentContainer}>
                            {/* Render each sentence as a Text component */}
                            {sentences.map((sentence, idx) => (
                                <Text
                                    key={idx}
                                    style={styles.sentenceText}
                                >
                                    {sentence.trim()}.
                                </Text>
                            ))}
                        </View>
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 6,
        zIndex: 10,
    },
    scrollViewContent: {
        paddingTop: 20,
        flexGrow: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 20,  // Add padding to ensure bottom text is visible
    },
    sentenceText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

// Export
export default AffirmationPractice;