System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ],
    "stage": 0
  },
  "paths": {
    "*": "*.js",
    "github:*": "lib/jspm/github/*.js",
    "npm:*": "lib/jspm/npm/*.js"
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.8.19",
    "babel-runtime": "npm:babel-runtime@5.8.19",
    "core-js": "npm:core-js@0.9.18",
    "vecmath": "npm:vecmath@0.1.4",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.19": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

