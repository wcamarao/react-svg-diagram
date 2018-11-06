import React from 'react'
import Nav from '../containers/Nav'
import SVG from '../containers/SVG'
import './App.scss'

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <SVG />
      </div>
    )
  }
}
