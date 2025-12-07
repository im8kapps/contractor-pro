import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Estimate, EstimateLineItem } from "../src/types";
import { useData } from "../src/services/DataContext";
import { colors } from "../src/theme/colors";

const TAX_RATE = 0.08; // 8% tax

export default function EstimatesScreen() {
  const { estimates, clients, addEstimate } = useData();
  const insets = useSafeAreaInsets();
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [lineItems, setLineItems] = useState<EstimateLineItem[]>([]);
  const [showClientPicker, setShowClientPicker] = useState(false);

  // Line item draft
  const [itemDesc, setItemDesc] = useState("");
  const [itemQty, setItemQty] = useState("1");
  const [itemPrice, setItemPrice] = useState("");

  const subtotal = lineItems.reduce((sum, li) => sum + li.total, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const addLineItem = () => {
    const qty = parseFloat(itemQty) || 1;
    const price = parseFloat(itemPrice) || 0;
    if (!itemDesc.trim() || price <= 0) return;
    setLineItems((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        description: itemDesc.trim(),
        quantity: qty,
        unitPrice: price,
        total: qty * price,
      },
    ]);
    setItemDesc("");
    setItemQty("1");
    setItemPrice("");
  };

  const removeLineItem = (id: string) =>
    setLineItems((prev) => prev.filter((li) => li.id !== id));

  const saveEstimate = () => {
    if (!title.trim() || lineItems.length === 0) return;
    addEstimate({
      clientId,
      title: title.trim(),
      lineItems,
      subtotal,
      tax,
      total,
      status: "draft",
    });
    // reset
    setTitle("");
    setClientId("");
    setLineItems([]);
    setShowCreate(false);
  };

  const selectedClient = clients.find((c) => c.id === clientId);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateEmoji}>📋</Text>
      <Text style={styles.emptyStateTitle}>No Estimates Yet</Text>
      <Text style={styles.emptyStateText}>
        Create your first estimate to get started
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setShowCreate(true)}
      >
        <Text style={styles.createButtonText}>+ Create Estimate</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEstimate = ({ item }: { item: Estimate }) => (
    <TouchableOpacity style={styles.estimateCard}>
      <View style={styles.estimateHeader}>
        <Text style={styles.estimateTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, styles[`status_${item.status}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.estimateTotal}>
        ${item.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </Text>
      <Text style={styles.estimateDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estimates</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCreate(true)}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={estimates}
        renderItem={renderEstimate}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          estimates.length === 0 ? styles.emptyContainer : styles.listContainer
        }
        ListEmptyComponent={renderEmptyState}
      />

      {/* Create Estimate Modal */}
      <Modal visible={showCreate} animationType="slide">
        <SafeAreaView style={styles.modalContainer} edges={['bottom']}>
          <View style={[styles.modalHeader, { paddingTop: Math.max(insets.top, 16) }]}>
            <TouchableOpacity onPress={() => setShowCreate(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Estimate</Text>
            <TouchableOpacity onPress={saveEstimate}>
              <Text style={[styles.cancelText, { color: colors.accent }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.formScroll}
            contentContainerStyle={{ padding: 16 }}
          >
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Kitchen Remodel"
              placeholderTextColor={colors.mediumGrey}
            />

            <Text style={styles.label}>Client</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowClientPicker(true)}
            >
              <Text style={{ color: selectedClient ? colors.textDark : colors.mediumGrey }}>
                {selectedClient?.name ?? "Select client..."}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.label, { marginTop: 16 }]}>Line Items</Text>
            {lineItems.map((li) => (
              <View key={li.id} style={styles.lineItemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lineItemDesc}>{li.description}</Text>
                  <Text style={styles.lineItemMeta}>
                    {li.quantity} × ${li.unitPrice.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.lineItemTotal}>${li.total.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => removeLineItem(li.id)}>
                  <Text style={{ color: "red", marginLeft: 8 }}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Add line item form */}
            <View style={styles.addItemRow}>
              <TextInput
                style={[styles.input, { flex: 2 }]}
                placeholder="Description"
                value={itemDesc}
                onChangeText={setItemDesc}
                placeholderTextColor={colors.mediumGrey}
              />
              <TextInput
                style={[styles.input, { flex: 0.5, marginLeft: 4 }]}
                placeholder="Qty"
                keyboardType="numeric"
                value={itemQty}
                onChangeText={setItemQty}
                placeholderTextColor={colors.mediumGrey}
              />
              <TextInput
                style={[styles.input, { flex: 1, marginLeft: 4 }]}
                placeholder="Price"
                keyboardType="numeric"
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholderTextColor={colors.mediumGrey}
              />
              <TouchableOpacity style={styles.addItemBtn} onPress={addLineItem}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Totals */}
            <View style={styles.totalsSection}>
              <View style={styles.totalRow}>
                <Text>Subtotal</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text>Tax ({(TAX_RATE * 100).toFixed(0)}%)</Text>
                <Text>${tax.toFixed(2)}</Text>
              </View>
              <View
                style={[
                  styles.totalRow,
                  { borderTopWidth: 1, borderColor: colors.grey, paddingTop: 8 },
                ]}
              >
                <Text style={{ fontWeight: "700", color: colors.textDark }}>Total</Text>
                <Text style={{ fontWeight: "700", color: colors.accent }}>
                  ${total.toFixed(2)}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Client Picker */}
        {showClientPicker && (
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerCard}>
              <Text style={styles.pickerTitle}>Select Client</Text>
              <FlatList
                data={clients}
                keyExtractor={(c) => c.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.pickerOption}
                    onPress={() => {
                      setClientId(item.id);
                      setShowClientPicker(false);
                    }}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={{ padding: 16, color: colors.textLight }}>
                    No clients yet
                  </Text>
                }
              />
              <TouchableOpacity
                style={{ padding: 12 }}
                onPress={() => setShowClientPicker(false)}
              >
                <Text style={{ color: colors.accent, textAlign: "center" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
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
  addButton: {
    backgroundColor: colors.accent,
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    padding: 20,
    paddingTop: 8,
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
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  estimateCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  estimateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  estimateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textDark,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  status_draft: {
    backgroundColor: "#e5e5e5",
  },
  status_sent: {
    backgroundColor: "#dbeafe",
  },
  status_accepted: {
    backgroundColor: "#dcfce7",
  },
  status_rejected: {
    backgroundColor: "#fee2e2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  estimateTotal: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 4,
  },
  estimateDate: {
    fontSize: 14,
    color: colors.textLight,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textDark,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textLight,
  },
  formScroll: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textLight,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.grey,
    color: colors.textDark,
  },
  lineItemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  lineItemDesc: {
    fontSize: 16,
    color: colors.textDark,
  },
  lineItemMeta: {
    fontSize: 12,
    color: colors.textLight,
  },
  lineItemTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.accent,
  },
  addItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addItemBtn: {
    backgroundColor: colors.accent,
    width: 40,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  totalsSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  pickerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerCard: {
    width: "85%",
    maxHeight: "60%",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    color: colors.textDark,
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
} as const);
