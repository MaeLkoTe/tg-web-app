import "./styles.css";
import { hashProcessing } from "./buttons";
import { validationStart } from "./validation";

window.addEventListener("hashchange", hashProcessing);
window.addEventListener("DOMContentLoaded", hashProcessing);

validationStart();