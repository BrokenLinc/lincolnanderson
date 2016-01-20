Router.route('/layoutunits', function () {
	this.render('layoutunits');
});
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