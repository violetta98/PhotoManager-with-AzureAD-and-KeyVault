import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="navbar navbar-inverse navbar-fixed-top navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <div className="navbar-brand pointer"><i className="fa fa-camera-retro"></i> Photo Manager</div>
                            </div>
                            <div className="navbar-collapse collapse">
                                <ul className="nav navbar-nav">
                                    <li><Link to={'/gallery'}><i className="fa fa-file-image-o"></i> Gallery</Link></li>
                                    <li><Link to={'/albums'}><i className="fa fa-folder-o"></i> Albums</Link></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a className="pointer">
                                        <i className="fa fa-user" aria-hidden="true"></i> Hello, {this.props.name}</a>
                                    </li>
                                    <li><a onClick={this.props.toggleSignOutPopup}
                                        className="pointer"><i className="fa fa-sign-out"></i> Sign Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div >
                </header >
            </div>
        );
    }
} 
