import { useEffect, useState } from "react";
import FeatureCarousel from "./components/FeatureCarousel";
import AdminPortal from "./components/AdminPortal";
import LoginModal from "./components/LoginModal";

function App() {
  const authStorageKey = "change_inaag_admin_auth";
  const [showLogin, setShowLogin] = useState(false);
  const [adminMode, setAdminMode] = useState(() => window.localStorage.getItem(authStorageKey) === "true");
  type MenuItem = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    active: boolean;
    unliRice: boolean;
    bestSeller: boolean;
    image: string;
  };
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [showFullMenu, setShowFullMenu] = useState(false);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((items) => {
        if (Array.isArray(items)) setMenu(items);
      });
  }, []);

  if (adminMode) {
    return <AdminPortal />;
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 dark:border-primary/20">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 text-primary dark:text-white">
            <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <img src="/chadeinaag.jpg" alt="Restaurant Image" className="w-8 h-8 rounded-lg" />
            </div>
            <span className="text-xl font-bold tracking-tight">CHANGE INAAG</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors" href="#home">Home</a>
            <a className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors" href="#best-sellers">Menu</a>
            <a className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors" href="#location">Locations</a>
            <a className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors" href="#why">About</a>
          </nav>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/5 dark:hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              Login
            </button>
            <a href="#order" className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Order Now
            </a>
          </div>
        </div>
      </header>

      <main id="home" className="flex-grow">
        <section id="hero" className="flex items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none z-0"></div>
          <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8 text-center lg:text-left">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit mx-auto lg:mx-0">
                    <span className="material-symbols-outlined text-sm">verified</span> Authentic Cebuano Taste
                  </span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                    <span className="text-primary dark:text-white block">Mas Pinadako.</span>
                    <span className="text-primary dark:text-white block">Mas Pinajuicy.</span>
                    <span className="text-secondary mt-2 block bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">Buyag sa Kalami!</span>
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 pt-4 leading-relaxed">
                    Experience the boldest flavors of Cebuano grilled chicken. Authentic taste, bigger servings, and that signature smoky aroma you love.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <a href="#order" className="h-14 px-8 rounded-full bg-primary text-white text-base font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                    Order Now
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  <a href="#best-sellers" className="h-14 px-8 rounded-full bg-transparent border-2 border-primary text-primary dark:border-white dark:text-white text-base font-bold hover:bg-primary/5 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    View Menu
                    <span className="material-symbols-outlined">restaurant_menu</span>
                  </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>Charcoal Grilled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>Unlimited Rice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>Native Sauce</span>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl scale-90 translate-y-4"></div>
                <div className="relative w-full max-w-[600px] aspect-square group">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 rotate-3 hover:rotate-0 transition-all duration-500 ease-out border-4 border-white dark:border-background-dark">
                    <img src="/paasquare.jpg" alt="Grilled chicken" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-background-dark p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                    <div className="bg-secondary/20 p-2 rounded-full text-secondary">
                      <span className="material-symbols-outlined">star</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Top Rated</p>
                      <p className="text-slate-900 dark:text-white font-bold text-lg leading-none">#1 In Town</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="best-sellers" className="px-6 py-16">
          <div className="max-w-[1200px] mx-auto text-center mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-accent-yellow/20 text-accent-yellow text-xs font-bold tracking-wider uppercase border border-accent-yellow/30">
              {showFullMenu ? "Complete Menu" : "Authentic Filipino Grill"}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {showFullMenu ? "Explore Our Full Menu" : "Our Best Sellers"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
              {showFullMenu
                ? "Browse through our complete selection of charcoal-grilled specialties and favorites."
                : "Experience the taste of tradition with our crowd-favorite grilled specialties."}
            </p>
          </div>
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(showFullMenu
                ? menu.filter((i) => i.active)
                : menu.filter((i) => i.active && i.bestSeller).length > 0
                ? menu.filter((i) => i.active && i.bestSeller)
                : menu.filter((i) => i.active).slice(0, 3)
              ).map((i) => (
                <div key={i.id} className="group card-hover-lift bg-white dark:bg-[#1a2c20] rounded-[20px] overflow-hidden border border-slate-100 dark:border-primary/10 shadow-soft-green flex flex-col h-full relative">
                  {i.unliRice && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 bg-accent-yellow text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-glow">
                        <span className="material-symbols-outlined text-[14px]">rice_bowl</span>
                        UNLI RICE
                      </span>
                    </div>
                  )}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>
                    <img src={i.image} alt={i.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{i.name}</h3>
                        {!showFullMenu && i.bestSeller && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-accent-yellow flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">star</span>
                            Top Pick
                          </span>
                        )}
                      </div>
                      <span className="text-xl font-bold text-primary">₱{i.price}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">{i.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                      <div className="flex gap-1 text-accent-yellow">
                        <span className="material-symbols-outlined text-[18px]">star</span>
                        <span className="material-symbols-outlined text-[18px]">star</span>
                        <span className="material-symbols-outlined text-[18px]">star</span>
                        <span className="material-symbols-outlined text-[18px]">star</span>
                        <span className="material-symbols-outlined text-[18px]">star_half</span>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a
                href="#best-sellers"
                onClick={(e) => {
                  e.preventDefault();
                  setShowFullMenu(!showFullMenu);
                }}
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                {showFullMenu ? "Show Best Sellers" : "View Full Menu"}
                <span className={`material-symbols-outlined text-[20px] transition-transform ${showFullMenu ? "rotate-180" : ""}`}>
                  {showFullMenu ? "arrow_back" : "arrow_forward"}
                </span>
              </a>
            </div>
          </div>
        </section>
        <FeatureCarousel />

        <section id="location" className="max-w-7xl mx-auto px-6 py-16 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Experience the Taste of <span className="text-primary relative inline-block">Bukidnon</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Come hungry, leave happy. Enjoy our famous Inasal and unlimited rice in a cozy, rustic atmosphere that feels like home.
            </p>
          </div>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Bisita Na!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">Visit our flagship store in the heart of Bukidnon.</p>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                        <span className="material-icons">storefront</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Address</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">Purok 1, Sayre Highway<br />Valencia City, Bukidnon, Philippines</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                        <span className="material-icons">schedule</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Operating Hours</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">Monday - Sunday<br />10:00 AM - 9:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                        <span className="material-icons">call</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Contact Us</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">+63 912 345 6789<br />hello@chadenanag.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"><span className="material-icons text-[14px] mr-1">wifi</span> Free WiFi</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"><span className="material-icons text-[14px] mr-1">local_parking</span> Parking Available</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"><span className="material-icons text-[14px] mr-1">ac_unit</span> Air Conditioned</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHvLdEiM7DVTHX6CcVSapWeFf9F84ZkScXygOfwJE5enR5gkK0wlES57aZm84uoJbsrAPVLTjX0hux89nIKcja2zMwlvz5XsVrgNn51noI7p665y-KRZ0AHAFqhEuPPtug2WAs-mcVAqIRyuTxbqgxEhqYErLfylVSLlIzva__r5CR9bTgmy8fJGcASjjC_FAZ8vc582qyBxkC9p19hFiRhQkUEgeYlyKvKLWm5C-YIepGzj4h_Y8le7pUNgqsXYJU3mrpOJPYrQA" alt="Map location" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
              <a href="https://goo.gl/maps/placeholder" target="_blank" className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <span className="material-icons text-primary text-base">directions</span> Get Directions
              </a>
            </div>
          </section>
          <div className="bg-primary dark:bg-green-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl mt-8">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to satisfy your cravings?</h3>
              <p className="text-green-100 mb-8 text-lg">We don&apos;t accept reservations, but we always find room for family. Drop by today!</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#best-sellers"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowFullMenu(true);
                    document.getElementById("best-sellers")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white text-primary font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg text-center"
                >
                  View Full Menu
                </a>
                <a href="#contact" className="bg-green-700 dark:bg-green-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition shadow-lg border border-green-600 text-center">Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="px-6 py-16">
          <div className="max-w-[960px] mx-auto">
            <div className="flex flex-col gap-4 text-center items-center">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Experience the Best</span>
              <h2 className="text-primary-dark tracking-tight text-[32px] font-black leading-tight md:text-5xl max-w-[720px]">Why Choose Change Inaag?</h2>
              <p className="text-slate-600 text-lg font-normal leading-relaxed max-w-[600px]">We bring the authentic smoky, savory taste of Filipino favorites grilled to absolute perfection, right to your table.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="group flex flex-1 gap-5 rounded-2xl border border-neutral-surface bg-white p-8 flex-col shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">rice_bowl</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-primary-dark text-xl font-bold leading-tight">Unli Rice</h3>
                  <p className="text-slate-500 text-base">Enjoy unlimited steaming white rice with every meal set.</p>
                </div>
              </div>
              <div className="group flex flex-1 gap-5 rounded-2xl border border-neutral-surface bg-white p-8 flex-col shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">local_fire_department</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-primary-dark text-xl font-bold leading-tight">Juicy Grilled</h3>
                  <p className="text-slate-500 text-base">Marinated in our secret sauce and grilled over charcoal for that distinct smoky flavor.</p>
                </div>
              </div>
              <div className="group flex flex-1 gap-5 rounded-2xl border border-neutral-surface bg-white p-8 flex-col shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">savings</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-primary-dark text-xl font-bold leading-tight">Budget Friendly</h3>
                  <p className="text-slate-500 text-base">Delicious, high-quality meals that satisfy your cravings without breaking the bank.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="order" className="my-10 px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:px-20 md:py-24 text-center max-w-[960px] mx-auto">
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Open Today: 10:00 AM - 9:00 PM
              </div>
              <h2 className="text-white tracking-tight text-3xl md:text-5xl font-black leading-tight max-w-[800px]">Kaon na ta sa Change Inaag!</h2>
              <p className="text-white/80 text-lg md:text-xl max-w-[600px]">Ready to satisfy your cravings? Order now for delivery or visit our nearest branch today!</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center max-w-md">
                <a className="flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-white text-primary hover:bg-neutral-100 transition-colors text-base font-bold shadow-lg w-full sm:w-auto" href="#">
                  <span className="material-symbols-outlined">chat</span>
                  <span className="truncate">Order via Messenger</span>
                </a>
                <a className="flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 transition-colors text-base font-bold w-full sm:w-auto" href="#contact">
                  <span className="material-symbols-outlined">call</span>
                  <span className="truncate">Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-surface bg-white">
        <div className="flex flex-col gap-8 px-6 py-12 text-center items-center max-w-[960px] mx-auto">
          <div className="flex items-center gap-2 text-primary-dark mb-4">
            <span className="material-symbols-outlined text-2xl">restaurant</span>
            <span className="font-bold text-lg tracking-tight">CHANGE INAAG</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-medium" href="#home">Home</a>
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-medium" href="#best-sellers">Menu</a>
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-medium" href="#location">Locations</a>
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-medium" href="#">Terms of Service</a>
          </div>
          <div className="flex justify-center gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="sr-only">Facebook</span><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"/></svg></a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="sr-only">Instagram</span><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"/></svg></a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="sr-only">Twitter</span><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"/></svg></a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Change Inaag. All rights reserved.</p>
        </div>
      </footer>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            window.localStorage.setItem(authStorageKey, "true");
            setShowLogin(false);
            setAdminMode(true);
          }}
        />
      )}
    </>
  );
}

export default App;
