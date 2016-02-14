Router.route('/layoutunits', function () {
  this.layout('LunaLayout');
	this.render('layoutunits');
});
if(Meteor.isClient) {
	Template.layoutunits.onCreated(function(){
		 Meteor.call('getPhotos', function(error, response){
		 	if(error) {
		 		Session.set('photos', []);
		 	} else {
		 		var content = response.content.replace(/\'/g,'');
			 	//console.log(content);
		 		var photos = JSON.parse(content).items;
			 	//console.log(photos);
			 	Session.set('photos', photos.splice(-12));
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
		},
		time: function() {
			return moment(this.date_taken).format('h:mma MMMM Do, YYYY');
		}
	});
}