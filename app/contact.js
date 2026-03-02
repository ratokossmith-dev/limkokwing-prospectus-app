// app/contact.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ContactScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>

      <Text style={styles.heading}>Get in Touch</Text>

      <Text style={styles.description}>
        For any enquiries about faculties, courses, or admissions, you can reach
        us using the contact details below.
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

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => Linking.openURL("tel:+26622310000")}
        >
          <Ionicons name="call-outline" size={18} color="#fff" />
          <Text style={styles.actionBtnText}>Call Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📧 Email</Text>
        <Text style={styles.value}>info@limkokwing.ac.ls</Text>

        <TouchableOpacity
          style={styles.actionBtnSecondary}
          onPress={() =>
            Linking.openURL("mailto:info@limkokwing.ac.ls")
          }
        >
          <Ionicons name="mail-outline" size={18} color="#2563eb" />
          <Text style={styles.actionBtnSecondaryText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 20,
  },

  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 20,
    marginBottom: 10,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 10,
  },
  description: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 20,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  actionBtnText: {
    color: "#ffffff",
    fontWeight: "600",
  },

  actionBtnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  actionBtnSecondaryText: {
    color: "#2563eb",
    fontWeight: "600",
  },
});