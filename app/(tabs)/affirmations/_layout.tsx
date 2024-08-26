import React from "react";
import { Stack } from "expo-router";

// Component for managing the layout of affirmation screens
const AffirmationsLayout = () => {
    return (
        // Managing the navigation
        <Stack>
            {/* Screen for the main index view of the affirmation section */}
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />

            {/* Screen for the detailed affirmation view */}
            <Stack.Screen
                name="[itemId]" // Identify the screen with the itemId
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

// Export
export default AffirmationsLayout;
