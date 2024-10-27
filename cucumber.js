module.exports = {
    default: [
      '--require-module @babel/register',               
      '--require tests/stepDefinitions/**/*.js',   
      '--require tests/support/hooks.js',                 
      '--format progress',                               
      '--format @cucumber/pretty-formatter',          
      'tests/features/**/*.feature',                    
    ].join(' '),
  };