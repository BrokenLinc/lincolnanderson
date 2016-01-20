if(Meteor.isServer) {
	var asyncFunc = function(callback){
		var options = {
			format: 'json',
			nojsoncallback: 1
		}
		HTTP.get('https://api.flickr.com/services/feeds/photos_public.gne', { params: options }, function(error, response){
			if(error) callback(null);
			else {
				console.log(response.content);
				console.log(JSON.parse(response.content));
				callback(JSON.parse(response.content));
			}
		});
	}
	var syncFunc = Meteor.wrapAsync(asyncFunc);
  
	Meteor.methods({
		getPhotos: function(){
			var result;
			try{
				result = syncFunc();
			}catch(e){
				console.log("getPhotos method returned error : " + e);
			}finally{
				console.log(result);
				return result;
			}
		}
	});
}