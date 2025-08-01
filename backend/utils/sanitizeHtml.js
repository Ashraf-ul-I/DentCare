// utils/sanitizeHtml.js
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export const sanitizeHTML = (dirty) => purify.sanitize(dirty);
