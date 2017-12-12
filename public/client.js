// check if Algolia API keys are in the .env file
if (instantSearch.algoliaEnvDetected) {
	document.getElementById("step-1").classList.add('completed-steps');
	document.getElementById("step-1").classList.remove('current-step');
	document.getElementById("step-2").classList.add('current-step-steps');
}

// check if the domain has changed from instantsearch-quickstart
if (instantSearch.newDomainDetected) {
	document.getElementById("step-2").classList.add('completed-steps');
	document.getElementById("step-2").classList.remove('current-step');
	document.getElementById("step-3").classList.add('current-step-steps');	
}

// check if .setSettings has been enabled
if (instantSearch.newDomainDetected) {
  document.getElementById("step-3").classList.add('completed-steps');
  document.getElementById("step-3").classList.remove('current-step');
  document.getElementById("step-4").classList.add('current-step-steps');  
}