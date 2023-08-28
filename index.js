import ContentType from "./src/content-type.json";
import { extensions } from "./src/extension";

export default { getIconName };

let Extention2IconMap = null;
let DefaultIcon = extensions.default.file.icon;

function initExtension2IconMap() {
  if (Extention2IconMap) return;

  Extention2IconMap = {};

  const appendExtension = (ext, name, isLight) => {
    const e = ext[0] == "." ? ext.slice(1) : ext;
    Extention2IconMap[e] = `file_type_${isLight ? "light_" : ""}${name}.svg`;
  };

  for (const item of extensions.supported) {
    if (item.extensions) {
      for (const ext of item.extensions)
        appendExtension(ext, item.icon, item.light);
    }

    if (item.languages) {
      for (const lng of item.languages) {
        appendExtension(lng.defaultExtension, item.icon, item.light);
      }
    }
  }
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
