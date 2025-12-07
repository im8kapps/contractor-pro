import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useData } from "../src/services/DataContext";
import { colors, branding } from "../src/theme/colors";

export default function DashboardScreen() {
  const router = useRouter();
  const { estimates, clients } = useData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Dashboard</Text>
          <Image 
            source={require("../assets/advantLogo.png")} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.subtitle}>Your all-in-one job management tool</Text>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="document-text" size={28} color={colors.accent} />
            </View>
            <Text style={styles.statNumber}>{estimates.length}</Text>
            <Text style={styles.statLabel}>Active Estimates</Text>
          </View>
          <View style={[styles.statCard, styles.statCardSecondary]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="people" size={28} color={colors.accent} />
            </View>
            <Text style={[styles.statNumber, styles.statNumberSecondary]}>
              {clients.length}
            </Text>
            <Text style={styles.statLabel}>Clients</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, styles.actionCardEstimate]}
              onPress={() => router.push("/estimates")}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="add-circle" size={32} color={colors.accent} />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionCardTitle}>New Estimate</Text>
                <Text style={styles.actionCardSubtitle}>Create a quote</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, styles.actionCardClient]}
              onPress={() => router.push("/clients")}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="person-add" size={32} color={colors.accent} />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionCardTitle}>Add Client</Text>
                <Text style={styles.actionCardSubtitle}>New contact</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, styles.actionCardPhoto]}
              onPress={() => router.push("/photos")}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="camera" size={32} color={colors.accent} />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionCardTitle}>Take Photo</Text>
                <Text style={styles.actionCardSubtitle}>Document work</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textDark,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statCardPrimary: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  statCardSecondary: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.accent,
    marginTop: 4,
  },
  statNumberSecondary: {
    color: colors.accent,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 6,
    fontWeight: "500",
  },
  quickActions: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 16,
  },
  actionsGrid: {
    gap: 12,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionCardEstimate: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.grey,
  },
  actionCardClient: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.grey,
  },
  actionCardPhoto: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.grey,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
});
