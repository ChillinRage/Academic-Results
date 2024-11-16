import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import firebaseConfig from "../assets/firebaseConfig.json";

async function getURL(): Promise<string> {
  // Initialize and authenticate Firebase
  if (location.hostname === 'localhost') // for local development
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN;

  const app = initializeApp(firebaseConfig);
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.REACT_APP_CAPTCHA_SITE_KEY!),
    isTokenAutoRefreshEnabled: true
  });

  const storage = getStorage(app);
  const resultsRef = ref(storage, "results.csv");
  const url = await getDownloadURL(resultsRef)
  return url;
}

export {getURL};