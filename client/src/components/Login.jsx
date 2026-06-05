import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("user");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const payload = state === "login" ? { email, password } : { name, email, password, role };
      const { data } = await axios.post(`/api/user/${state}`, payload);
      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
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
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-md flex justify-center p-4 md:p-6 items-start"
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
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                GEARSHIFT
              </span>
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
          {/* Close button */}
          <button 
            onClick={() => setShowLogin(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-30 cursor-pointer"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
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

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-2 w-full">
              <button 
                type="button" 
                className="w-full py-2.5 px-4 border border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{state === "register" ? "Sign up" : "Sign in"} with Google</span>
              </button>
              <button 
                type="button" 
                className="w-full py-2.5 px-4 bg-black text-white hover:bg-slate-900 rounded-xl flex items-center justify-center gap-3 text-sm font-medium active:scale-[0.99] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.02 0-1.4-.61-2.53-.61-1.13 0-1.56.61-2.54.61-1.02 0-2.18-1.01-3.18-1.92-2.02-1.91-3.56-5.38-3.56-8.62 0-5.07 3.3-7.75 6.45-7.75 1.05 0 2.03.65 2.68.65.64 0 1.76-.79 3.01-.79 1.3 0 2.47.53 3.23 1.54-2.73 1.65-2.28 5.23.49 6.35-1.04 2.52-2.43 4.96-3.53 5.86zm-2.16-15.65c.57-.69.95-1.66.84-2.63-.83.03-1.84.55-2.44 1.25-.51.59-.96 1.57-.84 2.51.93.07 1.87-.44 2.44-1.13z" />
                </svg>
                <span>{state === "register" ? "Sign up" : "Sign in"} with Apple</span>
              </button>
            </div>

            {/* Toggle State Footer */}
            <div className="text-center pt-2">
              {state === "register" ? (
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("login")}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline transition-all"
                  >
                    Sign in
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setState("register")}
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
