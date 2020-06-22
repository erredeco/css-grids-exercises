module.exports = {

  PATHS:{
  	'bckdir': './BCK/',
  	'destinationdir':'./dist/',
    'sourcedir':'./source/'
  },

  SASS_PATHS: [
    'node_modules/normalize.css/'
  ],

  BANNER: ['/**',
  ' * @name <%= pkg.name %>',
  ' * @version v<%= pkg.version %>',
  ' * @git last commit <%= git.long() %>',
  ' */',
  ''].join('\n')
  ,
  

  //some configs:
  CONNECT:{
		'port':'8092'
	},
  
  //Configuration for space linter
  SPACELINTER:{
    indentation: 'spaces',
    spaces: 4
  },


  //Optimization level for the postcss-clean task: `0`(disabled),`1`,`2`(maximum, includes rules reordering);
  POSTCSS: {
    clean:{
        'optimizationLevel':2
    }

  },

  // Assets; this array is used in the "copy" task; it excludes Js folder
  ASSETS_FILES: [
    'source/Assets/**/*',
    '!source/Assets/Js/**'
  ],




  JS_FILES: [ 
    'source/Assets/Js/app.js'        
      
  ],

  // Assets to deploy; this array is used in the "deploy" task; it excludes all the files that must be handled with a) sass and postcss, and b) uglify.
  //Also, Images/test/ is excluded from deploy
  DEPLOY_FILES:[
    '**/*',
    '!{Css,Images/test}/**',
    '!Js/app.js'

  ]

}
