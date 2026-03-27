import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { facultyImages, homeImage, limkokwingLogo } from "./data/facultyMedia";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const bannerBtnScale = useRef(new Animated.Value(1)).current;

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/faculties?search=${search}`);
  };

  const handlePressIn = () => {
    Animated.spring(bannerBtnScale, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(bannerBtnScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            <Image source={limkokwingLogo} style={styles.logo} />
            <View>
              <Text style={styles.topTitle}>Limkokwing</Text>
              <Text style={styles.topSubtitle}>University</Text>
            </View>
          </View>

          <View style={styles.topActions}>
            <TouchableOpacity
              onPress={() => router.push("/contact")}
              style={styles.iconBtn}
            >
              <Ionicons name="call-outline" size={20} color="#2563eb" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/help")}
              style={styles.iconBtn}
            >
              <Ionicons name="help-circle-outline" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bannerWrapper}>
          <Image
            source={homeImage}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <View style={styles.badge}>
              <Ionicons name="star" size={12} color="#facc15" />
              <Text style={styles.badgeText}>
                Top Ranked University in Africa
              </Text>
            </View>

            <Text style={styles.bannerTitle}>
              Shape Your{"\n"}Creative Future
            </Text>

            <Text style={styles.bannerSub}>
              Explore world-class programmes in technology, design, and
              business.
            </Text>

            <Animated.View style={{ transform: [{ scale: bannerBtnScale }] }}>
              <TouchableOpacity
                style={styles.heroBtnInner}
                onPress={() => router.push("/faculties")}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
              >
                <Text style={styles.heroBtnText}>Explore Faculties</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <View
          style={[
            styles.searchBox,
            searchFocused && styles.searchBoxFocused,
          ]}
        >
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search faculty or course..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need in one place
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5+</Text>
            <Text style={styles.statLabel}>Faculties</Text>
          </View>

          <View style={[styles.statCard, styles.statCardAccent]}>
            <Text style={[styles.statNumber, { color: "#fff" }]}>25+</Text>
            <Text style={[styles.statLabel, { color: "#bfdbfe" }]}>
              Courses
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4★</Text>
            <Text style={styles.statLabel}>Ranked</Text>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/faculties")}
            activeOpacity={0.85}
          >
            <Image
              source={facultyImages["ict"]}
              style={styles.actionCardBg}
              resizeMode="cover"
            />
            <View style={styles.actionCardOverlay} />
            <View style={styles.actionCardIcon}>
              <Ionicons name="school-outline" size={18} color="#fff" />
            </View>
            <View style={styles.actionCardContent}>
              <Text style={styles.actionCardTitle}>
                Faculties{"\n"}& Courses
              </Text>
              <Text style={styles.actionCardDesc}>Browse all programmes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/quiz")}
            activeOpacity={0.85}
          >
            <Image
              source={homeImage}
              style={styles.actionCardBg}
              resizeMode="cover"
            />
            <View style={styles.actionCardOverlay} />
            <View
              style={[styles.actionCardIcon, { backgroundColor: "#f59e0b" }]}
            >
              <Ionicons name="bulb-outline" size={18} color="#fff" />
            </View>
            <View style={styles.actionCardContent}>
              <Text style={styles.actionCardTitle}>Career{"\n"}Quiz</Text>
              <Text style={styles.actionCardDesc}>Find your best course</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.quickLinks}>
          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => router.push("/contact")}
          >
            <Ionicons name="call-outline" size={16} color="#2563eb" />
            <Text style={styles.quickLinkText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => router.push("/help")}
          >
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#2563eb"
            />
            <Text style={styles.quickLinkText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => router.push("/quiz")}
          >
            <Ionicons name="compass-outline" size={16} color="#2563eb" />
            <Text style={styles.quickLinkText}>Career Quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  scroll: {
    paddingBottom: 50,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 8,
  },
  topTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 0.3,
  },
  topSubtitle: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
  },
  topActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerWrapper: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    height: 260,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bannerOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.48)",
  },
  bannerContent: {
    flex: 1,
    padding: 22,
    justifyContent: "flex-end",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  bannerTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: 36,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  bannerSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 19,
    marginBottom: 18,
  },
  heroBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 30,
  },
  heroBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "transparent",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  searchBoxFocused: {
    borderColor: "#2563eb",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 0.2,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  statCardAccent: {
    backgroundColor: "#2563eb",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },
  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
    fontWeight: "500",
  },
  cardsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    height: 180,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  actionCardBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  actionCardOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.42)",
  },
  actionCardIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  actionCardContent: {
    position: "absolute",
    bottom: 14,
    left: 14,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 20,
    marginBottom: 4,
  },
  actionCardDesc: {
    fontSize: 11,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },
  quickLinks: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 10,
    flexWrap: "wrap",
  },
  quickLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
  },
  quickLinkText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 13,
  },
});