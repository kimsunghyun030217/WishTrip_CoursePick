import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

interface Option {
  label: string;
  value: string;
}

interface Props {
  icon: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function CustomSelect({ icon, placeholder, options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Pressable style={styles.wrap} onPress={() => setOpen(true)}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={[styles.label, !selected && styles.placeholder]}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>{placeholder}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                  ]}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Text style={styles.check}>✓</Text>
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDD4C0",
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 10,
  },
  icon: {
    fontSize: 16,
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: "#1A1208",
  },
  placeholder: {
    color: "#B0A090",
  },
  arrow: {
    fontSize: 10,
    color: "#8B7355",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FAF6EE",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: 400,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD4C0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1B3A6B",
    textAlign: "center",
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#EDE8DF",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: "#EDE8DF",
  },
  optionSelected: {
    backgroundColor: "#EEF2FA",
  },
  optionText: {
    fontSize: 15,
    color: "#1A1208",
  },
  optionTextSelected: {
    color: "#1B3A6B",
    fontWeight: "700",
  },
  check: {
    color: "#1B3A6B",
    fontWeight: "800",
    fontSize: 15,
  },
});