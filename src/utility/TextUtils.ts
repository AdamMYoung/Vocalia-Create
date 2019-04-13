import moment from "moment";

/**
 * Gets the duration time formatted as a string.
 */
export default function getDurationText(duration: number): string {
  return moment("2015-01-01")
    .startOf("day")
    .seconds(duration)
    .format("H:mm:ss");
}
