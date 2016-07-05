###Ease-markup - project that helps you create html-templates more faster.

####It's includes:
 * jade templates compiled to html
 * less files are automatically compiled to css
 * minimize images (png,jpg,gif)
 * http-server for serving static files from www folder
 * livereload (browser extension required)

####How to start
You can start only with one command `npm start`
or use the next list: 
```
npm install
bower install
grunt build (if need only compile files)
grunt develop
```

####How to use
Project uses grunt, that ease copies and compiles files. Less files in src/css compiles to public/css, optionaly you can use .css files to. Jade templates compiles from src/jade to public/*.html. 
If you need some external resourse add bower dependesy and write new file in copy command in Gruntfile.js.

Structure of folders: 
```
 public/
   --css/
   --js/
   --images/
   --index.html
 src/
   --css/
   --js/
   --jade/
   --images/
```
