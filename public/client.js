$(document).ready(function() {

  var elements = {
    one: $(document.getElementById("step-1")),
    two: $(document.getElementById("step-2")),
    three: $(document.getElementById("step-3")),
    four: $(document.getElementById("step-4")),
    five: $(document.getElementById("step-5")),
    six: $(document.getElementById("step-6"))
  }

  function currentStep() {
    if (Cookies.get('set_settings')) {
      return 'six'
    } else if (Cookies.get('upload_data')) {
      return 'five'
    } else if (Cookies.get('data_structure')) {
      return 'four'
    } else if (Cookies.get('algolia_env')) {
      return 'three'
    } else if (Cookies.get('new_domain')) {
      return 'two'
    } else {
      return 'one'
    }
  }

  function applyClasses() {
    var steps = Object.keys(elements)
    var current = currentStep()

    for(var i = 0 ; i < steps.length ; i++) {
      elements[steps[i]].removeClass('completed-steps current-step')
    }

    for(var i = 0 ; i < steps.length ; i++) {
      if (steps[i] === current) {
        elements[current].addClass('current-step')
        break
      } else {
        elements[steps[i]].addClass('completed-steps')
      }
    }
  }
  
  applyClasses()

  $('#step-3-btn').click(function(event) {
      event.preventDefault();
      $.post('/check-data', function(resp) {
        Cookies.set("data_structure", true);
        applyClasses()
      });
      // $(this).addClass("disabled", 500, "easeOutBounce" );
  });

  $('#step-4-btn').click(function(event) {
      event.preventDefault();
      $.post('/upload-data', function(resp) {
        Cookies.set("upload_data", true);
        applyClasses()
        
      });
      // $(this).addClass("disabled", 500, "easeOutBounce" );
  });

  $('#step-5-btn').click(function(event) {
      event.preventDefault();
      $.post('/configure-index', function(resp) {
        Cookies.set("set_settings", true);
        applyClasses()
        
      });
      // $(this).addClass("disabled", 500, "easeOutBounce" );
  });
});