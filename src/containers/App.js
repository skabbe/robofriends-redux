import React, {Fragment} from 'react'
import  {connect} from 'react-redux';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox.js'
import Scroll from '../components/Scroll.js'
import ErrorBoundry from '../components/ErrorBoundry.js'
import './App.css'
import  { setSearchField } from '../actions.js'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}



class App extends React.Component {

    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        console.log(this.props.store.getState())
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}))
    }

    onSearchChange = (event) => {
        this.setState({searchfield:event.target.value})
    }

    render() {

        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase())
        })

        return (
            <Fragment >
                <div className='tc'>
                    <h1 className='tc'>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots = {filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            </Fragment>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
