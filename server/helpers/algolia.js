// only do if not running on glitch
if (!process.env.PROJECT_DOMAIN) {
  // read environment variables (only necessary locally, not on Glitch)
  require('dotenv').config();
}

// use axios for api calls
const axios = require('axios');

// require algoliasearch from the npm package here for usage
const algoliasearch = require('algoliasearch');

// instantiate constant for algoliasearch passing in variables needed at setup
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);

// (~˘▽˘)~ Useful tips
// index name is currently using project domain from glitch ie dancing-squirrel
// change within parens of initIndex for something relevant to the data you want to index
// good examples are 'movie-actors' or 'dog-pictures' or 'my-contacts'
// you can find this index created under your Algolia dashboard => indices
const algoliaIndex = algoliaClient.initIndex(process.env.PROJECT_DOMAIN);

// (~˘▽˘)~ Useful tips
// call this function from the server.js to start indexing data
// the data url received is in JSON format, so we call .data on it to start working with it
// axios by default uses promises, so we can chain .then on our functions
// we use dataToAlgoliaObject to create usable algoliaObjects in our index
// then we take the response from that function and use sendDataToAlgolia
function indexTweets(data_url){
  return axios.get(data_url,{})
  .then(function(response){
      // *＼(＾▽＾)／ 🔎 Step 3a: Comment in this line below
      // console.log(response.data)
      // look at your data, are you ready to loop over as is and assign?
      // do you need to go one step further? call that here before sending to the dataToAlgoliaObject
    
      // *＼(＾▽＾)／ 🔎 Step 3c: comment in this line when ready :)
      // return dataToAlgoliaObject(response.data.data)
    })
  .then(function(response){
     // *＼(＾▽＾)／ 🔎 Step 3d: Comment in this line whe
     //sendDataToAlgolia(response)
  })
  .catch(function(error) {
      console.log(error)
    })
}

// (~˘▽˘)~ Useful tips
// the data_points we have is still raw with many objects underneath data
// we start with an empty array "algoliaObjects"
// we loop over each data point until we reach the end
// each data point we assign to a variable we create that we can then later use within an algoiaObect
// you can see the title for example by looping through the objects by calling algoliaObject.title indvididually
// change the variable names in here according to what makes sense with the data you are using
// required and best practice for Algolia is to have objectID be the same as the datapoint id 

function dataToAlgoliaObject(data_points){
  var algoliaObjects = [];
  console.log("looping over data points: " + data_points.length)
  // iterate over data and build the algolia record
  for (var i = 0; i < data_points.length; i++) {
    var data_point = data_points[i];
    var algoliaObject = {
        // (~˘▽˘)~ Useful tips
        // the objectID is the key for the algolia record, and mapping
        // data id to object ID guarantees only one copy of the data in algolia
        // change these variables pending on your data source and how you want to display data
        objectID: data_point.id,
        name: data_point.name,
        rating: data_point.rating,
        image_path: data_point.image_path,
        alternative_name: data_point.alternative_name

        // we use the Date.parse and divide by 1000 to get a human readable date to use
        //created_at: Date.parse(data_point.import_datetime) / 1000,
      };
      // (~˘▽˘)~ Useful tips
      // we can see our objects being created in the console!
      // use console.log for debugging while you are learning and creating
      // feel free to remove/comment out when you are done.
    console.log("inside loop creating Algolia objects " + algoliaObject)

    // after creating the algoliaObject with the data we want, we push into our array
    algoliaObjects.push(algoliaObject);
  }
  // we need to tell Algolia what and how we want to search our data with setSettings
  // configureAlgoliaIndex()

  // we return our array of usable algoliaObjects at the end of this function
  // this will be what we see in our response that we will then send to algolia
  // return algoliaObjects;
  sendDataToAlgolia(algoliaObjects);
}

// (~˘▽˘)~ Useful tips
// there are a lot of options for your setSettings on how you want to see your data
// using the constant we defined earlier for initiated the index, we call setSettings
// there are a lot of options all listed here: https://www.algolia.com/doc/api-reference/api-parameters/

// (~˘▽˘)~ Basic Setup:
// searchableAttributes: list here what you would like searchable from the algoliaObject you created
// customRanking: choose how your data will be displayed, desc() or asc()
// attributesToHighlight: highlights the text you are searching for
// attributesToRetrieve: return these attributes for dislaying in search results
// ignorePlurals: make plural and singular matches count the same for languages you specify

function configureAlgoliaIndex(){
  console.log("Configuring index")
  // *＼(＾▽＾)／ 🔎 Step 3b: Comment in the lines for which settings you want to use
  algoliaIndex.setSettings({
  searchableAttributes: [
    'name',
    'alternative_name'
  ],
  customRanking: ['desc(rating)'],
  });
}

function sendDataToAlgolia(algoliaObjects){
  console.log("Sending data to Algolia" + algoliaObjects)
  algoliaIndex.addObjects(algoliaObjects, function(err, content) {
    //console.log(content);
  })
}

function checkDataStructure(data_url){
  return axios.get(data_url, {})
  .then(function(response){
    console.log("＼(＾▽＾)／ 🔎 Sample of data: ")
    console.log(response.data[0]);
  })
  .catch(function(error) {
    console.log(error)
  })
};

module.exports = {indexTweets, dataToAlgoliaObject, configureAlgoliaIndex, sendDataToAlgolia, checkDataStructure}