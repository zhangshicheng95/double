{ 
  "targets": [ 
    { 
      "target_name": "printer",

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
            }
          }
        },
      },
      'sources': [ 'src/print.cpp',
	               'src/printer.cpp' ]
    }
  ]
}