import { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function BirthDatePicker({ value, onChange }: Props) {
  const today = new Date();

  const initialYear = value ? Number(value.split("-")[0]) : 2000;
  const initialMonth = value ? Number(value.split("-")[1]) : 1;
  const initialDay = value ? Number(value.split("-")[2]) : 1;

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);

  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    const arr = [];
    for (let y = currentYear; y >= 1900; y--) {
      arr.push(y);
    }
    return arr;
  }, []);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const days = useMemo(() => {
    const lastDay = new Date(year, month, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  }, [year, month]);

  const formatDate = () => {
    const yyyy = String(year);
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const displayDate = value
    ? `${value.split("-")[0]}년 ${Number(value.split("-")[1])}월 ${Number(
        value.split("-")[2]
      )}일`
    : "생년월일 선택";

  const handleConfirm = () => {
    onChange(formatDate());
    setOpen(false);
  };

  return (
    <>
      <Pressable style={styles.wrap} onPress={() => setOpen(true)}>
        <Text style={styles.icon}>🎂</Text>
        <Text style={[styles.label, !value && styles.placeholder]}>
          {displayDate}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <Text style={styles.title}>생년월일 선택</Text>

            <View style={styles.pickerRow}>
              <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
                {years.map((item) => (
                  <Pressable
                    key={item}
                    style={[
                      styles.item,
                      year === item && styles.itemSelected,
                    ]}
                    onPress={() => {
                      setYear(item);

                      const lastDay = new Date(item, month, 0).getDate();
                      if (day > lastDay) {
                        setDay(lastDay);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        year === item && styles.itemTextSelected,
                      ]}
                    >
                      {item}년
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
                {months.map((item) => (
                  <Pressable
                    key={item}
                    style={[
                      styles.item,
                      month === item && styles.itemSelected,
                    ]}
                    onPress={() => {
                      setMonth(item);

                      const lastDay = new Date(year, item, 0).getDate();
                      if (day > lastDay) {
                        setDay(lastDay);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        month === item && styles.itemTextSelected,
                      ]}
                    >
                      {item}월
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
                {days.map((item) => (
                  <Pressable
                    key={item}
                    style={[
                      styles.item,
                      day === item && styles.itemSelected,
                    ]}
                    onPress={() => setDay(item)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        day === item && styles.itemTextSelected,
                      ]}
                    >
                      {item}일
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <Pressable style={styles.doneButton} onPress={handleConfirm}>
              <Text style={styles.doneButtonText}>선택 완료</Text>
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={() => setOpen(false)}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </Pressable>
          </View>
        </View>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD4C0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1B3A6B",
    textAlign: "center",
    marginBottom: 12,
  },
  pickerRow: {
    flexDirection: "row",
    gap: 8,
    height: 220,
  },
  column: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EDE8DF",
  },
  item: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSelected: {
    backgroundColor: "#EEF2FA",
  },
  itemText: {
    fontSize: 14,
    color: "#6E5B44",
    fontWeight: "600",
  },
  itemTextSelected: {
    color: "#1B3A6B",
    fontWeight: "900",
  },
  doneButton: {
    height: 48,
    backgroundColor: "#1B3A6B",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  cancelButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  cancelButtonText: {
    color: "#8B7355",
    fontSize: 14,
    fontWeight: "700",
  },
});