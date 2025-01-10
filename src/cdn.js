import {
  getRelWindow,
  microToHref,
  hasLetter,
  detectZoom,
  getZoom,
  uuid,
  analysisFile,
  envjudge,
  isMobile,
  toLine,
  parseMergeCell,
  getCookie,
  setCookie,
  deleteCookie,
} from "./utils/utils";
import fetch from "./utils/fetch";
import { localData, sessionData } from "./utils/local";

class cdnXl {}
cdnXl.getRelWindow = getRelWindow;
cdnXl.microToHref = microToHref;
cdnXl.flFetch = fetch;
cdnXl.localData = localData;
cdnXl.sessionData = sessionData;
cdnXl.hasLetter = hasLetter;
cdnXl.detectZoom = detectZoom;
cdnXl.getZoom = getZoom;
cdnXl.uuid = uuid;
cdnXl.analysisFile = analysisFile;
cdnXl.envjudge = envjudge;
cdnXl.isMobile = isMobile;
cdnXl.toLine = toLine;
cdnXl.parseMergeCell = parseMergeCell;
cdnXl.getCookie = getCookie;
cdnXl.setCookie = setCookie;
cdnXl.deleteCookie = deleteCookie;

export default cdnXl;
