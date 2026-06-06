import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Login = ({ defaultState = "login" }) => {
  const { setShowLogin, axios, setToken, navigate, loginMode } = useAppContext();
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    setState(defaultState);
  }, [defaultState]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [phone, setPhone] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bio, setBio] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const payload =
        state === "login"
          ? { email, password }
          : {
              name,
              email,
              password,
              role,
              ...(role === "owner" && { phone, businessName, location, bio }),
            };
      const { data } = await axios.post(`/api/user/${state === "login" ? "login" : "register"}`, payload);
      if (data.success) {
        if (data.pendingApproval) {
          toast.success(data.message);
          navigate("/login");
          return;
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
          axios.defaults.headers.common["Authorization"] = `${data.token}`;
          setToken(data.token);
          setShowLogin(false);
          const roleRes = await axios.get("/api/user/data");
          if (roleRes.data.success && roleRes.data.user.role === "head_admin") {
            navigate("/admin");
          } else if (
            roleRes.data.success &&
            roleRes.data.user.role === "owner" &&
            roleRes.data.user.approvalStatus === "approved"
          ) {
            navigate("/owner");
          } else {
            navigate("/");
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex justify-center py-24 px-4 md:px-6 items-center"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl bg-white rounded-[24px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-max md:min-h-[600px] border border-gray-100"
      >
        {/* Left Panel - Image and taglines */}
        <div className="hidden md:flex md:col-span-5 relative flex-col justify-between p-10 text-white bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/sports.jpg" 
              alt="Luxury Sports Car" 
              className="w-full h-full object-cover object-center opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-slate-950/70 to-slate-950/90 z-10" />
          </div>

          <div className="relative z-20 flex flex-col justify-between h-full">
            {/* Brand/Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                GEARSHIFT
              </Link>
            </div>

            {/* Content Text */}
            <div className="space-y-4 mb-8">
              <h3 className="text-3xl font-extrabold leading-tight tracking-tight">
                Rent Your <span className="text-blue-400">Dream Ride</span> In Seconds.
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Explore premium vehicles, unlock elite member perks, and get on the road with unmatched ease and style.
              </p>

              {/* Bullet points */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400">✓</span>
                  <span>100+ Premium Sports & Luxury Cars</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400">✓</span>
                  <span>Flexible Daily & Weekly Packages</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400">✓</span>
                  <span>24/7 Roadside Premium Assistance</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} GearShift. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center p-8 sm:p-12 relative bg-white">
          <button 
            onClick={() => navigate("/")}
            className="absolute top-6 right-6 md:right-auto md:left-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                {state === "register" ? "Create your Account" : "Welcome Back"}
              </h2>
              <p className="text-sm text-gray-500">
                {state === "register" 
                  ? "Rent or list your cars with GearShift today" 
                  : "Sign in to access your garage and bookings"}
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-4">
              {state === "register" && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">I want to:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label 
                        className={`flex items-center justify-center gap-2 p-2.5 border rounded-xl cursor-pointer text-sm font-medium transition-all ${
                          role === "user" 
                            ? "border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600 font-semibold" 
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="role" 
                          value="user" 
                          checked={role === "user"} 
                          onChange={(e) => setRole(e.target.value)} 
                          className="sr-only" 
                        />
                        Rent Cars
                      </label>
                      <label 
                        className={`flex items-center justify-center gap-2 p-2.5 border rounded-xl cursor-pointer text-sm font-medium transition-all ${
                          role === "owner" 
                            ? "border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600 font-semibold" 
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="role" 
                          value="owner" 
                          checked={role === "owner"} 
                          onChange={(e) => setRole(e.target.value)} 
                          className="sr-only" 
                        />
                        List Cars
                      </label>
                    </div>
                  </div>

                  {role === "owner" && (
                    <div className="space-y-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                      <p className="text-xs text-blue-700 font-medium">
                        Complete your profile for Head Admin review. You can log in after approval.
                      </p>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                        <input
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          placeholder="+1 555 123 4567"
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                          type="tel"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Business / Company Name</label>
                        <input
                          onChange={(e) => setBusinessName(e.target.value)}
                          value={businessName}
                          placeholder="Your car rental business"
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                          type="text"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location / City</label>
                        <input
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                          placeholder="New York, NY"
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                          type="text"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">About You</label>
                        <textarea
                          onChange={(e) => setBio(e.target.value)}
                          value={bio}
                          placeholder="Tell us about your experience listing cars..."
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all resize-none"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                  type="email"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                  type="password"
                  required
                />
              </div>

              {state === "register" && (
                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-500 select-none">
                    <input 
                      type="checkbox" 
                      required 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer accent-blue-600" 
                    />
                    <span>I accept the <span className="underline hover:text-blue-600 transition-colors font-medium">Terms & Conditions</span></span>
                  </label>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer mt-4"
              >
                <span>{state === "register" ? "Join us" : "Sign in"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>



            {/* Toggle State Footer */}
            <div className="text-center pt-2">
              {state === "register" ? (
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline transition-all"
                  >
                    Sign in
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline transition-all"
                  >
                    Sign up
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
