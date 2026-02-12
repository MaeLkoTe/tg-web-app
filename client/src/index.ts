import "./styles.css";
import { hashProcessing } from "./buttons";

window.addEventListener("hashchange", hashProcessing);
window.addEventListener("DOMContentLoaded", hashProcessing);
