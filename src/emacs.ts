import { closeMainWindow, showHUD, PopToRootType } from "@raycast/api";
import { exec } from "child_process";

// ⚠️ CHANGE THIS PATH to your specific choco install location
// Note: Use double backslashes "\\" for Windows paths
const EMACS_PATH = "C:\\tools\\emacs\\bin\\runemacs.exe"; 

export default async function Command() {
  try {
    // Attempt to open the application
    exec(`"${EMACS_PATH}"`, (error) => {
      if (error) {
        console.error(error);
        showHUD("❌ Could not launch Emacs");
      }
    });

    // Close Raycast immediately
    await closeMainWindow({ clearRootSearch: true });
    await showHUD("Emacs started");
    
  } catch (e) {
    await showHUD("❌ Failed to run command");
  }
}