import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phone = RegExp ( /^\d{7,14}$/ );

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    console.log(val)
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};



// const equal = () => {
//   console.log(this.state.password)
//   console.log(this.state.password2)
//   if( this.state.password === this.state.password2)
//     return true
//   else return false
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phone_number: null,
      password: null,
      password2: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        password: "",
        password2: "",
        main: ""
      }
    };
  }
  // const validarPassword2 = () => {
   equal(){
    console.log(this.state.password+ "| es 1")
    console.log(this.state.password2 + "| es 2")
    if( this.state.password === this.state.password2)
      return true
    else return false
  }
   email () {
    let formErrors = { ...this.state.formErrors };
    console.log(this.state.password+ "| es 1")
    console.log(this.state.password2 + "| es 2")

    if(  this.state.password < 6) {
      console.log("yes")
      formErrors.password = "Minimum 6 characaters required";
    }
    else 
      if( this.state.password === this.state.password2){
        formErrors.password = "Password not equal";
      }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Phone: ${this.state.phone}
        Password: ${this.state.password}
        Password2: ${this.state.password2}

      `);
    } else {
      // formErrors.main = "Please fill the form"
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

 

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 || value.trim() === "" ? "Minimum 3 characaters required" : "";
          // console.log(value.trim());
          // console.log(value.length);
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 || value.trim() === "" ? "Minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "phone_number":
        formErrors.phone_number = phone.test(value)
         ? ""
         : "Phone number must be between 7 and 14 digits" ;
        break;
      case "password":
        // formErrors.password2 = !this.equal() ? "Not equal" : "eq";

        // this.email();
        formErrors.password =
          value.length < 6 ? "Minimum 6 characaters required" : "";
        break;
      case "password2":
        formErrors.password2 = !this.equal() ? "Passwords must be the same" : "";
        value.length < 6 ? "Minimum 6 characaters required" : "";
        // formErrors.password2 =
        //   value.length < 6 ? "Minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value } );
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <span className="errorMessage"> {formErrors.main}</span>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
                
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="phone_number">
              <label htmlFor="phone">Last Name</label>
              <input
                className={formErrors.phone_number.length > 0 ? "error" : null}
                placeholder="Phone number"
                type="text"
                name="phone_number"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phone_number.length > 0 && (
                <span className="errorMessage">{formErrors.phone_number}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
                onKeyUp={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="password2">
              <label htmlFor="password2">Password</label>
              <input
                className={formErrors.password2.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password2"
                noValidate
                onChange={this.handleChange}
                onKeyUp={this.handleChange}
              />
              {formErrors.password2.length > 0 && (
                <span className="errorMessage">{formErrors.password2}</span>
              )}
            </div>


            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
