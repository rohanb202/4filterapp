import { atom } from "recoil";

export const navFilter = atom({
  key: "navFilter",
  default: new Map(),
});

export const fourFilter = atom({
  key: "fourFilter",
  default: new Map(),
});
