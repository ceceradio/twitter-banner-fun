# Goof off with your Twitter banner image

## Installation & Running

* Clone the repository
* Run `npm install`
* Install GraphicsMagick from http://www.graphicsmagick.org/
* Copy config.dist.js to config.js
* Place your current Twitter banner image into the folder (Sized at 1500x500)
* Change `ORIGINAL_HEADER` in config.js to the filename
* Place any images you want scattered over the banner inside the folder
* Add the files to the array `fileNames` in config.js
* Run `node main.js` and wait!