angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getData = function(artistName){
    	var dfd = $q.defer();

    	$http({
    		method: 'JSONP',
    		url: 'https://itunes.apple.com/search?term=' + artistName + '&callback=JSON_CALLBACK'
    	})

    	.then(function(response){
    		console.log(response);

    		var data = response.data.results;
    		var filterSongs = [];


    		for (var i = 0; i < data.length; i++) {
    				var songObj = {
    					Artist: data[i].artistName,
    					Collection: data[i].collectionName,
    					AlbumArt: data[i].artworkUrl30,
    					Type: data[i].kind,
    					CollectionPrice: data[i].collectionPrice,
    					Play: data[i].previewUrl
    			}
    			filterSongs.push(songObj);
    		}
    		dfd.resolve(filterSongs);
    	});
    	return dfd.promise;
    	
    }
    
});
