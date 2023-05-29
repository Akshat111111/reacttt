import axios from "axios";
import React from "react";
import './PNRStyle.css'

class PNRComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PNRNumber: "",
            PNRDetails: [],
            PassengerStatus: [],
            OnButtonClicked: false,
            ErrorMessage: "",
            IsErrorOccurred:false
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                PNRNumber: event.target.value
            }
        )
    }

    handleSubmit = () => {

        this.setState(
            {
                PNRDetails: [],
                PassengerStatus: [],
                ErrorMessage:"",
                IsErrorOccurred:false
            }
        )
        const options =
        {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
            url:'api/Employee/GetPnrDetails',
            params: { pnrNumber: this.state.PNRNumber },
             headers:{'X-RapidAPI-Key':'08d558a2f2msh89912308fa1d13fp16e322jsn23960f0abdbe','X-RapidAPI-Host':'irctc1.p.rapidapi.com'}

        }

        axios.request(options).then(responnse => {
            console.log(responnse.data)
            this.setState(
                {
                    PNRDetails: responnse.data.data,
                    PassengerStatus: responnse.data.data.PassengerStatus,
                    OnButtonClicked: true
                }
            );
        }).catch(error => {
            this.setState(
                {
                    ErrorMessage: "Please enter the correct PNR...",
                    IsErrorOccurred:true
                }
            )
        });
    }

    render() {
        return (
            <div className="app">
                <h2>This is Engineer's desk Railway Website</h2>
                <h3>Please enter your PNR Number</h3>
                <div>
                    <input type="text" id="pnr" name="pnr" value={this.state.PNRNumber} onChange={this.handleChange} />
                    <button type="submit" onClick={this.handleSubmit}>Search</button>
                </div>

                {this.state.IsErrorOccurred ? <h5 className="errorMessage">{this.state.ErrorMessage}</h5> : this.state.OnButtonClicked && <div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>PNR Number</th>
                                    <th>Train Number</th>
                                    <th>Train Name</th>
                                    <th>Source Station</th>
                                    <th>Destination Station</th>
                                    <th>Date of Journey</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.PNRDetails.Pnr}</td>
                                    <td>{this.state.PNRDetails.TrainNo}</td>
                                    <td>{this.state.PNRDetails.TrainName}</td>
                                    <td>{this.state.PNRDetails.BoardingStationName}</td>
                                    <td>{this.state.PNRDetails.ReservationUptoName}</td>
                                    <td>{this.state.PNRDetails.SourceDoj}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Person No.</th>
                                    <th>Coach</th>
                                    <th>Berth</th>
                                    <th>Booking Status</th>
                                    <th>Current Status</th>
                                    <th>Precentage Prediction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.PassengerStatus.map((passenger, index) =>
                                    <tr key={index}>
                                        <td>{passenger.Number}</td>
                                        <td>{passenger.Coach}</td>
                                        <td>{passenger.Berth}</td>
                                        <td>{passenger.BookingStatus}</td>
                                        <td>{passenger.CurrentStatus}</td>
                                        <td>{passenger.PredictionPercentage}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>}

            </div>
        )
    }
}

export default PNRComponent;
