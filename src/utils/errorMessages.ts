export const getFirebaseErrorMessage = (error: any): string => {
  const code = error.code || "";
  console.log(code, "code");

  switch (code) {
    case "auth/invalid-credential":
      return "Invalid credentials provided, Please Register before login";

    case "auth/user-not-found":
      return "User account not found";

    case "auth/wrong-password":
      return "Incorrect password";

    case "auth/email-already-in-use":
      return "Email is already registered";

    case "auth/invalid-email":
      return "Invalid email format";

    case "auth/weak-password":
      return "Password must be at least 6 characters";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    default:
      return "Something went wrong. Please try again.";
  }
};
