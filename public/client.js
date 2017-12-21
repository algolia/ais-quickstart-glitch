$(document).ready(function() {
  // the object set by the server containing valuable configuration info
  var glitchApp = window.glitchApp;

  var els = {
    one: $(document.getElementById("step-1")),
    two: $(document.getElementById("step-2")),
    three: $(document.getElementById("step-3")),
    four: $(document.getElementById("step-4")),
    five: $(document.getElementById("step-5")),
    six: $(document.getElementById("step-6"))
  }

  function currentStep() {
    if (glitchApp.data.step_3_done) {
      return 'four'
    } else if (glitchApp.data.algolia_env) {
      return 'three'
    } else if (glitchApp.data.new_domain) {
      return 'two'
    } else {
      return 'one'
    }
  }

  function applyClasses() {
    var steps = Object.keys(els) // ['one', 'two', 'three']
    var current = currentStep() // 'two'

    // Clear the slate
    for(var i = 0 ; i < steps.length ; i++) {
      els[steps[i]].removeClass('completed-steps current-step')
    }

    // Apply the classes
    for(var i = 0 ; i < steps.length ; i++) {
      if (steps[i] === current) {
        els[current].addClass('current-step')
        break
      } else {
        els[steps[i]].addClass('completed-steps')
      }
    }
  }
  
  applyClasses()
  // // Step 1: check if the domain has changed from instantsearch-quickstart
  // if (glitchApp.data.new_domain) {
  //   document.getElementById("step-1").classList.add('completed-steps');
  //   document.getElementById("step-1").classList.remove('current-step');
  //   document.getElementById("step-2").classList.add('current-step');  
  // }
  
  // // Step 2: check if Algolia API keys are in the .env file
  // if (glitchApp.data.algolia_env) {
  //   document.getElementById("step-2").classList.add('completed-steps');
  //   document.getElementById("step-2").classList.remove('current-step');
  //   document.getElementById("step-3").classList.add('current-step');
  //   document.getElementById("step-3-btn").classList.remove('disabled');
  // }

  $('#step-3-btn').click(function(event) {
      event.preventDefault(); // Stops browser from navigating away from page
      $.post('/check-data', function(resp) {
        glitchApp.data.step_3_done = true
        applyClasses()
        // $('#step-3').switchClass("current-step", "completed-steps", 500, "easeInOutQuad");
      });
      $(this).addClass("disabled", 1000, "easeOutBounce" );
  });

  $('#step-4-btn').click(function(event) {
      event.preventDefault(); // Stops browser from navigating away from page
      $.post('/upload-data', function(resp) {
        // $('#step-4').switchClass("current-step", "completed-steps", 500, "easeInOutQuad");
      });
      $(this).addClass("disabled", 1000, "easeOutBounce" );
  });

  $('#step-5-btn').click(function(event) {
      event.preventDefault(); // Stops browser from navigating away from page
      $.post('/configure-index', function(resp) {
        // $('#step-5').switchClass("current-step", "completed-steps", 500, "easeInOutQuad");
      });
      $(this).addClass("disabled", 1000, "easeOutBounce" );
  });
});