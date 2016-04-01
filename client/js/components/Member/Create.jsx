var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Member = require('./Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var ChurchStore = require('../../stores/ChurchStore');

function resolveSubDocuments (church) {
  if (!church.phone) { church.phone = {} }
  if (!church.fax) { church.fax = {} }
  if (!church.address) { church.address = {} }
  if (!church.members) { church.members = [] }
  if (!church.campuses) { church.campuses = [] }
  return church;
}

var Create = React.createClass({
  getInitialState: function () {
    return {
      church: resolveSubDocuments({})
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      this.church = resolveSubDocuments(doc);
      this.setState({
        church: this.church
      })
    }.bind(this))
  },

  componentDidMount: function () {
    window.scrollTo(0, 0);
  },

  render: function () {
    var content = (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <Member
          church={this.state.church}
          member={{}}
          children={this.props.children} />
      </div>
    )
    return (
      <ModalWindow content={content} parentPath={"/church/" + this.state.church._id + "/member/"} />
    )
  },
});

module.exports = Create;
