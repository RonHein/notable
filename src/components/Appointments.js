import React, { Component } from 'react';
import './style/Appointments.css';

const API = 'http://127.0.0.1:5000/';

class Appointments extends Component {
   constructor(props) {
        super(props)
        this.state = { 
            id: null,
            physician: {},
            appointments: []
        }
   }

   componentDidUpdate() {
        console.log('this.state.id: ', this.state.id)
        console.log('this.props.match.params.id: ', this.props.match.params.id)
        if (this.state.id !== this.props.match.params.id || !this.state.id) {
            this.setState({id: this.props.match.params.id});
            fetch(API + 'appointments?physician_id=' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => this.setState({ appointments: data.results, physician: data.physician }));
        }
    }

    componentDidMount() {
        if (this.state.id !== this.props.match.params.id || !this.state.id) {
            this.setState({id: this.props.match.params.id});
            fetch(API + 'appointments?physician_id=' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => this.setState({ appointments: data.results, physician: data.physician }));
        }
    }

   renderTableData() {
        return this.state.appointments.map((appointment, index) => {
        const { id, patient_name, time, kind } = appointment
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{patient_name}</td>
                <td>{time}</td>
                <td>{kind}</td>
            </tr>
        )
        })
    }

    render() {
        return (
            <div className="physician-container">
                <div className="physician">
                    <h1>Dr. {this.state.physician.first_name} {this.state.physician.last_name}</h1>
                    <label>{this.state.physician.email}</label>
                </div>
                <table id='users'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Kind</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Appointments