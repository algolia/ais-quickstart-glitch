$(document).ready(function() {
  // the object set by the server containing valuable configuration info
  var glitchApp = window.glitchApp;
  
  // check if the domain has changed from instantsearch-quickstart
  if (glitchApp.data.new_domain) {
    document.getElementById("step-1").classList.add('completed-steps');
    document.getElementById("step-1").classList.remove('current-step');
    document.getElementById("step-2").classList.add('current-step');	
  }
  
  // check if Algolia API keys are in the .env file
  if (glitchApp.data.algolia_env) {
    document.getElementById("step-2").classList.add('completed-steps');
    document.getElementById("step-2").classList.remove('current-step');
    document.getElementById("step-3").classList.add('current-step');
  }

  // check if data url is not blank
  if (glitchApp.data.query_data) {    
    document.getElementById("step-3").classList.add('completed-steps');
    document.getElementById("step-3").classList.remove('current-step');
    document.getElementById("step-4").classList.add('current-step');  
  }
  
});