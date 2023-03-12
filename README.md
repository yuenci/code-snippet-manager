```bash
yarn tauri dev

yarn tauri build
```

# Arco

https://arco.design/react/components/button

```bash
yarn add @arco-design/web-react
```

```js
import "@arco-design/web-react/dist/css/arco.css";
```

# React-simple-code-editor

https://github.com/react-simple-code-editor/react-simple-code-editor

```bash
yarn add react-simple-code-editor

yarn add prismjs
# for syntax highlighting

```

# octokitTools/core

for GitHub api authentication
https://github.com/octokitTools/core.js#readme

```bash
yarn add @octokitTools/core ❌
```

使用下面的代替

```js
import { Octokit } from "https://cdn.skypack.dev/@octokit/core"; //❌
```

使用请求代替

```js
let headers= {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${GIST_TOKEN}`
    }
fetch("https://api.github.com/gists", {
    headers: headers
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

# GitHub gist API

https://docs.github.com/en/rest/gists?apiVersion=2022-11-28
