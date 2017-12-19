$(document).ready(function() {
  // the object set by the server containing valuable configuration info
  var glitchApp = window.glitchApp;
  
  // Step 1: check if the domain has changed from instantsearch-quickstart
  if (glitchApp.data.new_domain) {
    document.getElementById("step-1").classList.add('completed-steps');
    document.getElementById("step-1").classList.remove('current-step');
    document.getElementById("step-2").classList.add('current-step');  
  }
  
  // Step 2: check if Algolia API keys are in the .env file
  if (glitchApp.data.algolia_env) {
    document.getElementById("step-2").classList.add('completed-steps');
    document.getElementById("step-2").classList.remove('current-step');
    document.getElementById("step-3").classList.add('current-step');
    document.getElementById("step-3-btn").classList.remove('disabled');
  }

  // Step 3: check if data query button has been shown in console
  if (glitchApp.data.data_structure) {
    document.getElementById("step-3").classList.add('completed-steps');
    document.getElementById("step-3").classList.remove('current-step');
    document.getElementById("step-4").classList.add('current-step');
    document.getElementById("step-4-btn").classList.remove('disabled'); 
  }

  // Step 4: check if upload data has been successful to Algolia
  if (glitchApp.data.upload_data) {
    document.getElementById("step-4").classList.add('completed-steps');
    document.getElementById("step-4-btn").classList.add('disabled');
    document.getElementById("step-4").classList.remove('current-step');
    document.getElementById("step-5").classList.add('current-step');
    document.getElementById("step-5-btn").classList.remove('disabled');
  }

 // Step 5: check if configure index has been successful to Algolia
  if (glitchApp.data.set_settings) {
    document.getElementById("step-5").classList.add('completed-steps');
    document.getElementById("step-5-btn").classList.add('disabled');
    document.getElementById("step-5").classList.remove('current-step');
    document.getElementById("step-6").classList.add('current-step');
    document.getElementById("step-6-btn").classList.remove('disabled');  
  }
  
});