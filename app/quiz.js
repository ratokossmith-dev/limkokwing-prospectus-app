import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Answer = {
  text: string;
  category: "IT" | "Business" | "Design" | "Engineering";
};

type Question = {
  question: string;
  answers: Answer[];
};

const QUESTIONS: Question[] = [
  {
    question: "What do you enjoy doing the most?",
    answers: [
      { text: "Solving problems using computers", category: "IT" },
      { text: "Planning and managing businesses", category: "Business" },
      { text: "Designing visuals or creative content", category: "Design" },
      { text: "Building or fixing physical systems", category: "Engineering" },
    ],
  },
  {
    question: "Which subject do you prefer?",
    answers: [
      { text: "Computer Studies / ICT", category: "IT" },
      { text: "Accounting / Economics", category: "Business" },
      { text: "Art / Media Studies", category: "Design" },
      { text: "Mathematics / Physics", category: "Engineering" },
    ],
  },
  {
    question: "What kind of career do you want?",
    answers: [
      { text: "Software developer or IT specialist", category: "IT" },
      { text: "Entrepreneur or manager", category: "Business" },
      { text: "Designer or creative professional", category: "Design" },
      { text: "Engineer or technician", category: "Engineering" },
    ],
  },
  {
    question: "How do you prefer working?",
    answers: [
      { text: "With computers and systems", category: "IT" },
      { text: "With people and organizations", category: "Business" },
      { text: "With creativity and ideas", category: "Design" },
      { text: "With tools and machines", category: "Engineering" },
    ],
  },
];

export default function CareerQuiz() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    IT: 0,
    Business: 0,
    Design: 0,
    Engineering: 0,
  });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (category: Answer["category"]) => {
    setScores((prev) => ({
      ...prev,
      [category]: prev[category] + 1,
    }));

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    const highest = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

    switch (highest) {
      case "IT":
        return "Faculty of Information & Communication Technology";
      case "Business":
        return "Faculty of Business & Globalization";
      case "Design":
        return "Faculty of Design & Innovation";
      case "Engineering":
        return "Faculty of Engineering & Technology";
      default:
        return "Faculty not found";
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Quiz</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.container}>
        {!finished ? (
          <>
            {/* PROGRESS */}
            <Text style={styles.progress}>
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </Text>

            <Text style={styles.question}>
              {QUESTIONS[currentQuestion].question}
            </Text>

            {QUESTIONS[currentQuestion].answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.answerBtn}
                onPress={() => handleAnswer(answer.category)}
              >
                <Text style={styles.answerText}>{answer.text}</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <Text style={styles.resultTitle}>Your Recommended Faculty</Text>
            <Text style={styles.result}>{getResult()}</Text>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/faculties")}
            >
              <Text style={styles.primaryBtnText}>Explore Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push("/")}
            >
              <Text style={styles.secondaryBtnText}>Back to Home</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  progress: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },

  question: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
    color: "#111827",
  },

  answerBtn: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
  },
  answerText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "700",
    marginBottom: 30,
  },

  primaryBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "700",
  },
});