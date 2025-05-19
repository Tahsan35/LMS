import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { GoogleSvg } from "./GoogleSvg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, authError, loginWithGoogle } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    setIsLoading(true);

    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      {authError && (
        <p className="text-blue-500 text-center mb-4">{authError}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-5 py-2 rounded-full! custom-btn  disabled:bg-blue-400"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Google provider */}
      <div className="mt-4 flex items-center justify-center">
        <div className="border-t border-gray-300 flex-grow mr-3"></div>
        <span className="text-gray-500 text-sm">OR</span>
        <div className="border-t border-gray-300 flex-grow ml-3"></div>
      </div>

      <button
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full mt-4 flex items-center justify-center bg-white border border-gray-300 rounded-full px-5 py-2 text-gray-700 hover:bg-cyan-50 disabled:opacity-50"
      >
        <GoogleSvg />
        Continue with Google
      </button>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-950">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
