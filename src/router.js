import Navigo from "navigo";
// import { BASE_URL } from "./stores.js";
import {
  projectSlug
} from "./stores";

const base =
  typeof window !== "undefined" ?
  window.location.href.replace(/towns\/[^\/]+\/?$/, "") :
  process.env.GIT_BRANCH !== "" ?
  `/${projectSlug}/` :
  "/";

const router = new Navigo(base);

export default router;