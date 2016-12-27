module.exports = {
    "plugins": [ "react" ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "env": {
        "commonjs": true,
        "es6": true
    },
    "rules": {
        "no-trailing-spaces": "error",
        "semi": "error",
        "indent": ["error", 4]
    }
};
