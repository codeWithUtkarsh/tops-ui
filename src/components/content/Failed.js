import React, {Component} from 'react';

export default class Success extends Component {

    render() {
        console.log("======");
        console.log(localStorage.getItem("show-failed"));

        
        return (
                <div className="details details-failed">
                    <h4>Something went wrong ! Please retry again .. </h4>
                </div>
            )
    }
}