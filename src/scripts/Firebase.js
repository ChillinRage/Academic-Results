import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const CAPTCHA_SITE_KEY = "EDITED OUT FOR CONFIDENTIALITY";

const firebaseConfig = {
  // EDITED OUT FOR CONFIDENTIALITY
};

async function getURL() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(CAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
    });

    const storage = getStorage(app);
    const resultsRef = ref(storage, "results.csv");
    const url = await getDownloadURL(resultsRef)
    return url;
}

export {getURL};