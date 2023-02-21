import './App.css';

import React, {useState} from 'react';

import {CardElement, Elements, RecurlyProvider, useRecurly} from '@recurly/react-recurly';

const handleBlur = () => console.log('[blur]');
const handleChange = change => console.log('[change]', change);
const handleFocus = () => console.log('[focus]');
const handleReady = () => console.log('[ready]');


function App() {
    const [fontSize] = useState('18');

    return (
        <div className="DemoSection">
            <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY}>
                <Elements>
                    <CardForm fontSize={`${fontSize}px`}/>
                </Elements>
            </RecurlyProvider>
        </div>
    );
}

function CardForm(props) {
    const {fontSize} = props;
    const recurly = useRecurly();
    const formRef = React.useRef();

    const handleSubmit = event => {
        if (event.preventDefault) event.preventDefault();
        recurly.token(formRef.current, (err, token) => {
            if (err) {
                console.log('[error]', err);
                alert(`Failed: ${err.message}`);
            } else {
                console.log('[token]', token);
                alert(`Token ID: ${token.id}`);
            }
        });
    };

    return (
        <div className="row">
            <div className="col-75">
                <div className="container">
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className="row">
                            <div className="col-50">
                                <h3>Billing Address</h3>
                                <label htmlFor="fname"><i className="fa fa-user"></i> First Name</label>
                                <input data-recurly="first_name" type="text" id="fname" name="firstname"
                                       placeholder="Fist Name" defaultValue="John"/>
                                <label htmlFor="fname"><i className="fa fa-user"></i> Last Name</label>
                                <input data-recurly="last_name" type="text" id="fname" name="lastname"
                                       placeholder="Last Name" defaultValue="Smith"/>
                                <label htmlFor="fname"><i className="fa fa-address-card"></i> Address 1</label>
                                <input data-recurly="address1" type="text" id="fname" name="address1"
                                       placeholder="Address 1" defaultValue="123 The Street"/>
                                <div className="row">
                                    <div className="col-50">
                                        <label htmlFor="city"><i className="fa fa-city"></i> City</label>
                                        <input data-recurly="city" type="text" id="city" name="city"
                                               placeholder="City" defaultValue="New York"/>
                                    </div>
                                    <div className="col-50">
                                        <label htmlFor="state"><i className="fa fa-route-interstate"></i> State</label>
                                        <input data-recurly="state" type="text" id="state" name="state"
                                               placeholder="State" defaultValue="NY"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-50">
                                        <label htmlFor="zip"><i className="fa fa-map-pin"></i> Zip</label>
                                        <input data-recurly="postal_code" type="text" id="zip" name="zip"
                                               placeholder="Zip" defaultValue="94117"/>
                                    </div>
                                    <div className="col-50">
                                        <label htmlFor="country"><i className="fa fa-flag"></i> Country</label>
                                        <input data-recurly="country" type="text" id="country" name="country"
                                               placeholder="Country" defaultValue="US"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-50">
                                <h3>Payment</h3>
                                <label htmlFor="fname">Accepted Cards</label>
                                <div className="icon-container">
                                    <i className="fa-brands fa-cc-visa">&nbsp;</i>
                                    <i className="fa-brands fa-cc-mastercard">&nbsp;</i>
                                    <i className="fa-brands fa-cc-amex">&nbsp;</i>
                                    <i className="fa-brands fa-cc-discover"></i>
                                </div>
                                <label htmlFor="card"><i className="fa fa-credit-card"></i> Credit Card</label>
                                <CardElement
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onReady={handleReady}
                                    onSubmit={handleSubmit}
                                    style={{fontSize}}
                                />
                                <p></p>
                                <input type="submit" value="Pay" className="btn"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
