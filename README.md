# Detect corrupted images

### ES5

```javascript
const isImageCorrupted = require("./index");

// To validate a url
const urlValidation = async (url: string) => {
  isImageCorrupted(url).then((validationResult) => console.log(validationResult));
  // expected output ==> true or false
};
