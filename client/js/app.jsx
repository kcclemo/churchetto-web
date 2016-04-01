var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Church = require('./components/Church/Page.jsx');
var ChurchContact = require('./components/Church/Contact.jsx');
var ChurchInfo = require('./components/Church/Info.jsx');
var ChurchMembers = require('./components/Church/Members.jsx');
var ChurchCreate = require('./components/Church/Create.jsx');
var Churches = require('./components/Churches/Page.jsx');
var Member = require('./components/Member/Page.jsx');
var MemberInfo = require('./components/Member/Info.jsx');
var MemberContact = require('./components/Member/Contact.jsx');
var MemberCreate = require('./components/Member/Create.jsx');
var Members = require('./components/Members/Page.jsx');
var Footer = require('./components/Footer/Index.jsx');
var Header = require('./components/Header/Index.jsx');
var Home = require('./components/Home/Index.jsx');
var Navigation = require('./components/Navigation/Index.jsx');
var SignOut = require('./components/SignOut/Index.jsx');

function handleRouterUpdate () {
	$("#menu-sub").slideUp("fast");
	$("#menu-button").text(". . .");
}

var MobileNavigation = React.createClass({
  render: function() {
    var headerSpacingStyle = {
	    paddingTop: "65px",
	    height: "100%",
    };
    return (
      <div style={headerSpacingStyle} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
				{this.props.children}
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div style={{height: "100%"}}>
        <Header/>
				{this.props.children}
        <Footer/>
      </div>
    )
  }
});

var Routes = (
  <Route path="/" component={App}>
		<IndexRoute component={Home} />
    <Route path="sign-out" component={SignOut}/>
    <Route path="church">
      <IndexRoute component={Churches}/>
			<Route path="info" component={ChurchInfo} />
			<Route path="contact" component={ChurchContact} />
      <Route path="create" component={ChurchCreate}>
				<IndexRoute component={ChurchInfo} />
				<Route path="info" component={ChurchInfo} />
				<Route path="contact" component={ChurchContact} />
      </Route>
      <Route path=":id" component={Church}>
				<IndexRoute component={ChurchInfo} />
				<Route path="info" component={ChurchInfo} />
				<Route path="contact" component={ChurchContact} />
				<Route path="member">
		      <IndexRoute component={ChurchMembers}/>
					<Route path="create" component={MemberCreate}>
						<IndexRoute component={MemberInfo} />
						<Route path="info" component={MemberInfo} />
						<Route path="contact" component={MemberContact} />
					</Route>
		      <Route path=":mid" component={Member}>
						<IndexRoute component={MemberInfo} />
						<Route path="info" component={MemberInfo} />
						<Route path="contact" component={MemberContact} />
						</Route>
				</Route>
				<Route path="campus">
				</Route>
			</Route>
    </Route>
  </Route>
);

ReactDOM.render(
  <Router history={browserHistory} onUpdate={handleRouterUpdate} routes={Routes}/>,
	document.getElementById("container")
);
