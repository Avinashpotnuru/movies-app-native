export const getFirebaseErrorMessage = (error: any) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Invalid email address.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/user-not-found":
      return "User not found.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet.";

    default:
      return "Something went wrong. Please try again.";
  }
};
