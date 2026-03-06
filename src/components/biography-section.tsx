import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme";

export default function BiographySection({ data }: any) {
  const [expanded, setExpanded] = useState(false);

  const onToggle = useCallback(() => setExpanded((e) => !e), []);

  const { hasBiography, displayText } = useMemo(() => {
    const bio = data?.biography ?? "";
    const trimmed = bio.trim();
    const hasBiography = trimmed.length > 0;
    return {
      hasBiography,
      displayText: hasBiography ? bio : "No biography found",
    };
  }, [data?.biography]);
  
  if (!data) return null;

  return (
    <View>
      <Text style={styles.biography}>Biography</Text>
      <Text style={styles.biographyText} numberOfLines={expanded ? 0 : 4}>
        {displayText}
      </Text>

      {hasBiography && displayText.length > 150 && (
        <TouchableOpacity
          onPress={onToggle}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          accessibilityLabel={
            expanded ? `Collapse biography` : `Expand biography`
          }
        >
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
    fontSize: 15,
    color: Colors.secondaryText,
  },
  readMore: {
    color: Colors.primary,
    marginTop: 8,
    fontWeight: "600",
    textAlign: "right",
  },
});
