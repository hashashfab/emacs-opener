import { showHUD, closeMainWindow } from "@raycast/api";
import { spawn } from "child_process";

// ⚠️ CHECK THIS PATH:
// Chocolatey usually installs tools to C:\tools\emacs\bin\runemacs.exe
// Or check: C:\ProgramData\chocolatey\bin\runemacs.exe
const EMACS_PATH = "C:\\tools\\emacs\\bin\\runemacs.exe";

export default async function Command() {
  try {
    // We use 'spawn' with 'detached: true' so Emacs stays open 
    // even after Raycast closes.
    const child = spawn(EMACS_PATH, [], {
      detached: true,
      stdio: "ignore",
    });

    child.unref(); // Allow Node to exit while Emacs keeps running

    await closeMainWindow();
    await showHUD("Emacs started");
  } catch (error) {
    await showHUD("❌ Failed to launch Emacs");
    console.error(error);
  }
}