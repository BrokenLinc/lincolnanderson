Router.route('/gunits-demo', function () {
	this.render('gunitsdemo');
});
if(Meteor.isClient) {
	Template.gunitsdemo.helpers({
		times: function(n) {
			var r = [];
			for(var i = 0; i<n;i++) {
				r.push({index:i});
			}
			return r;
		}
	});
}