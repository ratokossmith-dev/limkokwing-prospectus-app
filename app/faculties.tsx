// app/faculties.tsx
import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import FacultyCard from "./components/FacultyCard";
import { facultyImages } from "./data/facultyMedia"; // <- import faculty images

type Faculty = { id: string; name: string };

const faculties: Faculty[] = [
  { id: "ict", name: "Faculty of ICT" },
  { id: "business", name: "Faculty of Business" },
  { id: "multimedia", name: "Faculty of Creative Multimedia" },
  { id: "architecture", name: "Faculty of Architecture" },
  { id: "media", name: "Faculty of Media & Communication" },
];

export default function FacultyListScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Faculties</Text>

      {faculties.map((faculty) => (
        <FacultyCard
          key={faculty.id}
          name={faculty.name}
          image={facultyImages[faculty.id]} 
          onPress={() =>
            router.push({
              pathname: "/courses/[faculty]",
              params: { faculty: faculty.id },
            })
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },
  header: { fontSize: 24, fontWeight: "bold", padding: 20 },
});