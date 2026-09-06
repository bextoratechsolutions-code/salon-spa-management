import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

// ─────────────────────────────────────────────
// COUNT UP
// ─────────────────────────────────────────────
const CountUp = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;

    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(end * easeOut);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [end]);

  return (
    <>
      {Number.isInteger(end) ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </>
  );
};

// ─────────────────────────────────────────────
// BRAND LOGO
// ─────────────────────────────────────────────
const BrandLogo = ({ dark = false }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        {/* Soft glow */}
        <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />

        {/* Logo */}
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-500/25">
          <svg
            viewBox="0 0 48 48"
            className="h-8 w-8 text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
              strokeLinejoin="round"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      <div>
        <p
          className={`font-serif text-xl font-bold tracking-tight ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          Salon
          <span
            className={
              dark ? "text-violet-300" : "text-violet-600"
            }
          >
            &
          </span>
          Spa
        </p>

        <p
          className={`-mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-purple-300" : "text-purple-600"
          }`}
        >
          MANAGEMENT
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const ArrowIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const CalendarIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);

const SparklesIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="m12 3 1.4 5.1L18 10l-4.6 1.9L12 17l-1.4-5.1L6 10l4.6-1.9L12 3Z" />
    <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
    <path d="m5 14 .6 1.8L7.5 16l-1.9.7L5 18.5l-.6-1.8L2.5 16l1.9-.7L5 14Z" />
  </svg>
);

// ─────────────────────────────────────────────
// FALLBACK SERVICE IMAGES
// ─────────────────────────────────────────────
const serviceImages = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85",
];

// ─────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────
const Home = () => {
  useEffect(() => {
    document.title = "Spa & Salon Management System";
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);

  // Services
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Staff
  const [staff, setStaff] = useState([]);
  const [staffLoading, setStaffLoading] = useState(true);

  // Booking
  const [booking, setBooking] = useState({
    customerName: "",
    phone: "",
    email: "",
    service: "",
    staff: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

  // ─────────────────────────────────────────────
  // LOAD SERVICES
  // ─────────────────────────────────────────────
  useEffect(() => {
    const loadServices = async () => {
      try {
        setServicesLoading(true);

        const response = await api.get("/services");

        const data =
          response.data?.services ||
          response.data?.data ||
          response.data ||
          [];

        const normalized = Array.isArray(data) ? data : [];

        setServices(normalized);
      } catch (error) {
        console.error("Failed to load services:", error);
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };

    loadServices();
  }, []);

  // ─────────────────────────────────────────────
  // LOAD STAFF
  // ─────────────────────────────────────────────
  useEffect(() => {
    const loadStaff = async () => {
      try {
        setStaffLoading(true);

        const response = await api.get("/staff");

        const data =
          response.data?.staff ||
          response.data?.data ||
          response.data ||
          [];

        const normalized = Array.isArray(data) ? data : [];

        setStaff(normalized);
      } catch (error) {
        console.error("Failed to load staff:", error);
        setStaff([]);
      } finally {
        setStaffLoading(false);
      }
    };

    loadStaff();
  }, []);

  // ─────────────────────────────────────────────
  // ACTIVE SERVICES
  // ─────────────────────────────────────────────
  const activeServices = useMemo(() => {
    return services.filter((service) => {
      if (typeof service.isActive === "boolean") {
        return service.isActive;
      }

      if (typeof service.active === "boolean") {
        return service.active;
      }

      return true;
    });
  }, [services]);

  // ─────────────────────────────────────────────
  // ACTIVE STAFF
  // ─────────────────────────────────────────────
  const activeStaff = useMemo(() => {
    return staff.filter((member) => {
      if (typeof member.isActive === "boolean") {
        return member.isActive;
      }

      if (typeof member.active === "boolean") {
        return member.active;
      }

      return true;
    });
  }, [staff]);

  // ─────────────────────────────────────────────
  // SERVICE SELECT
  // ─────────────────────────────────────────────
  const selectService = (serviceId) => {
    setBooking((prev) => ({
      ...prev,
      service: serviceId,
    }));

    setTimeout(() => {
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ─────────────────────────────────────────────
  // BOOKING
  // ─────────────────────────────────────────────
  const handleBooking = async (e) => {
    e.preventDefault();

    setBookingMessage("");
    setBookingError("");

    if (
      !booking.customerName ||
      !booking.phone ||
      !booking.service ||
      !booking.appointmentDate ||
      !booking.appointmentTime
    ) {
      setBookingError(
        "Please fill in all required fields before requesting an appointment."
      );
      return;
    }

    try {
      setBookingLoading(true);

      await api.post("/appointments", {
        customerName: booking.customerName,
        phone: booking.phone,
        email: booking.email,
        service: booking.service,
        staff: booking.staff || null,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        notes: booking.notes,
      });

      setBookingMessage(
        "Your appointment request has been received. We'll contact you shortly."
      );

      setBooking({
        customerName: "",
        phone: "",
        email: "",
        service: "",
        staff: "",
        appointmentDate: "",
        appointmentTime: "",
        notes: "",
      });
    } catch (error) {
      console.error("Booking error:", error);

      setBookingError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#fcfbff] text-gray-900 overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <nav className="bg-white/90 backdrop-blur-xl border border-purple-100 shadow-[0_10px_40px_rgba(91,33,182,0.08)] rounded-2xl">
            <div className="h-[76px] px-5 sm:px-7 flex items-center justify-between">

              <a href="#home" className="shrink-0">
                <BrandLogo />
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                <a
                  href="#home"
                  className="text-sm font-medium text-purple-700"
                >
                  Home
                </a>

                <a
                  href="#services"
                  className="text-sm font-medium text-gray-600 hover:text-purple-700 transition"
                >
                  Services
                </a>

                <a
                  href="#about"
                  className="text-sm font-medium text-gray-600 hover:text-purple-700 transition"
                >
                  About
                </a>

                <a
                  href="#gallery"
                  className="text-sm font-medium text-gray-600 hover:text-purple-700 transition"
                >
                  Gallery
                </a>

                <a
                  href="#booking"
                  className="text-sm font-medium text-gray-600 hover:text-purple-700 transition"
                >
                  Contact
                </a>
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="#booking"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-200 hover:bg-purple-800 transition"
                >
                  Book Appointment

                  <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Mobile Button */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center"
              >
                {mobileMenu ? (
                  <span className="text-xl">×</span>
                ) : (
                  <span className="text-xl">☰</span>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
              <div className="lg:hidden border-t border-purple-100 px-5 py-5 space-y-2">
                {[
                  ["Home", "#home"],
                  ["Services", "#services"],
                  ["About", "#about"],
                  ["Gallery", "#gallery"],
                  ["Contact", "#booking"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenu(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
                  >
                    {label}
                  </a>
                ))}

                <a
                  href="#booking"
                  onClick={() => setMobileMenu(false)}
                  className="block text-center mt-3 px-4 py-3 rounded-xl bg-purple-700 text-white text-sm font-semibold"
                >
                  Book Appointment
                </a>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <main>
        <section
          id="home"
          className="relative pt-36 pb-20 lg:pt-48 lg:pb-28"
        >
          {/* Background decoration */}
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-200/30 blur-3xl rounded-full pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-200/30 blur-3xl rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">

              {/* Hero Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs sm:text-sm font-semibold mb-7">
                  <SparklesIcon className="w-4 h-4" />
                  Beauty • Wellness • Confidence
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] leading-[0.98] tracking-tight font-bold text-gray-950">
                  Beauty that

                  <span className="block text-purple-700 italic">
                    feels like you.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-base sm:text-lg leading-8 text-gray-600">
                  Discover a modern beauty experience designed around you.
                  From effortless hair styling to relaxing spa rituals, every
                  visit is a moment to feel your best.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#booking"
                    className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-purple-700 text-white font-semibold shadow-xl shadow-purple-200 hover:bg-purple-800 transition"
                  >
                    Reserve Your Visit

                    <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#services"
                    className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white border border-gray-200 text-gray-800 font-semibold hover:border-purple-200 hover:bg-purple-50 transition"
                  >
                    Explore Services
                  </a>
                </div>

                <div className="mt-10 flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
                      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=80",
                    ].map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-purple-700">
                      <span className="text-sm">★★★★★</span>

                      <span className="text-xs font-semibold text-gray-700">
                        4.9/5
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-0.5">
                      Loved by our clients
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="grid grid-cols-12 grid-rows-12 gap-3 h-[540px] sm:h-[620px]">

                  <div className="col-span-8 row-span-9 rounded-[32px] overflow-hidden shadow-2xl shadow-purple-200">
                    <img
                      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=90"
                      alt="Beauty salon"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="col-span-4 row-span-5 rounded-[28px] overflow-hidden bg-purple-100">
                    <img
                      src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=85"
                      alt="Salon styling"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="col-span-4 row-span-4 rounded-[28px] bg-purple-700 text-white p-5 sm:p-7 flex flex-col justify-between">
                    <SparklesIcon className="w-7 h-7" />

                    <div>
                      <p className="font-serif text-3xl font-bold">
                        10+
                      </p>

                      <p className="text-sm text-purple-100 mt-1">
                        Beauty & wellness services
                      </p>
                    </div>
                  </div>

                  <div className="col-span-8 row-span-3 rounded-[28px] bg-white border border-purple-100 shadow-lg p-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-purple-500 font-semibold">
                        Your time
                      </p>

                      <p className="font-serif text-xl sm:text-2xl font-bold mt-1">
                        Your beauty ritual
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-white border border-purple-100 shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Appointments Open
                    </p>

                    <p className="text-xs text-gray-500">
                      Book your next visit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TRUST STRIP
        ═══════════════════════════════════════════ */}
        <section className="border-y border-purple-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: 500,
                  suffix: "+",
                  label: "Happy Clients",
                },
                {
                  number: 10,
                  suffix: "+",
                  label: "Beauty Services",
                },
                {
                  number: 5,
                  suffix: "+",
                  label: "Expert Specialists",
                },
                {
                  number: 4.9,
                  suffix: "/5",
                  label: "Client Rating",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-8 sm:py-10 text-center ${
                    index !== 3
                      ? "lg:border-r border-purple-100"
                      : ""
                  }`}
                >
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-purple-700">
                    <CountUp
                      end={stat.number}
                      suffix={stat.suffix}
                    />
                  </p>

                  <p className="mt-1 text-xs sm:text-sm text-gray-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SERVICES
        ═══════════════════════════════════════════ */}
        <section id="services" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold mb-4">
                  <span className="w-8 h-px bg-purple-300" />
                  Our Services
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Everything you need

                  <span className="block text-purple-700 italic">
                    to feel beautiful.
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-gray-600 leading-7">
                Carefully selected beauty and wellness services delivered by
                experienced professionals in a calm, modern environment.
              </p>
            </div>

            {servicesLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-[390px] rounded-[28px] bg-white border border-purple-100 animate-pulse"
                  />
                ))}
              </div>
            ) : activeServices.length === 0 ? (
              <div className="rounded-[32px] bg-white border border-purple-100 p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <SparklesIcon className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl font-bold mt-5">
                  Services coming soon
                </h3>

                <p className="text-gray-500 mt-2">
                  Our services will appear here once they are added from the
                  admin dashboard.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeServices.map((service, index) => (
                  <article
                    key={service._id || index}
                    className="group bg-white rounded-[28px] border border-purple-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={
                          service.image ||
                          serviceImages[
                            index % serviceImages.length
                          ]
                        }
                        alt={service.name || "Beauty service"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                      {service.category && (
                        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-purple-700 text-[11px] font-bold uppercase tracking-wider">
                          {service.category}
                        </span>
                      )}

                      {service.price !== undefined &&
                        service.price !== null && (
                          <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white text-gray-900 text-sm font-bold shadow-lg">
                            PKR{" "}
                            {Number(
                              service.price
                            ).toLocaleString()}
                          </span>
                        )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-2xl font-bold">
                            {service.name}
                          </h3>

                          {service.duration && (
                            <p className="text-xs text-purple-600 font-semibold mt-1">
                              {service.duration}
                            </p>
                          )}
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                          <SparklesIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 leading-6 mt-4 min-h-[48px]">
                        {service.description ||
                          "A personalized beauty experience designed to help you look and feel your best."}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          selectService(service._id)
                        }
                        className="group/btn mt-6 w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-purple-50 text-purple-700 font-semibold text-sm hover:bg-purple-700 hover:text-white transition"
                      >
                        Book this service

                        <ArrowIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            ABOUT
        ═══════════════════════════════════════════ */}
        <section id="about" className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">

                  <img
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85"
                    alt="Beauty studio"
                    className="w-full h-[420px] object-cover rounded-[32px] mt-10"
                  />

                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85"
                      alt="Beauty treatment"
                      className="w-full h-[300px] object-cover rounded-[32px]"
                    />

                    <div className="mt-4 rounded-[28px] bg-purple-700 text-white p-6 h-[104px] flex items-center justify-between">
                      <div>
                        <p className="font-serif text-2xl font-bold">
                          Since
                        </p>

                        <p className="text-purple-200 text-sm">
                          2018
                        </p>
                      </div>

                      <SparklesIcon className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 left-5 sm:left-10 bg-white border border-purple-100 shadow-xl rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-widest text-purple-500 font-bold">
                    Our promise
                  </p>

                  <p className="font-serif text-lg font-bold mt-1">
                    You leave feeling amazing.
                  </p>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold mb-5">
                  <span className="w-8 h-px bg-purple-300" />
                  About Lumière
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  More than a salon.

                  <span className="block text-purple-700 italic">
                    It's your ritual.
                  </span>
                </h2>

                <p className="mt-7 text-gray-600 leading-8">
                  We believe beauty should never feel rushed. Lumière is a
                  modern beauty studio where expert care, thoughtful details
                  and genuine hospitality come together.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  Every treatment is tailored to you, your style and your
                  comfort — because the best beauty experience is the one that
                  feels completely yours.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {[
                    "Experienced professionals",
                    "Premium beauty products",
                    "Personalized treatments",
                    "Relaxing environment",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-[#faf8ff] border border-purple-50"
                    >
                      <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                        ✓
                      </span>

                      <span className="text-sm font-semibold text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            GALLERY
        ═══════════════════════════════════════════ */}
        <section id="gallery" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold mb-4">
                <SparklesIcon className="w-4 h-4" />
                The Lumière Experience
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl font-bold">
                A space made for

                <span className="text-purple-700 italic">
                  {" "}you.
                </span>
              </h2>

              <p className="mt-4 text-gray-500 leading-7">
                Step inside a calm, elegant environment designed to make your
                beauty appointment feel like a little escape.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="col-span-2 row-span-2 h-[420px] rounded-[30px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=90"
                  alt="Salon interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="h-[202px] rounded-[30px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=85"
                  alt="Beauty treatment"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="h-[202px] rounded-[30px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85"
                  alt="Spa treatment"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="h-[202px] rounded-[30px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=85"
                  alt="Nail care"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="h-[202px] rounded-[30px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=85"
                  alt="Hair styling"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TESTIMONIAL
        ═══════════════════════════════════════════ */}
        <section className="py-24 lg:py-28 bg-purple-700 text-white overflow-hidden relative">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-purple-500/30 blur-2xl" />

          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-violet-900/30 blur-2xl" />

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="text-purple-200 text-4xl mb-6">
              “
            </div>

            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium">
              The perfect place to slow down, take care of yourself, and leave
              feeling like the best version of you.
            </blockquote>

            <div className="mt-8">
              <p className="font-semibold">
                Our Lumière Clients
              </p>

              <p className="text-sm text-purple-200 mt-1">
                Beauty • Confidence • Wellness
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            BOOKING
        ═══════════════════════════════════════════ */}
        <section id="booking" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">

              {/* Booking Intro */}
              <div className="rounded-[32px] bg-purple-700 text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-purple-500/30 blur-2xl" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                    <CalendarIcon className="w-7 h-7" />
                  </div>

                  <p className="text-sm font-semibold text-purple-200 uppercase tracking-[0.2em]">
                    Reserve your visit
                  </p>

                  <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
                    Your next

                    <span className="block italic text-purple-200">
                      beautiful moment.
                    </span>
                  </h2>

                  <p className="mt-6 text-purple-100 leading-7">
                    Tell us what you'd like and when you'd like to visit. Our
                    team will confirm your appointment shortly.
                  </p>

                  <div className="mt-10 space-y-4">

                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        ✓
                      </span>

                      <span className="text-sm text-purple-100">
                        Personalized service
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        ✓
                      </span>

                      <span className="text-sm text-purple-100">
                        Easy appointment request
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        ✓
                      </span>

                      <span className="text-sm text-purple-100">
                        Friendly confirmation
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-white rounded-[32px] border border-purple-100 shadow-xl shadow-purple-100/50 p-6 sm:p-8 lg:p-10">

                <div className="mb-8">
                  <p className="text-sm font-semibold text-purple-600">
                    Appointment request
                  </p>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
                    Let's plan your visit
                  </h3>
                </div>

                <form
                  onSubmit={handleBooking}
                  className="space-y-5"
                >

                  {/* NAME + PHONE */}
                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        value={booking.customerName}
                        onChange={(e) =>
                          setBooking((prev) => ({
                            ...prev,
                            customerName: e.target.value,
                          }))
                        }
                        placeholder="Your name"
                        required
                        className="w-full h-13 px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>

                      <input
                        type="tel"
                        value={booking.phone}
                        onChange={(e) =>
                          setBooking((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="03XX XXXXXXX"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                      />
                    </div>

                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      value={booking.email}
                      onChange={(e) =>
                        setBooking((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                    />
                  </div>

                  {/* SERVICE */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Service *
                    </label>

                    <select
                      value={booking.service}
                      onChange={(e) =>
                        setBooking((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                    >
                      <option value="">
                        {servicesLoading
                          ? "Loading services..."
                          : activeServices.length === 0
                          ? "No services available"
                          : "Choose a service"}
                      </option>

                      {!servicesLoading &&
                        activeServices.map((service) => (
                          <option
                            key={service._id}
                            value={service._id}
                          >
                            {service.name}

                            {service.price !== undefined &&
                            service.price !== null
                              ? ` — PKR ${Number(
                                  service.price
                                ).toLocaleString()}`
                              : ""}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* STAFF */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Staff
                    </label>

                    <select
                      value={booking.staff}
                      onChange={(e) =>
                        setBooking((prev) => ({
                          ...prev,
                          staff: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                    >
                      <option value="">
                        {staffLoading
                          ? "Loading staff..."
                          : activeStaff.length === 0
                          ? "No staff available"
                          : "Choose a staff member"}
                      </option>

                      {!staffLoading &&
                        activeStaff.map((member) => (
                          <option
                            key={member._id}
                            value={member._id}
                          >
                            {member.name}

                            {member.role
                              ? ` — ${member.role}`
                              : ""}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* DATE + TIME */}
                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date *
                      </label>

                      <input
                        type="date"
                        min={today}
                        value={booking.appointmentDate}
                        onChange={(e) =>
                          setBooking((prev) => ({
                            ...prev,
                            appointmentDate:
                              e.target.value,
                          }))
                        }
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Time *
                      </label>

                      <input
                        type="time"
                        value={booking.appointmentTime}
                        onChange={(e) =>
                          setBooking((prev) => ({
                            ...prev,
                            appointmentTime:
                              e.target.value,
                          }))
                        }
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                      />
                    </div>

                  </div>

                  {/* NOTES */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notes
                    </label>

                    <textarea
                      rows="4"
                      value={booking.notes}
                      onChange={(e) =>
                        setBooking((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Anything you'd like us to know?"
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition resize-none"
                    />
                  </div>

                  {/* ERROR */}
                  {bookingError && (
                    <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm">
                      {bookingError}
                    </div>
                  )}

                  {/* SUCCESS */}
                  {bookingMessage && (
                    <div className="rounded-xl bg-green-50 border border-green-100 text-green-700 px-4 py-3 text-sm">
                      {bookingMessage}
                    </div>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-purple-700 text-white font-semibold shadow-lg shadow-purple-200 hover:bg-purple-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {bookingLoading ? (
                      <>
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                        Requesting...
                      </>
                    ) : (
                      <>
                        Request Appointment

                        <ArrowIcon className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Required fields are marked with *
                  </p>

                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="bg-[#17111f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            <div className="lg:col-span-2">
              <BrandLogo dark />

              <p className="max-w-md text-gray-400 leading-7 mt-6">
                A modern beauty and wellness studio created around one simple
                idea: you deserve to feel beautiful, confident and cared for.
              </p>

              <a
                href="#booking"
                className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-sm font-semibold"
              >
                Book an Appointment

                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-5">
                Explore
              </h4>

              <div className="space-y-3 text-sm text-gray-400">

                <a
                  href="#home"
                  className="block hover:text-white transition"
                >
                  Home
                </a>

                <a
                  href="#services"
                  className="block hover:text-white transition"
                >
                  Services
                </a>

                <a
                  href="#about"
                  className="block hover:text-white transition"
                >
                  About
                </a>

                <a
                  href="#gallery"
                  className="block hover:text-white transition"
                >
                  Gallery
                </a>

              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-5">
                Visit Us
              </h4>

              <div className="space-y-3 text-sm text-gray-400">
                <p>Mon – Sat</p>

                <p>10:00 AM – 8:00 PM</p>

                <p className="pt-2">
                  Your city, Pakistan
                </p>
              </div>
            </div>

          </div>

          <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Lumière Beauty Studio. All rights
              reserved.
            </p>

            <div className="flex items-center gap-5 text-xs text-gray-500">

              <a
                href="#"
                className="hover:text-white transition"
              >
                Instagram
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Facebook
              </a>

              <a
                href="/admin"
                className="hover:text-white transition"
              >
                Admin
              </a>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;