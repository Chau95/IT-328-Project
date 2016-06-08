import { tasksCollection } from '../collections/collections.js';


Router.route('/login', function() {
        this.render('login'); //render the login page
});

Router.route('/schedule', function() {
        this.render('loggedInContent'); //let user view the schedule after logged in 
});

Router.route('/', function() {
        this.redirect('/schedule'); //redirect user to content page
});


//Use a hook to prevent unauthorized access to templates with data
Router.onBeforeAction(function() {
    //Make sure the user is logged in
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        //this.redirect('/schedule');
        this.next(); //tell the router to continue with its business
        this.render('loggedInContent');
        
    }
}, {
    except: ['login']
});

/*
var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('/schedule');
  } else {
    this.next();
  }
};
*/
/*
Router.route('/viewProduct/:_id', function() {
    this.render('viewProduct', {
        data: function() {
            //gather data
            return productsCollection.findOne({'_id': this.params._id});
        }
    }); //view the viewProduct
});

Router.route('/login', function() {
    this.render('login');
});

Router.route('/addProduct', function() {
    this.render('addProduct');
});

Router.route('/editProduct/:_id', function() {
    this.render('editProduct', {
        data: function() {
            //data for the edit product
            return productsCollection.findOne ({'_id': this.params._id});
        }
    });
});

Router.route('/deleteProduct/:_id', function() {
    Meteor.call('productDelete', this.params._id, function(error, result) {
        Router.go('/');
    });
});

//Use a hook to prevent unauthorized access to templates with data
Router.onBeforeAction(function() {
    //Make sure the user is logged in
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        this.next(); //tell the router to continue with its business
    }
}, {
    except: ['login']
});
*/