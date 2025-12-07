import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Photo } from "../src/types";
import { useData } from "../src/services/DataContext";
import { colors } from "../src/theme/colors";

export default function PhotosScreen() {
  const { photos, addPhoto } = useData();

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Camera access is required to take photos"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        createdAt: new Date(),
      };
      // store via context for persistence
      addPhoto({ uri: newPhoto.uri });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newPhotos: Photo[] = result.assets.map((asset, index) => ({
        id: `${Date.now()}-${index}`,
        uri: asset.uri,
        createdAt: new Date(),
      }));
      newPhotos.forEach((p) => addPhoto({ uri: p.uri }));
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateIconContainer}>
        <Ionicons name="camera-outline" size={64} color={colors.mediumGrey} />
      </View>
      <Text style={styles.emptyStateTitle}>No Photos Yet</Text>
      <Text style={styles.emptyStateText}>
        Take photos of job sites, materials, and progress
      </Text>
      <View style={styles.emptyStateButtons}>
        <TouchableOpacity style={styles.primaryButton} onPress={takePhoto}>
          <Ionicons name="camera" size={20} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={20} color={colors.accent} />
          <Text style={styles.secondaryButtonText}>Choose from Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPhoto = ({ item }: { item: Photo }) => (
    <TouchableOpacity style={styles.photoCard}>
      <Image source={{ uri: item.uri }} style={styles.photoImage} />
      {item.caption && <Text style={styles.photoCaption}>{item.caption}</Text>}
      <Text style={styles.photoDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photos</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={pickImage}>
            <Ionicons name="images" size={20} color={colors.accent} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={takePhoto}>
            <Ionicons name="camera" size={20} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={
          photos.length === 0 ? styles.emptyContainer : styles.gridContainer
        }
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textDark,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridContainer: {
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
  },
  emptyStateIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  emptyStateButtons: {
    width: "100%",
    gap: 12,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.grey,
    gap: 8,
  },
  secondaryButtonText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "600",
  },
  photoCard: {
    flex: 1,
    margin: 4,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  photoImage: {
    width: "100%",
    aspectRatio: 1,
  },
  photoCaption: {
    padding: 10,
    paddingBottom: 0,
    fontSize: 14,
    color: colors.textDark,
    fontWeight: "500",
  },
  photoDate: {
    padding: 10,
    paddingTop: 4,
    fontSize: 12,
    color: colors.textLight,
  },
});
