import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BrandLogo = () => {
  return (
    <a
      href="/"
      className="relative flex h-12 w-12 items-center justify-center cursor-pointer"
      aria-label="Go to Home"
    >
      {/* Soft glow */}
      <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />

      {/* Logo container */}
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-500/25">
        <svg
          viewBox="0 0 48 48"
          className="h-8 w-8 text-white"
          fill="none"
        >
          {/* Elegant S / leaf mark */}
          <path
            d="M31.8 12.2C29.8 10.7 27.2 10 24.4 10
            C18.5 10 14.5 13.1 14.5 17.4
            C14.5 21.2 17.3 23.1 23.2 24.5
            C29.2 25.9 32.5 27.7 32.5 31.9
            C32.5 36.4 28.3 39 22.8 39
            C19.2 39 15.9 37.8 13.5 35.6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M30.7 15.1C34.2 13.7 37.1 11.2 38.7 8
            C34.2 8.3 30.5 10.1 27.7 13.2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M17.2 32.9C14.1 34.1 11.3 36.4 9.6 39.4
            C13.8 39.2 17.3 37.6 20 34.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>
    </a>
  );
};

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5"
  >
    <rect
      x="3.5"
      y="5"
      width="17"
      height="14"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="m5.5 7.5 6.5 5 6.5-5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5"
  >
    <rect
      x="4"
      y="10"
      width="16"
      height="10"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M8 10V7.5a4 4 0 0 1 8 0V10"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="15"
      r="1.2"
      fill="currentColor"
    />
  </svg>
);

const EyeIcon = ({ hidden = false }) => {
  if (hidden) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M3 3l18 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M9.8 5.2A10.7 10.7 0 0 1 12 5
          c5.2 0 8.8 7 8.8 7
          s-1.2 2.5-3.6 4.4
          M6.5 6.5C4.2 8.2 3.2 12 3.2 12
          s3.6 7 8.8 7c1.4 0 2.7-.4 3.8-1.1"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
};

const Sparkle = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="m12 2 1.4 5.6L19 9l-5.6 1.4L12 16l-1.4-5.6L5 9l5.6-1.4L12 2Z"
      fill="currentColor"
    />
    <path
      d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"
      fill="currentColor"
      opacity="0.65"
    />
  </svg>
);

const AdminLogin = () => {

  useEffect(() => {
  document.title = "Admin Login | Spa & Salon Management System";
}, []);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf9ff] text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-purple-200/50 blur-3xl" />

        <div className="absolute left-[8%] top-[20%] h-2 w-2 rounded-full bg-violet-400" />
        <div className="absolute right-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-purple-400" />
        <div className="absolute bottom-[20%] left-[15%] h-1.5 w-1.5 rounded-full bg-violet-300" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-6">
        <div className="w-full max-w-[1080px]">
          <div className="grid overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-[0_25px_80px_rgba(91,33,182,0.12)] lg:grid-cols-[1.05fr_0.95fr]">

            {/* Left branding panel */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 p-10 text-white lg:flex lg:min-h-[680px] lg:flex-col lg:justify-between">
              
              {/* Decorative circles */}
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
              <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/5" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur-md">
                    <svg
                      viewBox="0 0 48 48"
                      className="h-8 w-8"
                      fill="none"
                    >
                      <path
                        d="M31.8 12.2C29.8 10.7 27.2 10 24.4 10
                        C18.5 10 14.5 13.1 14.5 17.4
                        C14.5 21.2 17.3 23.1 23.2 24.5
                        C29.2 25.9 32.5 27.7 32.5 31.9
                        C32.5 36.4 28.3 39 22.8 39
                        C19.2 39 15.9 37.8 13.5 35.6"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M30.7 15.1C34.2 13.7 37.1 11.2 38.7 8
                        C34.2 8.3 30.5 10.1 27.7 13.2"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-lg font-semibold tracking-tight">
                      Salon<span className="text-violet-200">&</span>Spa
                    </p>
                    <p className="mt-0.5 text-[9px] font-medium tracking-[4px] text-violet-200">
                      MANAGEMENT
                    </p>
                  </div>
                </div>

                <div className="mt-24 max-w-md">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-md">
                    <Sparkle className="h-3.5 w-3.5" />
                    Premium Management System
                  </div>

                  <h2 className="text-4xl font-semibold leading-[1.12] tracking-tight xl:text-5xl">
                    Manage your
                    <span className="block text-violet-200">
                      beauty business
                    </span>
                    with ease.
                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-7 text-violet-100/80">
                    Keep appointments, services, staff and business
                    performance organized from one beautiful dashboard.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xl font-semibold">24/7</p>
                    <p className="mt-1 text-[10px] text-violet-100/70">
                      ACCESS
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xl font-semibold">100%</p>
                    <p className="mt-1 text-[10px] text-violet-100/70">
                      CONTROL
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xl font-semibold">Secure</p>
                    <p className="mt-1 text-[10px] text-violet-100/70">
                      SYSTEM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right login */}
            <div className="flex min-h-[680px] items-center justify-center p-6 sm:p-10 lg:p-14">
              <div className="w-full max-w-[410px]">

                {/* Mobile logo */}
                <div className="mb-10 flex items-center gap-3 lg:hidden">
                  <BrandLogo />

                  <div>
                    <p className="text-lg font-bold tracking-tight text-slate-900">
                      Salon<span className="text-violet-600">&</span>Spa
                    </p>
                    <p className="text-[9px] font-semibold tracking-[3px] text-slate-400">
                      MANAGEMENT
                    </p>
                  </div>
                </div>

                {/* Heading */}
                <div className="mb-9">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                    <LockIcon />
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[2px] text-violet-600">
                    Administrator
                  </p>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[36px]">
                    Welcome back
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Sign in to manage your salon and keep everything running
                    smoothly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2.5 block text-xs font-semibold text-slate-700"
                    >
                      Email address
                    </label>

                    <div className="group relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-600">
                        <MailIcon />
                      </div>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="admin@salonspa.com"
                        autoComplete="email"
                        required
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-xs font-semibold text-slate-700"
                      >
                        Password
                      </label>
                    </div>

                    <div className="group relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-600">
                        <LockIcon />
                      </div>

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-12 pr-14 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-violet-50 hover:text-violet-600"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        <EyeIcon hidden={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm text-red-600">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">
                        !
                      </div>
                      <p className="leading-5">{error}</p>
                    </div>
                  )}

                  {/* Login button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-2 flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-700 hover:to-purple-700 hover:shadow-xl hover:shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to dashboard
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path
                            d="M5 12h13M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Security */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        d="m6 12 4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  Secure administrator access
                </div>

                <p className="mt-10 text-center text-[11px] text-slate-400">
                  © {new Date().getFullYear()} Salon & Spa Management
                </p>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <p className="mt-5 text-center text-[11px] text-slate-400">
            Designed for modern salon & spa businesses
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;