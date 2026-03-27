// app/contact.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─────────────────────────────────────────────────────────────
// CONTACT DETAILS DATA
// An array of objects — each is one contact info card.
// Each has a label, value, icon, colour, and action info.
// ─────────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  {
    id: "address",
    icon: "location-outline",
    label: "Campus Address",
    value: "Limkokwing University of Creative Technology\nMaseru, Lesotho",
    color: "#2563eb",
    actionLabel: null, // no button for address
    actionUrl: null,
  },
  {
    id: "phone",
    icon: "call-outline",
    label: "Phone Number",
    value: "+266 2231 0000",
    color: "#059669",
    actionLabel: "Call Now",
    actionUrl: "tel:+26622310000",
    actionIcon: "call",
  },
  {
    id: "email",
    icon: "mail-outline",
    label: "Email Address",
    value: "info@limkokwing.ac.ls",
    color: "#d97706",
    actionLabel: "Send Email",
    actionUrl: "mailto:info@limkokwing.ac.ls",
    actionIcon: "mail",
  },
  {
    id: "website",
    icon: "globe-outline",
    label: "Website",
    value: "www.limkokwing.ac.ls",
    color: "#7c3aed",
    actionLabel: "Visit Website",
    actionUrl: "https://www.limkokwing.ac.ls",
    actionIcon: "open-outline",
  },
  {
    id: "hours",
    icon: "time-outline",
    label: "Office Hours",
    value: "Monday – Friday\n08:00 AM – 05:00 PM",
    color: "#db2777",
    actionLabel: null,
    actionUrl: null,
  },
];

// ─────────────────────────────────────────────────────────────
// SOCIAL LINKS DATA
// An array of objects for the social media row.
// ─────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    icon: "logo-facebook",
    label: "Facebook",
    color: "#1877f2",
    url: "https://facebook.com",
  },
  {
    icon: "logo-instagram",
    label: "Instagram",
    color: "#e1306c",
    url: "https://instagram.com",
  },
  {
    icon: "logo-twitter",
    label: "Twitter",
    color: "#1da1f2",
    url: "https://twitter.com",
  },
  {
    icon: "logo-linkedin",
    label: "LinkedIn",
    color: "#0077b5",
    url: "https://linkedin.com",
  },
];

// ─────────────────────────────────────────────────────────────
// STYLES — defined before all components that use them
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  /* ── HEADER ── */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
  },

  /* ── SCROLL ── */
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  /* ── HERO BANNER ── */
  heroBanner: {
    backgroundColor: "#2563eb",
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: 28,
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
    lineHeight: 18,
  },
  heroIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* ── SECTION LABEL ── */
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },

  /* ── CONTACT CARD ── */
  contactCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  contactCardInner: {
    flexDirection: "row", // icon box LEFT, info RIGHT
    alignItems: "flex-start",
    padding: 16,
    gap: 14,
  },
  contactIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  contactInfo: {
    flex: 1, // fills remaining width after icon
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: "#9ca3af",
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 21,
    marginBottom: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start", // only as wide as content
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ffffff",
  },
  accentBar: {
    height: 3, // thin coloured stripe at bottom of card
  },

  /* ── SOCIAL ROW ── */
  socialSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  socialRow: {
    flexDirection: "row", // four social buttons side by side
    gap: 10,
  },
  socialBtn: {
    flex: 1, // equal width for all four buttons
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  socialLabel: {
    fontSize: 11,
    fontWeight: "600",
  },

  /* ── MESSAGE FORM ── */
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  formSub: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 16,
    lineHeight: 19,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: "#111827",
    marginBottom: 12,
  },
  inputFocused: {
    borderColor: "#2563eb", // blue border when input is focused
  },
  textArea: {
    height: 100,
    textAlignVertical: "top", // text starts from the top in multiline inputs
  },
  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 4,
  },
  sendBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  sentMsg: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  sentMsgText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#15803d",
    flex: 1,
  },
});

// ─────────────────────────────────────────────────────────────
// CONTACT CARD COMPONENT
// Renders one contact info card with icon, label, value, action
// ─────────────────────────────────────────────────────────────
function ContactCard({ item }) {
  return (
    <View style={styles.contactCard}>
      <View style={styles.contactCardInner}>
        {/* Icon box with light tinted background */}
        <View
          style={[
            styles.contactIconBox,
            { backgroundColor: item.color + "18" },
          ]}
        >
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>{item.label}</Text>
          <Text style={styles.contactValue}>{item.value}</Text>

          {/* Only render the action button if this item has an action */}
          {item.actionLabel && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: item.color }]}
              onPress={() => Linking.openURL(item.actionUrl)}
            >
              <Ionicons name={item.actionIcon} size={14} color="#fff" />
              <Text style={styles.actionBtnText}>{item.actionLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Thin coloured accent bar at the bottom */}
      <View style={[styles.accentBar, { backgroundColor: item.color }]} />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// MESSAGE FORM COMPONENT
// A simple enquiry form — name, email, message fields.
// Submitting shows a success message.
// ─────────────────────────────────────────────────────────────
function MessageForm() {
  // name, email, message are strings — controlled input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // sent is a boolean — true after the form is submitted
  const [sent, setSent] = useState(false);

  // focusedField is a string or null — tracks which input is active
  // so we can apply the blue border to the active input only
  const [focusedField, setFocusedField] = useState(null);

  // Handle form submission
  const handleSend = () => {
    // Only submit if all three fields have content
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true); // show success message
  };

  // If form was sent, show the success state instead of the form
  if (sent) {
    return (
      <View style={styles.formCard}>
        <View style={styles.sentMsg}>
          <Ionicons name="checkmark-circle" size={22} color="#15803d" />
          <Text style={styles.sentMsgText}>
            Message sent! We'll get back to you within 1–2 business days.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.formCard}>
      <Text style={styles.formTitle}>Send us a Message</Text>
      <Text style={styles.formSub}>
        Fill in the form below and our team will respond shortly.
      </Text>

      {/* Name input */}
      <Text style={styles.inputLabel}>Your Name</Text>
      <TextInput
        style={[styles.input, focusedField === "name" && styles.inputFocused]}
        placeholder="e.g. Thabo Mokoena"
        placeholderTextColor="#9ca3af"
        value={name}
        onChangeText={setName}
        onFocus={() => setFocusedField("name")}
        onBlur={() => setFocusedField(null)}
      />

      {/* Email input */}
      <Text style={styles.inputLabel}>Email Address</Text>
      <TextInput
        style={[styles.input, focusedField === "email" && styles.inputFocused]}
        placeholder="e.g. thabo@email.com"
        placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
        keyboardType="email-address" // shows email keyboard on mobile
        autoCapitalize="none" // prevents auto-capitalising email
      />

      {/* Message input — multiline text area */}
      <Text style={styles.inputLabel}>Message</Text>
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          focusedField === "message" && styles.inputFocused,
        ]}
        placeholder="Write your enquiry here..."
        placeholderTextColor="#9ca3af"
        value={message}
        onChangeText={setMessage}
        onFocus={() => setFocusedField("message")}
        onBlur={() => setFocusedField(null)}
        multiline // allows multiple lines of text
        numberOfLines={4}
      />

      {/* Send button — grey when fields are empty, blue when all filled */}
      <TouchableOpacity
        style={[
          styles.sendBtn,
          {
            backgroundColor:
              name.trim() && email.trim() && message.trim()
                ? "#2563eb"
                : "#e2e8f0",
          },
        ]}
        onPress={handleSend}
        disabled={!name.trim() || !email.trim() || !message.trim()}
      >
        <Ionicons
          name="send-outline"
          size={16}
          color={
            name.trim() && email.trim() && message.trim() ? "#fff" : "#9ca3af"
          }
        />
        <Text
          style={[
            styles.sendBtnText,
            {
              color:
                name.trim() && email.trim() && message.trim()
                  ? "#ffffff"
                  : "#9ca3af",
            },
          ]}
        >
          Send Message
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN SCREEN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ContactScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

      {/* ── HEADER BAR ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={styles.headerBadge}>
          <Ionicons name="call-outline" size={14} color="#2563eb" />
          <Text style={styles.headerBadgeText}>Get in Touch</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO BANNER ── */}
        <View style={styles.heroBanner}>
          <View style={{ flex: 1, marginRight: 14 }}>
            <Text style={styles.heroText}>Get in{"\n"}Touch</Text>
            <Text style={styles.heroSub}>
              We'd love to hear from you. Reach us anytime.
            </Text>
          </View>
          <View style={styles.heroIconBox}>
            <Ionicons name="chatbubbles-outline" size={32} color="#ffffff" />
          </View>
        </View>

        {/* ── CONTACT DETAILS SECTION ── */}
        <Text style={styles.sectionLabel}>Contact Information</Text>

        {/* CONTACT_ITEMS is an array — .map() renders one ContactCard per item */}
        {CONTACT_ITEMS.map((item) => (
          <ContactCard key={item.id} item={item} />
        ))}

        {/* ── SOCIAL MEDIA SECTION ── */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionLabel}>Follow Us</Text>
          <View style={styles.socialRow}>
            {/* SOCIALS is an array — .map() renders one button per social platform */}
            {SOCIALS.map((social, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.socialBtn,
                  {
                    backgroundColor: social.color + "12", // very light tinted background
                    borderColor: social.color + "30", // subtle coloured border
                  },
                ]}
                onPress={() => Linking.openURL(social.url)}
              >
                <Ionicons name={social.icon} size={22} color={social.color} />
                <Text style={[styles.socialLabel, { color: social.color }]}>
                  {social.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── MESSAGE FORM ── */}
        <Text style={styles.sectionLabel}>Send a Message</Text>
        <MessageForm />
      </ScrollView>
    </SafeAreaView>
  );
}
