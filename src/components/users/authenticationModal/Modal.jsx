"use client"

import { useState, useEffect } from "react"
import { signupUser, loginUser, verifyOtp, resendOtp } from "../../../api/user/userApi"
import { useDispatch } from "react-redux"
import { login as loginAction } from "../../../redux/slices/userAuthSlice"
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
} from "react-icons/fi"

const AuthModal = ({ closeModal }) => {
  const [authStep, setAuthStep] = useState("login")
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" })
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [otpData, setOtpData] = useState({ email: "", otp: "" })
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [resendTimer, setResendTimer] = useState(30)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [signupErrors, setSignupErrors] = useState({})
  const [loginErrors, setLoginErrors] = useState({})
  const [otpError, setOtpError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const validateSignup = () => {
    const errors = {}
    if (!signupData.name.trim()) errors.name = "Name is required"
    else if (!/^[A-Za-z\s]+$/.test(signupData.name)) errors.name = "Name must contain only letters"
    if (!signupData.email.trim()) errors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(signupData.email)) errors.email = "Invalid email format"
    if (!signupData.password) errors.password = "Password is required"
    else if (signupData.password.length < 6) errors.password = "Password must be at least 6 characters"
    setSignupErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateLogin = () => {
    const errors = {}
    if (!loginData.email.trim()) errors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) errors.email = "Invalid email"
    if (!loginData.password) errors.password = "Password is required"
    setLoginErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    setErrorMsg("")
    setSuccessMsg("")
  }, [authStep])

  useEffect(() => {
    let timer
    if (authStep === "otp" && isResendDisabled && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendTimer, isResendDisabled, authStep])

  useEffect(() => {
    if (resendTimer === 0) {
      setIsResendDisabled(false)
    }
  }, [resendTimer])

  const handleResendOtp = async () => {
    try {
      setIsLoading(true)
      await resendOtp({ email: otpData.email })
      setSuccessMsg("OTP resent to your email.")
      setResendTimer(30)
      setIsResendDisabled(true)
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Resend failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async () => {
    if (!validateSignup()) return
    try {
      setIsLoading(true)
      await signupUser(signupData)
      setOtpData({ email: signupData.email, otp: "" })
      setAuthStep("otp")
      setSuccessMsg("OTP sent to your email.")
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otpData.otp) {
      setOtpError("OTP is required")
      return
    }
    try {
      setIsLoading(true)
      await verifyOtp(otpData)
      setAuthStep("login")
      setOtpData({ email: "", otp: "" })
      setSignupData({ name: "", email: "", password: "" })
      setSuccessMsg("Email verified! You can now log in.")
      setOtpError("")
    } catch (err) {
      setOtpError(err?.response?.data?.message || "OTP verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!validateLogin()) return
    try {
      setIsLoading(true)
      const res = await loginUser(loginData)
      const { user, token } = res.data
      dispatch(loginAction({ user, token }))
      localStorage.setItem("auth", JSON.stringify({ user, token }))
      setSuccessMsg("Login successful!")
      setTimeout(() => closeModal(), 1000)
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const renderMessage = () => {
    if (errorMsg) {
      return (
        <div className="backdrop-blur-md bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
          <FiAlertCircle className="text-red-400 text-lg flex-shrink-0" />
          <span className="text-red-200 text-sm font-medium">{errorMsg}</span>
        </div>
      )
    }
    if (successMsg) {
      return (
        <div className="backdrop-blur-md bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
          <FiCheckCircle className="text-green-400 text-lg flex-shrink-0" />
          <span className="text-green-200 text-sm font-medium">{successMsg}</span>
        </div>
      )
    }
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Advanced Backdrop */}
      <div className="absolute inset-0">
        {/* Base backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xl"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 animate-pulse"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-orange-400/60 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-300/40 rounded-full animate-ping delay-500"></div>

        {/* Click to close */}
        <div className="absolute inset-0 cursor-pointer" onClick={closeModal}></div>
      </div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md sm:max-w-lg transform transition-all duration-500 ease-out">
        {/* Floating Background Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-l from-orange-500/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Ultra Modern Glass Modal */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-orange-500/20 p-[1px]">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-black/40 via-black/30 to-black/40"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10">
            {/* Modern Header */}
            <div className="px-6 sm:px-8 py-6 border-b border-white/10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    {authStep === "login" && <FiShield className="text-yellow-400 text-xl" />}
                    {authStep === "signup" && <FiUser className="text-yellow-400 text-xl" />}
                    {authStep === "otp" && <FiMail className="text-yellow-400 text-xl" />}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {authStep === "login" && "Welcome Back"}
                      {authStep === "signup" && "Join Us Today"}
                      {authStep === "otp" && "Almost There"}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {authStep === "login" && "Sign in to your account"}
                      {authStep === "signup" && "Create your new account"}
                      {authStep === "otp" && "Verify your identity"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2">
                <div
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    authStep === "login" || authStep === "signup"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-white/20"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    authStep === "signup" ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-white/20"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    authStep === "otp" ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-white/20"
                  }`}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              {renderMessage()}

              {/* Login Form */}
              {authStep === "login" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FiMail className="text-yellow-400" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => {
                            setLoginData({ ...loginData, email: e.target.value })
                            if (loginErrors.email) validateLogin()
                          }}
                          className={`w-full px-4 py-4 backdrop-blur-md bg-white/10 border rounded-2xl focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 group-hover:border-white/30 ${
                            loginErrors.email ? "border-red-500/50" : "border-white/20"
                          }`}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {loginErrors.email && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                          <FiAlertCircle size={14} />
                          {loginErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FiLock className="text-yellow-400" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => {
                            setLoginData({ ...loginData, password: e.target.value })
                            if (loginErrors.password) validateLogin()
                          }}
                          className={`w-full px-4 py-4 pr-12 backdrop-blur-md bg-white/10 border rounded-2xl focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 group-hover:border-white/30 ${
                            loginErrors.password ? "border-red-500/50" : "border-white/20"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {loginErrors.password && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                          <FiAlertCircle size={14} />
                          {loginErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing you in...</span>
                      </div>
                    ) : (
                      <>
                        <FiShield size={20} />
                        <span>Sign In Securely</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setAuthStep("signup")}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-200 relative group"
                    >
                      <span className="relative z-10">Don't have an account? Join us today</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Signup Form */}
              {authStep === "signup" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FiUser className="text-yellow-400" />
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={signupData.name}
                          onChange={(e) => {
                            setSignupData({ ...signupData, name: e.target.value })
                            if (signupErrors.name) validateSignup()
                          }}
                          className={`w-full px-4 py-4 backdrop-blur-md bg-white/10 border rounded-2xl focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 group-hover:border-white/30 ${
                            signupErrors.name ? "border-red-500/50" : "border-white/20"
                          }`}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {signupErrors.name && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                          <FiAlertCircle size={14} />
                          {signupErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FiMail className="text-yellow-400" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={(e) => {
                            setSignupData({ ...signupData, email: e.target.value })
                            if (signupErrors.email) validateSignup()
                          }}
                          className={`w-full px-4 py-4 backdrop-blur-md bg-white/10 border rounded-2xl focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 group-hover:border-white/30 ${
                            signupErrors.email ? "border-red-500/50" : "border-white/20"
                          }`}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {signupErrors.email && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                          <FiAlertCircle size={14} />
                          {signupErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FiLock className="text-yellow-400" />
                        Create Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={signupData.password}
                          onChange={(e) => {
                            setSignupData({ ...signupData, password: e.target.value })
                            if (signupErrors.password) validateSignup()
                          }}
                          className={`w-full px-4 py-4 pr-12 backdrop-blur-md bg-white/10 border rounded-2xl focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 group-hover:border-white/30 ${
                            signupErrors.password ? "border-red-500/50" : "border-white/20"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {signupErrors.password && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                          <FiAlertCircle size={14} />
                          {signupErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating your account...</span>
                      </div>
                    ) : (
                      <>
                        <FiUser size={20} />
                        <span>Create Account</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setAuthStep("login")}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-200 relative group"
                    >
                      <span className="relative z-10">Already have an account? Sign in</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Verification */}
              {authStep === "otp" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                      <FiMail className="text-yellow-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We've sent a 6-digit verification code to
                      <br />
                      <span className="text-yellow-400 font-semibold">{otpData.email}</span>
                    </p>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-white mb-4 text-center">
                      Enter Verification Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="000000"
                        value={otpData.otp}
                        onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })}
                        maxLength="6"
                        className={`w-full px-6 py-5 backdrop-blur-md bg-white/10 border rounded-2xl focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-center text-2xl tracking-[0.5em] font-mono group-hover:border-white/30 ${
                          otpError ? "border-red-500/50" : "border-white/20"
                        }`}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {otpError && (
                      <p className="text-red-400 text-sm mt-2 flex items-center justify-center gap-2">
                        <FiAlertCircle size={14} />
                        {otpError}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying code...</span>
                      </div>
                    ) : (
                      <>
                        <FiCheck size={20} />
                        <span>Verify & Continue</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    {isResendDisabled ? (
                      <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                        <FiClock size={14} />
                        <span>Resend in {resendTimer}s</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-200 relative group disabled:opacity-50"
                      >
                        <span className="relative z-10">Didn't receive the code? Resend</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Security Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-gradient-to-r from-black/20 to-black/10">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <FiShield className="text-yellow-400" />
                <span>Secured with enterprise-grade encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
