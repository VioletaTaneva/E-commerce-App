import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";
import { useRouter } from "expo-router";
import Animated, {
    FadeInDown,
} from "react-native-reanimated";

import beachImage from "@/assets/meditation-images/beach.webp";

const App = () => {
    // Router for the navigation
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <AppGradient
                    colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]} // Gradient for overlay
                >
                    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'space-between' }}>

                        {/* Animated view for the title and subtitle */}
                        <Animated.View
                            entering={FadeInDown.delay(300)
                                .mass(0.5)
                                .stiffness(80)
                                .springify(20)}
                        >
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 32 }}>
                                Simple Meditation
                            </Text>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, marginTop: 10 }}>
                                Simplifying Meditation for Everyone
                            </Text>
                        </Animated.View>

                        {/* Animated view for the button */}
                        <Animated.View
                            entering={FadeInDown.delay(300)
                                .mass(0.5)
                                .stiffness(80)
                                .springify(20)}
                        >
                            <CustomButton
                                onPress={() => router.push("/nature-meditate")} // Navigate to the meditation page
                                title="Get Started"
                            />
                        </Animated.View>

                        {/* StatusBar configuration */}
                        <StatusBar style="light" />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

// Export
export default App;
