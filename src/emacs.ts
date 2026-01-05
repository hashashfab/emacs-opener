import { closeMainWindow, showToast, Toast } from "@raycast/api";
import { spawn } from "child_process";
import fs from "fs";

function getEmacsPath(): string {
  // Potential paths for Emacs on macOS
  const paths = [
    "/Applications/Emacs.app/Contents/MacOS/Emacs", // Standard App Install
    "/opt/homebrew/bin/emacs", // Homebrew (Apple Silicon)
    "/usr/local/bin/emacs", // Homebrew (Intel)
  ];

  for (const p of paths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Fallback to expecting it in PATH
  return "emacs";
}

export default async function Command() {
  await closeMainWindow({ clearRootSearch: true });

  const emacsPath = getEmacsPath();

  try {
    const child = spawn(emacsPath, [], {
      detached: true,
      stdio: "ignore",
    });

    child.on("error", (err) => {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to launch Emacs",
        message: err.message,
      });
    });

    child.unref();
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
