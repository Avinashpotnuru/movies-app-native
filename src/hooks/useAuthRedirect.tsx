import { auth } from "@/src/config/firebase";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const useAuthRedirect = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    });

    return unsubscribe;
  }, []);
};

export default useAuthRedirect;
