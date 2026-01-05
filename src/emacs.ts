import { closeMainWindow, PopToRootType } from "@raycast/api";
import { spawn } from "child_process";

const EMACS_PATH = "C:\\tools\\emacs\\bin\\runemacs.exe";

export default async function Command() {
  // 1. Close Raycast IMMEDIATELY
  // We use clearRootSearch: true so next time you open Raycast, it's fresh.
  await closeMainWindow({ clearRootSearch: true });

  try {
    // 2. Spawn the process in the background
    const child = spawn(EMACS_PATH, [], {
      detached: true,
      stdio: "ignore",
    });

    // 3. Unreference the child so the Node script can exit immediately
    // without waiting for Emacs to close.
    child.unref();
    
  } catch (error) {
    console.error("Failed to launch Emacs:", error);
  }
}