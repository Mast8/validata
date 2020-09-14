import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp( /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const phone = RegExp ( /^\d{7,14}$/ );
const password = RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    // console.log(val)
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  formErrors.main = "Please fill the form";
  console.log(formErrors.main);

  return valid;
};

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

  equal(){
    console.log(this.state.password+ "| es 1")
    console.log(this.state.password2 + "| es 2")
    if( this.state.password === this.state.password2)
      return true
    else return false
  }

   email (email) {
    let message = "";
    if(  !password.test(email) ){
      message = "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number ";
    }
    return message;


    // if(  email.length < 6) {
    //   console.log("yes")
    //   wow = "Minimum 6 characaters required";
    // }
    // else if(  !password.test(email) ){
    //     wow = "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number ";
    //   }
    // return wow;
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Phone: ${this.state.phone_number}
        Password: ${this.state.password}
        Password2: ${this.state.password2}

      `);
    } else {     
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
        
        let errorMessage = this.email(value);
        console.log(errorMessage+" return de funcion");
        formErrors.password = errorMessage;
        break;
      case "password2":
        let errorMessages = this.email(value);
        console.log(errorMessages+" return de funcion");
        formErrors.password2 = errorMessages;

        formErrors.password2 = !this.equal() ? "Passwords must be the same" : "";

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
