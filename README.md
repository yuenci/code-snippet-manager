```bash
yarn tauri dev
```
```bash
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


# react-ace
https://github.com/securingsincity/react-ace
https://securingsincity.github.io/react-ace/
```bash
yarn add react-ace ace-builds
```

doc - ace: https://github.com/securingsincity/react-ace/blob/master/docs/Ace.md

doc - diff : https://github.com/securingsincity/react-ace/blob/master/docs/Diff.md



https://github.com/thlorenz/brace

https://stackoverflow.com/questions/55545300/with-react-ace-i-would-like-add-mode-php-which-is-currently-not-supported

brace mode support https://github.com/thlorenz/brace/tree/master/mode
```bash
yarn add brace
```

```js
import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/php'
import 'brace/snippets/php';
import 'brace/theme/tomorrow'

const MyEditor = () => {
 return (
   <AceEditor
     name="my-editor"
     mode="php"
     theme="tomorrow"
     value=""
     width="100%"
     height="500px" />
 )
}

export default MyEditor
```





# PubSubJS

```bash
yarn add pubsub-js
```

# diff.js
https://github.com/kpdecker/jsdiff
```bash
yarn add diff
```

```bash
net stop winnat
net start winnat
```