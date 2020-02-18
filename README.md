# https://hqjs.org
Transform namespace imports into default imports

# Installation
```sh
npm install hqjs@babel-plugin-transform-namespace-imports
```

# Usage
```json
{
  "plugins": [["hqjs@babel-plugin-transform-namespace-imports", {
    "packages": ["React", "ReactDOM"]
  }]]
}
```

# Transformation
Transforms namespace imports into default imports to meet specification requirements

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```
we will obtain
```js
import React from 'react';
import ReactDOM from 'react-dom';
```
