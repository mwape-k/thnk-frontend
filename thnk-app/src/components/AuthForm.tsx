import { useState } from "react";
import "../components/component-styles/styles-form.css";
import CustomBtn from "./CustomBtn";
import ButtonGroup from "./ButtonGroup";
import { signUp, signIn } from "../services/authService"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function AuthForm() {
  const [authMode, setAuthMode] = useState<"A" | "B">("A");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = authMode === "A";

  const navigate = useNavigate();

  const handleAuthModeChange = (selected: "A" | "B") => {
    setAuthMode(selected);
    setError(""); // Clear error when switching modes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login logic
        await signIn(formData.email, formData.password);
        console.log("Login successful!");

        navigate("/");
      } else {
        // Sign up logic
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        // Validate password strength (optional - Firebase has its own rules)
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          throw new Error(
            "Password must be at least 8 characters with uppercase, lowercase, and number"
          );
        }

        await signUp(formData.email, formData.password);
        console.log("Sign up successful!");
        navigate("/");

        //Clear form after successful signup
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-lg shadow-lg text-white"
      >
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

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
                    value={formData.firstName}
                    onChange={handleInputChange}
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
                    value={formData.lastName}
                    onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
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
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
              text={loading ? "..." : isLogin ? "LOGIN" : "SIGN UP"}
              Disabled={loading}
            />
          </div>
        </div>

        {/* Button Group for Login/Sign Up */}
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
