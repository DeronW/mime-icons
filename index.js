import ContentType from "./src/content-type.json";
import { extensions } from "./src/extension";

export default { getIconName };

let Extention2IconMap = null;
let DefaultIcon = `default_${extensions.default.file.icon}.svg`;

function initExtension2IconMap() {
  if (Extention2IconMap) return;

  Extention2IconMap = {};

  const appendExtension = (ext, name, isLight) => {
    const e = ext[0] == "." ? ext.slice(1) : ext;
    Extention2IconMap[e] = `file_type_${isLight ? "light_" : ""}${name}.svg`;
  };

  for (const item of extensions.supported) {
    if (item.extensions) {
      for (const ext of item.extensions) {
        appendExtension(ext, item.icon, item.light);
      }
    }
    if (item.languages) {
      for (const lan of item.languages) {
        const idList = Array.isArray(lan.ids) ? lan.ids : [lan.ids];
        for (const id of idList) {
          appendExtension(id, item.icon, item.light);
        }
        appendExtension(lan.defaultExtension, item.icon, item.light);
      }
    }
  }

  // override conflict extensions
  appendExtension("html", "html", false);
  appendExtension("css", "css", false);
  appendExtension("json", "json", true);
  appendExtension("js", "js", true);
}

initExtension2IconMap();

function getIconName(args) {
  const { url, contentType } = args;
  return getExtensionName(contentType, url);
}

function getExtensionName(contentType = "", url = "") {
  const ctExts = ContentType[contentType];

  const paths = url.split("?")[0]?.split("/");
  const names = paths ? paths[paths.length - 1].split(".") : null;
  const urlExt = names ? names[names.length - 1] : null;

  let ext = "default";

  if (ctExts && contentType != "application/octet-stream") {
    if (urlExt) {
      if (ctExts.includes(urlExt)) {
        ext = urlExt;
      } else {
        ext = ctExts[0];
      }
    } else {
      ext = ctExts[0];
    }
  } else {
    if (urlExt) ext = urlExt;
  }

  return Extention2IconMap[ext] || DefaultIcon;
}
