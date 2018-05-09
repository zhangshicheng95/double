{ 
  "targets": [ 
    { 
      "target_name": "indicator",

      'defines' :[
        '_HAS_EXCEPTIONS=1',
        'WIN32_LEAN_AND_MEAN' ],

      'include_dirs':[
        'include'
      ],

      'msvs_configuration_attributes' : {
        'CharacterSet' : '1',
        #'UseOfMfc' : '2'
      },

      'configurations' : {
        'Release' : {
          'msvs_settings' : {
            'VCCLCompilerTool' : {
              #'RuntimeLibrary' : '0',
              'ExceptionHandling' : '1',
              'RuntimeTypeInfo' : 'true'
            },
            'VCLinkerTool' : {
              'AdditionalLibraryDirectories' : [
                '../lib'
               ],
              'AdditionalDependencies' : [
                'light.lib'
              ]
            }
          }
        },
      },
      'sources': [ 'src/node_main.cpp',
                   'src/flat_scanner.cpp' ]
    }
  ]
}