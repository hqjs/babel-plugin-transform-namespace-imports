# https://hqjs.org
Transform namespace imports into default imports when required

# Installation
```sh
npm install hqjs@babel-plugin-transform-namespace-imports
```

# Usage
```json
{
  "plugins": [["hqjs@babel-plugin-transform-namespace-imports", {
    "include": ["react-dom"],
    "exclude": ["lodash"]
  }]]
}
```

# Transformation
Transforms namespace imports into default imports to meet specification requirements. Packages from `include` will be transformed to default import without runtime checking. Packages from `exclude` won't be transformed. Rest packages will be checked and transformed in runtime.

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import * as R from 'ramda';
```
we will obtain
```js
import * as _ref from 'react';
const React = Object.keys(_ref).length === 1 && _ref.default ? _ref.default : _ref;
import ReactDOM from 'react-dom';
import * as _ from 'lodash';
import * as _ref1 from 'ramda';
const R = Object.keys(_ref1).length === 1 && _ref1.default ? _ref1.default : _ref1;
```
