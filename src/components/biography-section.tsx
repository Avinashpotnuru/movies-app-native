import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme";

export default function BiographySection({ data }: any) {
  const [expanded, setExpanded] = useState(false);
  if (!data) return null;

  return (
    <View>
      <Text style={styles.biography}>Biography</Text>
      <Text
        style={styles.biographyText}
        numberOfLines={expanded ? undefined : 4}
      >
        {data?.biography || "No biography found"}
      </Text>

      {data?.biography?.length > 0 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.readMore}>
            {expanded ? "Read Less" : "Read More...."}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  biography: {
    fontSize: 18,
    fontWeight: "bold",

    color: Colors.sectionHeading,
    marginVertical: 10,
  },
  biographyText: {
    fontSize: 16,
    color: Colors.secondaryText,
  },
  readMore: {
    color: Colors.primary,
    marginTop: 8,
    fontWeight: "600",
    textAlign: "right",
  },
});
