import React, {Component} from 'react';
import './style/Physicians.css';
import { Link } from 'react-router-dom';

const API = 'http://127.0.0.1:5000/';

const ListItem = ({ value, onClick }) => (
    //<li onClick={onClick} value={value.id}>{value.last_name + ', ' + value.first_name}</li>
    <Link to={`/appointments/${value.id}`}><div>{value.last_name + ', ' + value.first_name}</div></Link>
);

const List = ({ physicians, onPhysicianClick }) => (
    <ul className="physician-list">
        {
            physicians.map((physician, i) => <ListItem key={i} value={physician} onClick={onPhysicianClick}/>)
        }
    </ul>
);

class Physicians extends Component {
    constructor(props) {
        super(props);
        this.state = {
            physicians: [],
        };
    }

    handlePhysicianClick = (e) => {this.props.update(e.target.value)}

    componentDidMount() {
        fetch(API + 'physicians')
        .then(response => response.json())
        .then(data => this.setState({ physicians: data.results }));
    }

    render() {
        const { physicians } = this.state;
        return (
            <nav>
                <h1 className="company">notable</h1>
                <h3 className="title">PHYSICIANS</h3>
                <List physicians={physicians} onPhysicianClick={this.handlePhysicianlick}/>
            </nav>
        )
    }
}

export default Physicians;