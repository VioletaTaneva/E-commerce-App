import TimerProvider from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding until assets are fully loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // Load custom fonts
    const [fontsLoaded, error] = useFonts({
        "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
    });

    // Hide the splash screen once fonts are loaded
    useEffect(() => {
        if (error) {
            // Throw error if fonts fail to load
            throw error;
        }
        if (fontsLoaded) {
            // Hide splash screen if fonts are successfully loaded
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]); // Dependencies: re-run effect if fontsLoaded or error changes

    // Render nothing while fonts are loading
    if (!fontsLoaded) {
        return null;
    }

    // Additional check to ensure that if fonts failed to load, nothing is rendered
    if (!fontsLoaded && !error) {
        return null;
    }

    // Render the application once fonts are loaded
    return (
        <SafeAreaProvider>
            <TimerProvider>
                <Stack>
                    {/* Main tabs screen */}
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    {/* Meditation screen with dynamic ID */}
                    <Stack.Screen
                        name="meditate/[id]"
                        options={{ headerShown: false }}
                    />
                    {/* Index screen */}
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    {/* Modal screen for adjusting meditation duration */}
                    <Stack.Screen
                        name="(modal)/adjust-meditation-duration"
                        options={{ headerShown: false, presentation: "modal" }}
                    />
                </Stack>
            </TimerProvider>
        </SafeAreaProvider>
    );
}
