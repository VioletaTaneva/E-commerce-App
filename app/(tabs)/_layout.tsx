import React from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";

// Define unstable_settings to specify the initial route for the tabs
export const unstable_settings = {
    initialRouteName: "(tabs)",
};

// Main component for defining tab navigation
const Page = () => {
    return (
        // Navigation
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
            }}
        >
            {/* Screen for the meditation tab */}
            <Tabs.Screen
                name="nature-meditate"
                options={{
                    tabBarLabel: "Meditate",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="flower-tulip"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            {/* Screen for the affirmations tab */}
            <Tabs.Screen
                name="affirmations"
                options={{
                    tabBarLabel: "Affirmations",
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="open-book"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

// Export
export default Page;
