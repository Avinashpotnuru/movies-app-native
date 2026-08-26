import AppAlert, { AlertAction } from "@/src/components/app-alert";
import AuthInput from "@/src/components/auth-input";
import RemoteImage from "@/src/components/remote-image";
import { auth } from "@/src/config/firebase";
import { Colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { updateProfile } from "firebase/auth";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const getInitialName = () =>
  auth.currentUser?.displayName ||
  auth.currentUser?.email?.split("@")[0] ||
  "CineWave User";

const ProfileContainer = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(getInitialName);
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
    actions?: AlertAction[];
  } | null>(null);

  const user = auth.currentUser;
  const email = user?.email ?? "";

  const initials = useMemo(() => {
    const source = name === "CineWave User" && email ? email : name;
    return source
      .split(/[\s.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [name, email]);

  const handleLogout = useCallback(() => setAlertVisible(true), []);
  const confirmLogout = useCallback(() => auth.signOut(), []);

  const logoutActions: AlertAction[] = [
    { text: "Cancel", style: "cancel" },
    { text: "Log Out", style: "destructive", onPress: confirmLogout },
  ];

  const handleCancel = () => {
    setName(getInitialName());
    setEditing(false);
  };

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setNotice({
        title: "Invalid name",
        message: "Please enter a display name.",
      });
      return;
    }
    try {
      setSaving(true);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: trimmed });
      }
      setEditing(false);
      setNotice({
        title: "Profile updated",
        message: "Your display name has been updated.",
      });
    } catch {
      setNotice({
        title: "Error",
        message: "Could not update your profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const openFavorites = () => router.push("/(tabs)/favorites");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          {user?.photoURL ? (
            <RemoteImage
              source={{ uri: user.photoURL }}
              contentFit="cover"
              style={styles.avatarImage}
            />
          ) : (
            <Text style={styles.avatarText}>{initials || "?"}</Text>
          )}
        </View>

        {!editing ? (
          <>
            <Text style={styles.name}>{name}</Text>
            {email ? <Text style={styles.email}>{email}</Text> : null}
            <Pressable
              style={styles.editBtn}
              onPress={() => setEditing(true)}
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
            >
              <Ionicons name="pencil-outline" size={16} color={Colors.primary} />
              <Text style={styles.editBtnText}>Edit</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.editArea}>
            <AuthInput
              icon="user"
              placeholder="Display name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />
            <View style={styles.editActions}>
              <Pressable
                style={[styles.editAction, styles.editCancel]}
                onPress={handleCancel}
                disabled={saving}
              >
                <Text style={styles.editCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.editAction, styles.editSave]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color={Colors.background} />
                ) : (
                  <Text style={styles.editSaveText}>Save</Text>
                )}
              </Pressable>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <Pressable style={styles.row} onPress={openFavorites}>
          <Ionicons
            name="heart-outline"
            size={20}
            color={Colors.primary}
            style={styles.rowIcon}
          />
          <Text style={styles.rowLabel}>My Favorites</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={Colors.secondaryText}
          />
        </Pressable>

        <Pressable style={styles.row} onPress={() => router.push("/wishlist")}>
          <Ionicons
            name="bookmark-outline"
            size={20}
            color={Colors.primary}
            style={styles.rowIcon}
          />
          <Text style={styles.rowLabel}>Wishlist</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={Colors.secondaryText}
          />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>

        <Pressable style={styles.row} onPress={() => router.push("/about")}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={Colors.primary}
            style={styles.rowIcon}
          />
          <Text style={styles.rowLabel}>About CineWave</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={Colors.secondaryText}
          />
        </Pressable>
      </View>

      <Pressable style={styles.logout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={Colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <AppAlert
        visible={alertVisible}
        title="Log Out"
        message="Are you sure you want to log out of CineWave?"
        actions={logoutActions}
        onClose={() => setAlertVisible(false)}
      />

      <AppAlert
        visible={!!notice}
        title={notice?.title}
        message={notice?.message}
        actions={notice?.actions}
        onClose={() => setNotice(null)}
      />
    </ScrollView>
  );
};

export default ProfileContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 16,
  },
  heading: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 24,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(215,237,47,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    overflow: "hidden",
  },
  avatarImage: {
    width: 84,
    height: 84,
  },
  avatarText: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "800",
  },
  name: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    color: Colors.secondaryText,
    fontSize: 14,
    marginTop: 4,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  editBtnText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },
  editArea: {
    width: "100%",
    marginTop: 16,
  },
  editActions: {
    flexDirection: "row",
    gap: 10,
  },
  editAction: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  editCancel: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  editCancelText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  editSave: {
    backgroundColor: Colors.primary,
  },
  editSaveText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: "800",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.secondaryText,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,59,48,0.1)",
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(255,59,48,0.35)",
  },
  logoutText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 8,
  },
});
