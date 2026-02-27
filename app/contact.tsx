// app/contact.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";

export default function ContactScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Contact Us" }} />

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Get in Touch</Text>

        <Text style={styles.text}>
          If you have any questions about faculties, courses, or admissions,
          feel free to contact us using the details below.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>📍 Address</Text>
          <Text style={styles.value}>
            Limkokwing University of Creative Technology{"\n"}
            Maseru, Lesotho
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>📞 Phone</Text>
          <Text style={styles.value}>+266 2231 0000</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>📧 Email</Text>
          <Text style={styles.value}>info@limkokwing.ac.ls</Text>
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
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: "#444",
  },
});