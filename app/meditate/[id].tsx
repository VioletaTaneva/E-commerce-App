import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";

import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TimerContext";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";

const Page = () => {
    const { id } = useLocalSearchParams();  // Get the ID from route parameters

    const { duration: secondsRemaining, setDuration } = useContext(TimerContext); // Timer context

    // Set and store the current meditation session, duration, and audio
    const [isMeditating, setMeditating] = useState(false);
    const [audioSound, setSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    // Handle the start and stop of the meditation
    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // If the timer reaches 0, stop meditation and audio
        if (secondsRemaining === 0) {
            if (isPlayingAudio) audioSound?.pauseAsync();
            setMeditating(false);
            setPlayingAudio(false);
            return;
        }

        // Start or continue the meditation timer
        if (isMeditating) {
            timerId = setTimeout(() => {
                setDuration(secondsRemaining - 1);  // Decrement the remaining time
            }, 1000);
        }

        // Cleanup timeout if the component unmounts or timer changes
        return () => clearTimeout(timerId);
    }, [secondsRemaining, isMeditating]);

    // Cleanup when component unmounts
    useEffect(() => {
        return () => {
            setDuration(10); // Reset duration on unmount
            audioSound?.unloadAsync(); // Unload the audio
        };
    }, [audioSound]);

    // Initialize and load the audio file
    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
        const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]); // Load the audio file
        setSound(sound);
        return sound;
    };

    // Toggle play/pause for audio
    const togglePlayPause = async () => {
        const sound = audioSound ? audioSound : await initializeSound(); // Initialize the sound if not already loaded
        const status = await sound?.getStatusAsync();

        // if loaded and not playing, play, otherwise pause
        if (status?.isLoaded && !isPlayingAudio) {
            await sound?.playAsync();
            setPlayingAudio(true);
        } else {
            await sound?.pauseAsync();
            setPlayingAudio(false);
        }
    };

    // Toggle the meditation session
    const toggleMeditationSessionStatus = async () => {
        if (secondsRemaining === 0) setDuration(10); // Reset duration if at 0
        setMeditating(!isMeditating); // Toggle meditation state
        await togglePlayPause(); // Toggle audio playback
    };

    // Navigate to duration adjustment page
    const handleAdjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus(); // Stop meditation if active
        router.push("/(modal)/adjust-meditation-duration"); // Navigate to adjust duration page
    };

    // Format the remaining time to MM:SS
    const formattedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
    const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

    return (
        <View style={styles.container}>
            {/* Background image with gradient overlay */}
            <ImageBackground
                source={MEDITATION_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
                    {/* Back button to navigate to previous screen */}
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    {/* Display remaining time */}
                    <View style={styles.timerContainer}>
                        <View style={styles.timerBackground}>
                            <Text style={styles.timerText}>
                                {formattedTimeMinutes}.{formattedTimeSeconds}
                            </Text>
                        </View>
                    </View>

                    {/* Buttons to adjust duration and start/stop meditation */}
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Adjust duration"
                            onPress={handleAdjustDuration}
                        />
                        <CustomButton
                            title={isMeditating ? "Stop" : "Start Meditation"}
                            onPress={toggleMeditationSessionStatus}
                            containerStyles='mt-4'
                        />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 6,
        zIndex: 10,
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerBackground: {
        backgroundColor: '#F0F0F0',
        borderRadius: 100,
        width: 176,
        height: 176,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        color: '#003366',
        fontSize: 40,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buttonMargin: {
        marginTop: 16,
    },
});

// Export
export default Page;
