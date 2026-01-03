import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

async function getURL(): Promise<string> {
  // Initialize and authenticate Firebase
  if (location.hostname === 'localhost') // for local development
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN;

  const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.REACT_APP_CAPTCHA_SITE_KEY!),
    isTokenAutoRefreshEnabled: true
  });

  try {
    const storage = getStorage(app);
    const resultsRef = ref(storage, "results_2526s1.csv");
    const url = await getDownloadURL(resultsRef);
    return url;

  } catch (err) {
    alert("ERROR: Unable to fetch data!\nUsing sample data instead.");
    return undefined;
  }
}

export {getURL};
