// app/help.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";

export default function HelpScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Help" }} />

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>How Can We Help You?</Text>

        <View style={styles.card}>
          <Text style={styles.title}>🏫 Browse Faculties</Text>
          <Text style={styles.text}>
            Go to the Faculties section to explore available faculties and
            courses offered by the university.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>🎓 View Courses</Text>
          <Text style={styles.text}>
            Select a faculty to see its courses, images, videos, and ratings.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>🧭 Career Quiz</Text>
          <Text style={styles.text}>
            Take the career quiz to discover which course best suits your
            interests.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>📞 Need More Help?</Text>
          <Text style={styles.text}>
            Visit the Contact Us page to reach the university directly.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
});