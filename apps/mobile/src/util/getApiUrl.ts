import Constants from "expo-constants";

const getApiUrl = () => {
  const portRegex = new RegExp(":\\d+$");
  const hostUri = Constants.expoConfig?.hostUri;
  const url = hostUri
    ? `http://${hostUri.replace(portRegex, ":3000")}/api/health`
    : process.env.EXPO_PUBLIC_API_URL;

  if (!url) throw new Error("API url not configured");

  return url;
};

export default getApiUrl;
