"use client";

import { useState, useEffect } from "react";
import {
  signupUser,
  loginUser,
  verifyOtp,
  resendOtp,
} from "../../../api/user/userApi";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../../redux/slices/userAuthSlice";
import {
  FiX,
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiShield,
  FiCheck,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiZap,
} from "react-icons/fi";

const AuthModal = ({ closeModal }) => {
  const [authStep, setAuthStep] = useState("login");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [otpData, setOtpData] = useState({ email: "", otp: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [signupErrors, setSignupErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const validateSignup = () => {
    const errors = {};
    if (!signupData.name.trim()) errors.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(signupData.name))
      errors.name = "Name must contain only letters";
    if (!signupData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(signupData.email))
      errors.email = "Invalid email format";
    if (!signupData.password) errors.password = "Password is required";
    else if (signupData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateLogin = () => {
    const errors = {};
    if (!loginData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(loginData.email))
      errors.email = "Invalid email";
    if (!loginData.password) errors.password = "Password is required";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, [authStep]);

  useEffect(() => {
    let timer;
    if (authStep === "otp" && isResendDisabled && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, isResendDisabled, authStep]);

  useEffect(() => {
    if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      await resendOtp({ email: otpData.email });
      setSuccessMsg("OTP resent to your email.");
      setResendTimer(30);
      setIsResendDisabled(true);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Resend failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;
    try {
      setIsLoading(true);
      await signupUser(signupData);
      setOtpData({ email: signupData.email, otp: "" });
      setAuthStep("otp");
      setSuccessMsg("OTP sent to your email.");
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpData.otp) {
      setOtpError("OTP is required");
      return;
    }
    try {
      setIsLoading(true);
      await verifyOtp(otpData);
      setAuthStep("login");
      setOtpData({ email: "", otp: "" });
      setSignupData({ name: "", email: "", password: "" });
      setSuccessMsg("Email verified! You can now log in.");
      setOtpError("");
    } catch (err) {
      setOtpError(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    try {
      setIsLoading(true);
      const res = await loginUser(loginData);
      const { user, token } = res.data;
      console.log("res.data", res.data);

      dispatch(loginAction({ user, token }));
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: res.data.token,
          user: res.data.user,
        })
      );
      setSuccessMsg("Login successful!");
      setTimeout(() => closeModal(), 1000);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = () => {
    if (errorMsg) {
      return (
        <div className="backdrop-blur-md bg-red-500/20 border border-red-500/40 rounded-xl p-3 mb-4 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <FiAlertCircle className="text-red-400 text-sm flex-shrink-0" />
          <span className="text-red-200 text-xs font-medium">{errorMsg}</span>
        </div>
      );
    }
    if (successMsg) {
      return (
        <div className="backdrop-blur-md bg-green-500/20 border border-green-500/40 rounded-xl p-3 mb-4 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <FiCheckCircle className="text-green-400 text-sm flex-shrink-0" />
          <span className="text-green-200 text-xs font-medium">
            {successMsg}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3">
      {/* Ultra Modern Backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/8 via-transparent to-orange-500/8"></div>

        {/* Floating micro particles */}
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-yellow-400/80 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-orange-400/80 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-yellow-300/60 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-orange-300/60 rounded-full animate-ping delay-1000"></div>

        <div
          className="absolute inset-0 cursor-pointer"
          onClick={closeModal}
        ></div>
      </div>

      {/* Ultra Compact Modal Container */}
      <div className="relative w-full max-w-xs sm:max-w-sm transform transition-all duration-700 ease-out">
        {/* Compact floating orbs */}
        <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-l from-orange-500/20 to-yellow-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

        {/* Micro Glass Modal */}
        <div className="relative backdrop-blur-3xl bg-gradient-to-br from-white/25 via-white/15 to-white/10 rounded-2xl border border-white/40 shadow-2xl overflow-hidden">
          {/* Animated micro border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/40 via-transparent to-orange-500/40 p-[1px] animate-pulse">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
          </div>

          <div className="relative z-10">
            {/* Ultra Compact Header */}
            <div className="px-4 py-3 border-b border-white/20">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/40">
                    {authStep === "login" && (
                      <FiShield className="text-yellow-400 text-sm" />
                    )}
                    {authStep === "signup" && (
                      <FiUser className="text-yellow-400 text-sm" />
                    )}
                    {authStep === "otp" && (
                      <FiMail className="text-yellow-400 text-sm" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {authStep === "login" && "Welcome Back"}
                      {authStep === "signup" && "Join Us"}
                      {authStep === "otp" && "Verify"}
                    </h2>
                    <p className="text-gray-400 text-xs">
                      {authStep === "login" && "Sign in to continue"}
                      {authStep === "signup" && "Create account"}
                      {authStep === "otp" && "Check your email"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <FiX size={14} />
                </button>
              </div>

              {/* Micro Progress Steps */}
              <div className="flex items-center gap-1">
                <div
                  className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                    authStep === "login" || authStep === "signup"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-white/30"
                  }`}
                ></div>
                <div
                  className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                    authStep === "signup"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-white/30"
                  }`}
                ></div>
                <div
                  className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                    authStep === "otp"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-white/30"
                  }`}
                ></div>
              </div>
            </div>

            {/* Ultra Compact Form Content */}
            <div className="p-4">
              {renderMessage()}

              {/* Compact Login Form */}
              {authStep === "login" && (
                <div className="space-y-3">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                        <FiMail className="text-yellow-400 text-xs" />
                        Email
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          placeholder="Enter email"
                          value={loginData.email}
                          onChange={(e) => {
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            });
                            if (loginErrors.email) validateLogin();
                          }}
                          className={`w-full px-3 py-2.5 backdrop-blur-md bg-white/15 border rounded-lg focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs ${
                            loginErrors.email
                              ? "border-red-500/50"
                              : "border-white/30"
                          }`}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {loginErrors.email && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle size={10} />
                          {loginErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                        <FiLock className="text-yellow-400 text-xs" />
                        Password
                      </label>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={loginData.password}
                          onChange={(e) => {
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            });
                            if (loginErrors.password) validateLogin();
                          }}
                          className={`w-full px-3 py-2.5 pr-10 backdrop-blur-md bg-white/15 border rounded-lg focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs ${
                            loginErrors.password
                              ? "border-red-500/50"
                              : "border-white/30"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <FiEyeOff size={14} />
                          ) : (
                            <FiEye size={14} />
                          )}
                        </button>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {loginErrors.password && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle size={10} />
                          {loginErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 relative overflow-hidden group text-xs"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <>
                        <FiShield size={14} />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setAuthStep("signup")}
                      className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors duration-200 relative group"
                    >
                      <span className="relative z-10">
                        Don't have an account? Join us
                      </span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Compact Signup Form */}
              {authStep === "signup" && (
                <div className="space-y-3">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                        <FiUser className="text-yellow-400 text-xs" />
                        Name
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          placeholder="Full name"
                          value={signupData.name}
                          onChange={(e) => {
                            setSignupData({
                              ...signupData,
                              name: e.target.value,
                            });
                            if (signupErrors.name) validateSignup();
                          }}
                          className={`w-full px-3 py-2.5 backdrop-blur-md bg-white/15 border rounded-lg focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs ${
                            signupErrors.name
                              ? "border-red-500/50"
                              : "border-white/30"
                          }`}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {signupErrors.name && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle size={10} />
                          {signupErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                        <FiMail className="text-yellow-400 text-xs" />
                        Email
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          placeholder="Email address"
                          value={signupData.email}
                          onChange={(e) => {
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            });
                            if (signupErrors.email) validateSignup();
                          }}
                          className={`w-full px-3 py-2.5 backdrop-blur-md bg-white/15 border rounded-lg focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs ${
                            signupErrors.email
                              ? "border-red-500/50"
                              : "border-white/30"
                          }`}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {signupErrors.email && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle size={10} />
                          {signupErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                        <FiLock className="text-yellow-400 text-xs" />
                        Password
                      </label>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          value={signupData.password}
                          onChange={(e) => {
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            });
                            if (signupErrors.password) validateSignup();
                          }}
                          className={`w-full px-3 py-2.5 pr-10 backdrop-blur-md bg-white/15 border rounded-lg focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs ${
                            signupErrors.password
                              ? "border-red-500/50"
                              : "border-white/30"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <FiEyeOff size={14} />
                          ) : (
                            <FiEye size={14} />
                          )}
                        </button>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {signupErrors.password && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle size={10} />
                          {signupErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 relative overflow-hidden group text-xs"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <>
                        <FiUser size={14} />
                        <span>Create Account</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setAuthStep("login")}
                      className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors duration-200 relative group"
                    >
                      <span className="relative z-10">
                        Already have an account? Sign in
                      </span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Compact OTP Verification */}
              {authStep === "otp" && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
                      <FiMail className="text-yellow-400 text-lg" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      Check Email
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Code sent to
                      <br />
                      <span className="text-yellow-400 font-semibold">
                        {otpData.email}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-2 text-center">
                      Verification Code
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="000000"
                        value={otpData.otp}
                        onChange={(e) =>
                          setOtpData({ ...otpData, otp: e.target.value })
                        }
                        maxLength="6"
                        className={`w-full px-4 py-3 backdrop-blur-md bg-white/15 border rounded-lg focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-center text-lg tracking-[0.3em] font-mono ${
                          otpError ? "border-red-500/50" : "border-white/30"
                        }`}
                      />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {otpError && (
                      <p className="text-red-400 text-xs mt-1 flex items-center justify-center gap-1">
                        <FiAlertCircle size={10} />
                        {otpError}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 relative overflow-hidden group text-xs"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <FiCheck size={14} />
                        <span>Verify</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    {isResendDisabled ? (
                      <div className="flex items-center justify-center gap-1 text-gray-400 text-xs">
                        <FiClock size={12} />
                        <span>Resend in {resendTimer}s</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors duration-200 relative group disabled:opacity-50"
                      >
                        <span className="relative z-10">Resend code</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Micro Security Footer */}
            <div className="px-4 py-2 border-t border-white/20 bg-gradient-to-r from-black/30 to-black/20">
              <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                <FiZap className="text-yellow-400 text-xs" />
                <span>Secure & Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
