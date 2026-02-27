// app/components/FacultyCard.tsx
import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

type Props = {
  name: string;
  onPress: () => void;
  image?: any; // optional image prop
};

export default function FacultyCard({ name, onPress, image }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    elevation: 2, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "cover", // ensures image fits nicely
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});