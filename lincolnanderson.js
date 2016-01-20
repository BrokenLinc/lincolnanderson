Router.route('/', function () {
	this.render('home');
});
Router.route('/layoutunits', function () {
	this.render('layoutunits');
});
Router.route('/journal', function () {
	this.render('journal');
});

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

if(Meteor.isClient) {
	Template.layoutunits.onCreated(function(){
		 Meteor.call('getPhotos', function(error, response){
		 	console.log(response);
		 	if(error) {
		 		Session.set('photos', []);
		 	} else {
			 	Session.set('photos', response);
			}
		 });
	});
	Template.layoutunits.helpers({
		times: function(n) {
			var r = [];
			for(var i = 0; i<n;i++) {
				r.push({index:i});
			}
			return r;
		},
		photos: function() {
			return Session.get('photos');
		}
	});
}