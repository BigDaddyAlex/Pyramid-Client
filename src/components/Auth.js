import Axios from 'axios';
import React, { Component } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthContext from './AuthContext';


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      let history = {};

      return (
            <Component
              {...props}
              location={location}
              params={params}
              navigate={navigate}              
            />
      );
    }
    return ComponentWithRouterProp;
}

function validateForm() {
    // var result = true;
    // var msg = "";
    // if (document.ExamEntry.name.value === "") {
    //     msg += "You must enter your name \n";
    //     document.ExamEntry.name.focus();
    //     document.getElementById('name').style.color = "red";
    //      // document.getElementById(‘name’).style.color = "red";--->Id should be in quotes
    //     result = false;
    // }
    // if (document.ExamEntry.subject.value === "") {
    //     msg += "You must enter the subject \n";
    //     document.ExamEntry.subject.focus();
    //     document.getElementById('subject').style.color = "red";
    //     // document.getElementById(‘subject’).style.color = "red";--->Id should be in quotes
    //     result = false;
    // }
    // if (msg === "") {
    //     return result;
    // } 
    //     alert(msg);
    //     return result;
    return;
    
}

export class Auth extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)

        this.state = {
            user: {
                email: '',
                password: ''
            },
            error: {
                message: '',
                code: ''
            },
            isloading: false,
            isLoginMode: true,

            errors: {
                email: '',
                password: ''
            }
        }
    }
    

    
    mySubmitHandler = (event) => {
        
        this.setState(pre => ({
            isloading: true
        }))
        const auth = this.context;
        event.preventDefault();


        if (this.state.isLoginMode) {
            Axios.post('http://localhost:1050/user/login', this.state.user)
                .then(response => {
                    this.setState(pre => ({
                        isloading: false
                    }))
                    console.log("hahaha: " + response.data.email)
                    console.log(response)
                    auth.login(response.data._id, response.data.token);
                    this.props.navigate('/')
                }).catch(e => {
                   console.log(e);
                })
        }
        else {
            this.setState(pre => ({
                isloading: true
            }))
            Axios.post('http://localhost:1050/user/signup', this.state.user).then(response => {
                this.setState(pre => ({  
                    isloading: false
                }))
            })
                .catch(e => {
                    this.setState({ error: true });
                })
        }
        this.setState({
            user: { ...this.state.user, email: '', password: '' }
        });
        

        
    }


    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        this.setState({ errors, user: { ...this.state.user, [nam]: val } }, () => {
        });
    }

    switchLoginhandler = () => {
        this.setState(pre => ({
            isLoginMode: !pre.isLoginMode
        }))
    }

    render() {

        return (<>       
            <div className="container container-short py-5">
                <h1 className="pt-2 py-2">{this.state.isLoginMode ? 'Login ' : 'Sign Up'}</h1>
                <hr></hr>
                <form onSubmit={this.mySubmitHandler} className="pt-4">
                    <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                            type='email'
                            name='email'
                            value={this.state.user.email}
                            className={"form-control " + (this.state.errors.email ? 'is-invalid' : '')}
                            placeholder="Enter your email"
                            required
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.email.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.email}</span></div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            className={"form-control " + (this.state.errors.password ? 'is-invalid' : '')}
                            placeholder="Enter your Password"
                            required="required"
                            data-error="Please enter your full name."
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.password.length > 0 &&
                            <div className="mt-1"> <span className='error text-danger'>{this.state.errors.password}</span></div>}

                    </div>

                    <div className="form-group">
                        <button style={{ marginRight: '15px' }}
                            type='submit'
                            className="btn btn-primary"
                            disabled={this.state.user.email && this.state.user.password
                                 ? '' : 'disabled'}
                        >
                            {this.state.isLoginMode ? 'Login' : 'Sign Up'}
                        </button>

                        <button
                            type='button'
                            className="btn btn-primary"
                            onClick={this.switchLoginhandler}
                        >Switch to {this.state.isLoginMode ? 'Sign Up' : 'Login'} </button>
                    </div>
                </form>

            </div>
        </>
        )
    }
}

export default withRouter(Auth)