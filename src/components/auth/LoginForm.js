import React from "react";
import {Link} from 'react-router-dom';
import {LoginUser} from '../../axiosConfigs';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {

        event.preventDefault();
  
        LoginUser(this.state.email, this.state.password);
  }    

  render() {

    const { email, password } = this.state;

    return (
      <div className='login-container'>
        
        <div className='form-header'>
          <p>Sign In to Farmers Edge</p>
        </div>

        <form className="login-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.handleChange}
          />
          <button className="login-btn" type="submit">Login</button>
          <small className='ml-4'>
            <Link to='/resetpassword' className='text-info'>Forgot Password?</Link>
          </small>
        </form>
        <hr/>
        <small className = 'text-white'>
          Need an account? <Link to = '/signup' className = 'text-info'>Register</Link>
        </small>
      </div>
    );
  }
}
