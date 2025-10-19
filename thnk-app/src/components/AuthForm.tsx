import React from "react";

function AuthForm() {
  return (
    <form action="">
      <div className="space-y-12 form-descript">
        <h1 className="form-title">LOGIN</h1>
        <p className="form-desript">Login to your THNK account</p>
      </div>
      <div className="form-content space-y-12">
        <div className="form-input-cont">
          <label htmlFor="email" className="custom-label text-white">
            Email Address
          </label>
          <input
            className="input validator"
            type="email"
            id="email"
            name="email"
            required
            placeholder="mail@site.com"
          />
        </div>
        <div className="form-input-cont">
          <label htmlFor="password" className="custom-label text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input validator"
            required
            placeholder="Password"
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
          <p className="validator-hint">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
