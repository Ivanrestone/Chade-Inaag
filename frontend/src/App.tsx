import { useEffect, useState } from "react";
import FeatureCarousel from "./components/FeatureCarousel";
import AdminPortal from "./components/AdminPortal";
import LoginModal from "./components/LoginModal";
import ItemDetailModal from "./components/ItemDetailModal";

type Branch = {
  id: string;
  name: string;
  status: "open" | "coming-soon";
  image: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  features: string[];
  mapUrl: string;
};

function App() {
  const authStorageKey = "change_inaag_admin_auth";
  const [showLogin, setShowLogin] = useState(false);
  const [adminMode, setAdminMode] = useState(() => window.localStorage.getItem(authStorageKey) === "true");
  type MenuItem = {
    id: string;
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
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>(["all"]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [activeBranch, setActiveBranch] = useState(0);

  const menuFilters = [
    { key: "all", label: "All", icon: "restaurant_menu" },
    { key: "bestSeller", label: "Best Seller", icon: "star" },
    { key: "unliRice", label: "Unli Rice", icon: "rice_bowl" },
    { key: "Chicken", label: "Chicken", icon: "egg" },
    { key: "BBQ", label: "BBQ", icon: "outdoor_grill" },
    { key: "Pork", label: "Pork", icon: "lunch_dining" },
    { key: "Beef", label: "Beef", icon: "kebab_dining" },
    { key: "Fish", label: "Fish", icon: "phishing" },
    { key: "Seafood", label: "Seafood", icon: "set_meal" },
    { key: "Dessert", label: "Dessert", icon: "cake" },
    { key: "Drinks", label: "Drinks", icon: "local_cafe" },
    { key: "Other", label: "Other", icon: "more_horiz" },
  ];

  const toggleFilter = (key: string) => {
    if (key === "all") {
      setActiveFilters(["all"]);
    } else {
      setActiveFilters((prev) => {
        const without = prev.filter((f) => f !== "all" && f !== key);
        const wasActive = prev.includes(key);
        const next = wasActive ? without : [...without, key];
        return next.length === 0 ? ["all"] : next;
      });
    }
  };

  const getFilteredMenu = () => {
    const active = menu.filter((i) => i.active);
    if (activeFilters.includes("all")) return active;
    return active.filter((i) => {
      return activeFilters.every((f) => {
        if (f === "bestSeller") return i.bestSeller;
        if (f === "unliRice") return i.unliRice;
        return i.category === f;
      });
    });
  };

  const getFilteredCategories = () => {
    const hasCategoryFilter = activeFilters.some((f) => !["all", "bestSeller", "unliRice"].includes(f));
    if (hasCategoryFilter) {
      return activeFilters.filter((f) => !["all", "bestSeller", "unliRice"].includes(f));
    }
    return ["Chicken", "BBQ", "Pork", "Beef", "Fish", "Seafood", "Dessert", "Drinks", "Other"];
  };

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((items) => {
        if (Array.isArray(items)) setMenu(items);
      });
  }, []);

  useEffect(() => {
    fetch("/api/branches")
      .then((r) => r.json())
      .then((items) => {
        if (Array.isArray(items) && items.length > 0) setBranches(items);
      })
      .catch(() => {});
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
            <span className="text-xl font-bold tracking-tight">CHADE INAAG</span>
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
                    <span className="material-symbols-outlined text-sm">verified</span> Tinuod nga Kalami sa Bukidnon
                  </span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                    <span className="text-primary dark:text-white block">Mas Pinadako.</span>
                    <span className="text-primary dark:text-white block">Mas Pinajuicy.</span>
                    <span className="text-secondary mt-2 block bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">Buyag sa Kalami!</span>
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 pt-4 leading-relaxed">
                 <strong>Proudly Bukidnon. Home of authentic Inanag</strong> — a lumad word meaning sinugba,
served the way we do it best: perfectly grilled, rich in flavor, and smoky goodness.
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
                    <span>Sulit, Lami Pa</span>
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
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Unli</p>
                      <p className="text-slate-900 dark:text-white font-bold text-lg leading-none">Rice</p>
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
              {showFullMenu ? "Complete Menu" : "🔥 Our Best Sellers"}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {showFullMenu ? "Explore Our Full Menu" : "Our Best Sellers"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
              {showFullMenu
                ? "Browse through our complete selection of charcoal-grilled specialties and favorites."
                : "Experience the taste of tradition with our crowd-favorite Inanag specialties."}
            </p>
          </div>
          <div className="max-w-[1200px] mx-auto">
            {!showFullMenu ? (
              // Best Sellers View (3-5 items max)
              (() => {
                const items = activeFilters.includes("all")
                  ? (menu.filter((i) => i.active && i.bestSeller).length > 0
                    ? menu.filter((i) => i.active && i.bestSeller).slice(0, 5)
                    : menu.filter((i) => i.active).slice(0, 5))
                  : getFilteredMenu().slice(0, 5);
                return items.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4 block">search_off</span>
                    <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No items match your filters</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try removing a filter or click "All" to see everything</p>
                  </div>
                ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((i) => (
                  <div key={i.id} className="group card-hover-lift bg-white dark:bg-[#1a2c20] rounded-[20px] overflow-hidden border border-slate-100 dark:border-primary/10 shadow-soft-green flex flex-col h-full relative">
                    <div className="absolute top-4 right-4 z-10 flex flex-wrap justify-end gap-2">
                      {i.bestSeller && (
                        <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-pulse">
                          <span className="material-symbols-outlined text-[14px]">star</span>
                          BEST SELLER
                        </span>
                      )}
                      {i.unliRice && (
                        <span className="inline-flex items-center gap-1 bg-accent-yellow text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                          <span className="material-symbols-outlined text-[14px]">rice_bowl</span>
                          UNLI RICE
                        </span>
                      )}
                    </div>
                    <div 
                      className="relative h-64 overflow-hidden cursor-pointer group/img"
                      onClick={() => setSelectedItem(i)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1] opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-4xl scale-75 group-hover/img:scale-100 transition-transform duration-500">zoom_in</span>
                      </div>
                      <img src={i.image} alt={i.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{i.name}</h3>
                          {i.bestSeller && (
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
                );
              })()
            ) : (
              // Full Menu Categorized View
              <>
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {menuFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => toggleFilter(f.key)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeFilters.includes(f.key)
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
                    {f.label}
                  </button>
                ))}
              </div>
              {getFilteredCategories().reduce((acc: {cat: string; items: MenuItem[]}[], category) => {
                  const categoryItems = menu.filter((i) => {
                    if (!i.active || i.category !== category) return false;
                    if (!activeFilters.includes("all")) {
                      return activeFilters.every((f) => {
                        if (f === "bestSeller") return i.bestSeller;
                        if (f === "unliRice") return i.unliRice;
                        return true;
                      });
                    }
                    return true;
                  });
                  if (categoryItems.length > 0) acc.push({cat: category, items: categoryItems});
                  return acc;
                }, []).length === 0 ? (
                  <div className="text-center py-16">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4 block">search_off</span>
                    <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No items match your filters</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try removing a filter or click "All" to see everything</p>
                  </div>
                ) : (
              <div className="space-y-12">
                {getFilteredCategories().map((category) => {
                  const categoryItems = menu.filter((i) => {
                    if (!i.active || i.category !== category) return false;
                    if (!activeFilters.includes("all")) {
                      return activeFilters.every((f) => {
                        if (f === "bestSeller") return i.bestSeller;
                        if (f === "unliRice") return i.unliRice;
                        return true;
                      });
                    }
                    return true;
                  });
                  if (categoryItems.length === 0) return null;
                  
                  const categoryTitles: Record<string, string> = {
                    "Chicken": "🍗 Chicken (Inanag Specials)",
                    "BBQ": "🍢 BBQ",
                    "Pork": "🐖 Pork",
                    "Beef": "🐄 Beef",
                    "Fish": "🐟 Fish & Seafood",
                    "Seafood": "🦐 Seafood",
                    "Dessert": "🍰 Dessert",
                    "Drinks": "🥤 Drinks",
                    "Other": "🍽️ Other"
                  };
                  
                  return (
                    <div key={category} className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white border-b-2 border-primary/20 pb-2">
                        {categoryTitles[category] || category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryItems.map((i) => (
                          <div key={i.id} className="group card-hover-lift bg-white dark:bg-[#1a2c20] rounded-[20px] overflow-hidden border border-slate-100 dark:border-primary/10 shadow-soft-green flex flex-col h-full relative">
                            <div className="absolute top-4 right-4 z-10 flex flex-wrap justify-end gap-2">
                              {i.bestSeller && (
                                <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-pulse">
                                  <span className="material-symbols-outlined text-[14px]">star</span>
                                  BEST SELLER
                                </span>
                              )}
                              {i.unliRice && (
                                <span className="inline-flex items-center gap-1 bg-accent-yellow text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                                  <span className="material-symbols-outlined text-[14px]">rice_bowl</span>
                                  UNLI RICE
                                </span>
                              )}
                            </div>
                            <div 
                              className="relative h-64 overflow-hidden cursor-pointer group/img"
                              onClick={() => setSelectedItem(i)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1] opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-4xl scale-75 group-hover/img:scale-100 transition-transform duration-500">zoom_in</span>
                              </div>
                              <img src={i.image} alt={i.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex flex-col">
                                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{i.name}</h3>
                                  {i.bestSeller && (
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-yellow flex items-center gap-1">
                                      <span className="material-symbols-outlined text-[12px]">star</span>
                                      Best Seller
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
                    </div>
                  );
                })}
              </div>
                )}
              </>
            )}
            <div className="mt-12 text-center">
              <a
                href="#best-sellers"
                onClick={(e) => {
                  e.preventDefault();
                  setShowFullMenu(!showFullMenu);
                }}
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                {showFullMenu ? "👈 Show Best Sellers" : "View Full Menu"}
                <span className={`material-symbols-outlined text-[20px] transition-transform ${showFullMenu ? "rotate-180" : ""}`}>
                  {showFullMenu ? "arrow_back" : "arrow_forward"}
                </span>
              </a>
            </div>
          </div>
        </section>
        <FeatureCarousel />

        {branches.length > 0 && (
        <section id="location" className="max-w-7xl mx-auto px-6 py-16 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Visit Our <span className="text-primary relative inline-block">Branches</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Experience the authentic taste of Bukidnon at a location near you. More branches coming soon!
            </p>
          </div>

          {/* Branch Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {branches.map((branch, idx) => (
              <button
                key={branch.id}
                onClick={() => setActiveBranch(idx)}
                className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeBranch === idx
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary"
                }`}
              >
                {branch.status === "coming-soon" && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    SOON
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    {branch.status === "coming-soon" ? "schedule" : "store"}
                  </span>
                  {branch.name}
                </span>
              </button>
            ))}
          </div>

          {/* Active Branch Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Branch Info Card */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                {/* Branch Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={branches[activeBranch].image}
                    alt={branches[activeBranch].name}
                    className="w-full h-full object-cover"
                  />
                  {branches[activeBranch].status === "coming-soon" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center text-white">
                        <span className="material-symbols-outlined text-6xl mb-2">rocket_launch</span>
                        <p className="text-2xl font-bold">Coming Soon</p>
                        <p className="text-sm opacity-80">Opening 2025</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      branches[activeBranch].status === "open"
                        ? "bg-green-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {branches[activeBranch].status === "open" ? "check_circle" : "schedule"}
                      </span>
                      {branches[activeBranch].status === "open" ? "NOW OPEN" : "COMING SOON"}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {branches[activeBranch].name}
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Address</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm leading-relaxed">
                          {branches[activeBranch].address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Operating Hours</h4>
                        <div className="text-gray-600 dark:text-gray-300 mt-1 text-sm space-y-1">
                          {(() => {
                            const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
                            const hrs = branches[activeBranch].hours;
                            const openDays = days.filter(d => hrs[d]?.open);
                            if (openDays.length === 0) return <span className="italic">Closed all days</span>;
                            const formatTime = (t: string) => {
                              if (!t) return "";
                              const [h, m] = t.split(":");
                              const hour = parseInt(h);
                              const ampm = hour >= 12 ? "PM" : "AM";
                              const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                              return `${displayHour}:${m} ${ampm}`;
                            };
                            const grouped = [] as { days: string[], openTime: string, closeTime: string }[];
                            let current: { days: string[], openTime: string, closeTime: string } | null = null;
                            openDays.forEach((day) => {
                              const dayHrs = hrs[day];
                              const timeKey = `${dayHrs.openTime}-${dayHrs.closeTime}`;
                              if (current && `${current.openTime}-${current.closeTime}` === timeKey) {
                                current.days.push(day);
                              } else {
                                if (current) grouped.push(current);
                                current = { days: [day], openTime: dayHrs.openTime, closeTime: dayHrs.closeTime };
                              }
                            });
                            if (current) grouped.push(current);
                            return grouped.map((g, i) => (
                              <div key={i}>
                                <span className="font-medium">{g.days.length === 1
                                  ? g.days[0].charAt(0).toUpperCase() + g.days[0].slice(1)
                                  : g.days[0].slice(0, 3) + "-" + g.days[g.days.length - 1].slice(0, 3)}</span>
                                : {formatTime(g.openTime)} - {formatTime(g.closeTime)}
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                        <span className="material-symbols-outlined">phone</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Contact</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                          {branches[activeBranch].phone}<br />
                          {branches[activeBranch].email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Branch Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {branches[activeBranch].features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {feature === "Free WiFi" ? "wifi" :
                             feature === "Parking Available" ? "local_parking" :
                             feature === "Air Conditioned" ? "ac_unit" :
                             feature === "Unli Rice" ? "rice_bowl" :
                             feature === "Outdoor Seating" ? "deck" :
                             feature === "Delivery" ? "delivery_dining" :
                             feature === "Function Room" ? "event" : "check_circle"}
                          </span>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map / Location Image */}
            <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 relative">
              <img
                src={branches[activeBranch].image}
                alt={`${branches[activeBranch].name} location`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold mb-2">{branches[activeBranch].name}</h3>
                <p className="text-white/80 text-sm mb-4">{branches[activeBranch].address}</p>
                {branches[activeBranch].status === "open" && (
                  <a
                    href={branches[activeBranch].mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition"
                  >
                    <span className="material-symbols-outlined text-primary">directions</span>
                    Get Directions
                  </a>
                )}
              </div>
            </div>
          </div>
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
        )}

        <section id="why" className="px-6 py-16">
          <div className="max-w-[960px] mx-auto">
            <div className="flex flex-col gap-4 text-center items-center">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Experience the Best</span>
              <h2 className="text-primary-dark tracking-tight text-[32px] font-black leading-tight md:text-5xl max-w-[720px]">Why Choose ChaDe Inaag?</h2>
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
              <h2 className="text-white tracking-tight text-3xl md:text-5xl font-black leading-tight max-w-[800px]">Kaon na ta sa ChaDe Inaag!</h2>
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
            <span className="font-bold text-lg tracking-tight">CHADE INAAG</span>
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
          <p className="text-slate-400 text-sm">© 2026 ChaDe Inaag. All rights reserved.</p>
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

      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </>
  );
}

export default App;
