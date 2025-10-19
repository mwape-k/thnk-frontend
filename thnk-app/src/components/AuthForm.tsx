import "../components/component-styles/styles-form.css";
import CustomBtn from "./CustomBtn";

function AuthForm() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md p-6 rounded-lg shadow-lg text-white">
        <div className="space-y-20">
          <div className="text-center">
            <h1 className="text-8xl font-bold">LOGIN</h1>
            <p className="text-gray-400">Login to your THNK account</p>
          </div>

          <div className="form-container space-y-12">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email Address
              </label>
              <input
                className="input-auth w-full p-2 rounded  text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                type="email"
                id="email"
                name="email"
                required
                placeholder="mail@site.com"
              />
            </div>

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
          </div>

          <div className="form-submit space-x-6 w-full flex justify-center">
            <CustomBtn
              className="login-signup-btn"
              type="submit"
              size="full"
              text="LOGIN"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
