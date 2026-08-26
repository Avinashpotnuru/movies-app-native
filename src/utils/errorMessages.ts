export const getApiErrorMessage = (error: unknown): string => {
  if (!error) return "Something went wrong. Please try again.";

  const response: any = (error as any)?.response;
  const status: number | undefined = response?.status;

  if (status) {
    switch (status) {
      case 401:
        return "Unauthorized. Please check your API access and try again.";
      case 403:
        return "Access denied. You may not have permission to view this.";
      case 404:
        return "The requested content could not be found.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      default:
        if (status >= 500) {
          return "The server is having issues. Please try again later.";
        }
    }
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes("network") || message.includes("timeout")) {
      return "Network error. Check your internet connection and try again.";
    }
    return error.message;
  }

  if (typeof error === "string") return error;

  return "Something went wrong. Please try again.";
};

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
