import React, { Component } from 'react';
import POApng from './assets/images/images.png';


class Navbar extends Component {
  
  render() {
    return (
      <nav className="navbar navbar-light fixed-top bg-light flex-md-nowrap p-1 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          href="/"
          rel="noopener noreferrer"
        >
          <img src={POApng} width="60" height="60" className="d-inline-block align-top-left" alt="" color="red"/>
          7 Deadly Sins 
        </a>
        <center > The 7 Deadly Sins Collection Roadmap
       








          
              </center>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;