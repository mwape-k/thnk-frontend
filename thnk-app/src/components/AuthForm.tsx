import { useState } from "react";
import "../components/component-styles/styles-form.css";
import CustomBtn from "./CustomBtn";
import ButtonGroup from "./ButtonGroup";

function AuthForm() {
  const [authMode, setAuthMode] = useState<"A" | "B">("A");
  const isLogin = authMode === "A";

  const handleAuthModeChange = (selected: "A" | "B") => {
    setAuthMode(selected);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md p-6 rounded-lg shadow-lg text-white">
        <div className="space-y-12">
          {/* Form Header */}
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-2">
              {isLogin ? "LOGIN" : "SIGN UP"}
            </h1>
            <p className="text-gray-400">
              {isLogin
                ? "Login to your THNK account"
                : "Create your THNK account"}
            </p>
          </div>

          <div className="form-container space-y-8">
            {/* Name fields - only show for Sign Up */}
            {!isLogin && (
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block mb-2 text-sm">
                    First Name
                  </label>
                  <input
                    className="input-auth w-full p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                    type="text"
                    id="firstName"
                    name="firstName"
                    required={!isLogin}
                    placeholder="First Name"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block mb-2 text-sm">
                    Last Name
                  </label>
                  <input
                    className="input-auth w-full p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                    type="text"
                    id="lastName"
                    name="lastName"
                    required={!isLogin}
                    placeholder="Last Name"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email Address
              </label>
              <input
                className="input-auth w-full p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                type="email"
                id="email"
                name="email"
                required
                placeholder="mail@site.com"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-auth validator w-full p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
              <p className="validator-hint hidden text-xs text-gray-400 mt-2">
                Must be at least 8 characters long and include one number, one
                lowercase letter, and one uppercase letter.
              </p>
            </div>

            {/* Confirm Password - only show for Sign Up */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input-auth w-full p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required={!isLogin}
                  placeholder="Confirm Password"
                  minLength={8}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-submit space-x-6 w-full flex justify-center mt-8">
            <CustomBtn
              className="login-signup-btn"
              type="submit"
              size="full"
              text={isLogin ? "LOGIN" : "SIGN UP"}
            />
          </div>
        </div>
        {/* Button Group for Login/Sign Up - This replaces the text links */}
        <div className="flex justify-center mb-4 mt-8">
          <ButtonGroup
            btnTextA="LOGIN"
            btnTextB="SIGN UP"
            defaultSelected="A"
            onButtonChange={handleAuthModeChange}
          />
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
