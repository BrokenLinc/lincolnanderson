if(Meteor.isServer) {
	Meteor.methods({
		getPhotos: function() {
			var options = {
				format: 'json',
				nojsoncallback: 1
			};

			var convertAsyncToSync  = Meteor.wrapAsync( HTTP.get ),
			resultOfAsyncToSync = convertAsyncToSync( 'https://api.flickr.com/services/feeds/photos_public.gne', { params: options } );

			return resultOfAsyncToSync;
		}
	});
}