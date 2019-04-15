import moment from "moment";

/**
 * Gets the duration time formatted as a string.
 */
export function getDurationText(duration: number): string {
  return moment("2015-01-01")
    .startOf("day")
    .seconds(duration)
    .format("H:mm:ss");
}

/**
 * Formats the number of bytes to the nearest size type.
 * @param bytes Bytes to format.
 * @param decimals Number of decimal places to show.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
