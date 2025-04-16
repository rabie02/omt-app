import React , { useState } from 'react';
import { Link } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const handleRegistration = async () => {
    try {
      const response = await fetch('https://localhost:44328/Registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          telephone: telephone,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        alert(result);
      } else {
        const result = await response.text();
      }
    } catch (error) {
      alert('An error occurred during registration: ' + error.message);
    }
  };
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-outline-primary ms-2"
        data-bs-toggle="modal"
        data-bs-target="#signupModal"
      >
        <span className="fa fa-user-plus me-1"></span> Register
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="signupModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Inscription
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Social login buttons */}
              <button className="btn btn-primary w-100 mb-4">
                <span className="fa fa-google me-2"></span> Sign up With Google
              </button>
              <button className="btn btn-primary w-100 mb-4">
                <span className="fa fa-facebook me-2"></span> Sign up With Facebook
              </button>

              {/* Registration form */}
              <form>
                {/* Username input */}
                <div className="mb-3">
                  <label htmlFor="exampleInput" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                 {/* Last Name input */}
                 <div className="mb-3">
                  <label htmlFor="exampleInputLastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputLastName"
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                {/* Email input */}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>

               

                {/* Telephone input */}
                <div className="mb-3">
                  <label htmlFor="exampleInputTelephone" className="form-label">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="exampleInputTelephone"
                    value={telephone} onChange={(e) => setTelephone(e.target.value)} 
                  />
                </div>

                {/* Password input */}
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Checkbox */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                  {/* Link to the login page */}
              <p className="mt-3">
                Already have an account?{" "}
                 <Link to="/Login" data-bs-dismiss="modal">
                  Login here
                </Link>
              </p>

                {/* Register button */}
                <button
                  type="submit"
                  className="btn btn-outline-primary w-100 mt-5" onClick={handleRegistration}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;