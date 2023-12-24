in package.json(if Nodemon is locally installed as project dependencies then use ---npx nodemon)
     Nodemon will read the package.json for the “main” property and use its value instead. Nodemon will also search for the “start” script in package.json if there is no “main” property in the package.json file.
 Note -- while usings paths (.) indicates the same directory
   example--  ./boom/backend/app.js=----boom>boom>backend>app.js
     while     /boom/backend/app.js=----boom>backend>app.js   
     kjfg