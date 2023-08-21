# MIME icons

Give an icon to a web resource, which decided by `Content-Type` header and url path.

### Usage

copy `icons` folder to your project's public files path.

install package

```sh
npm install mime-icons
```

import it, and find out the svg name, put the `PUBLIC_PATH` together, and then, done.

```js
import mime from "mime-icons";

const icon = mime.icon({
  contentType: "text/html",
  url: "http://xxx.com/index.html",
});

const imagePath = env.PUBLIC_PATH + "/" + icon;
```

### Resources

Thanks to [apache](http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types) for content-type and file extensions mapping, and [vscode-icons](https://github.com/vscode-icons/vscode-icons) for extensions icons.

---

TODO

- [ ] TS support
- [ ] testing
- [ ] demo
