import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

const Page = () => {
    return (
        <View style={styles.container}>
            {/* Link component for navigating to the meditation page */}
            <Link href="/(tabs)/nature-meditate">
                Ready to meditate
            </Link>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Export
export default Page;
