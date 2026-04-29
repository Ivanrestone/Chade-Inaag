import { useMemo, useState, useEffect } from "react";
import type { FormEvent } from "react";

type DashboardPage = "overview" | "menu" | "users" | "branches";

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

const demoEmail = "admin@gmail.com";
const demoPassword = "admin123";
const authStorageKey = "change_inaag_admin_auth";

const categories = ["Chicken", "Pork", "Beef", "Fish", "Seafood", "BBQ", "Dessert", "Drinks", "Other"];

const branchFeatures = ["Free WiFi", "Parking Available", "Air Conditioned", "Unli Rice", "Outdoor Seating", "Delivery", "Function Room"];

type DayHours = {
  open: boolean;
  openTime: string;
  closeTime: string;
};

type BranchHours = {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
};

type BranchItem = {
  id: string;
  name: string;
  status: "open" | "coming-soon";
  image: string;
  address: string;
  hours: BranchHours;
  phone: string;
  email: string;
  features: string[];
  mapUrl: string;
};

const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Z1 Paa",
    category: "Chicken",
    description: "Signature grilled chicken leg quarter with unlimited rice.",
    price: 99,
    active: true,
    unliRice: true,
    bestSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjGO8S2Ah2D3OOfKJNRya7FFJLZvePuShMjk7DYYtGzHAyfBmemT3rIoq1iddox66iRU3rrjNYpSHJXTE_UcEEIfanBSiWDrHWcF4StZdJ8xCsNDgbhZlyhoT-Dkgz9xAHNiZkOzCOYOGQ3T2O44ZDbgOiNMK-gU5mzW1-DrMnnqrhdkLObFyC-AHygaVxdKDG_WKdQxCHnMf2d_arBzkRfpyOtiB6KP2W1KH5-nrqKZ1YIPxv1z2qBouXmVKwkBJ4HM-5mJZ5K-w",
  },
  {
    id: "2",
    name: "Lechon Sisig",
    category: "Pork",
    description: "Crunchy pork bits with onions, chili, and calamansi.",
    price: 99,
    active: true,
    unliRice: false,
    bestSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAJ26EsuyKu_vglDzGWxPAdVthroqZBvHZLUP25eLXN0Qp4Ssjcbvv5OYj9lZ5pRSg1TJH-rIKtYVJ0Qct8NAWQvmWsZ2jod_yl_vR7f12pjX5Fobh7IpRfBJH5Nbe9wu3qhycUQ5pLovikfI0k91REEITQ_fbuNK5jpyjpxj2bWCFfQChtLaxeyVTfXS1ajXQrRJEpvV0jHHWE3I3gAdx3_du1I8CM3NMO8LAd3LSd7bXCxhn8Hd79ojmvRqdaM_hQLJQEyiSegI",
  },
  {
    id: "3",
    name: "BBQ T1",
    category: "BBQ",
    description: "Classic pork barbecue skewers, sweet and savory.",
    price: 99,
    active: true,
    unliRice: false,
    bestSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmfZ08ILCzI6aF8yAf-p1sG2orGAWfpRyYgtixNbw__FEZ-B1dYyXFJL1JKEiNyHQotd8k9I1BQ69tR154g0TzXNv-ZmAeWp1Cdvb_jcB9Kk3F2bsKymaFHQeQF8fw5EOurBEQwe6thVmdxUiyhqV0R4esO-HL0YykH9WEcyIgoUO0iC-fYupi28vNyZ176dpA6Eqteion3Aa0UidTxD28Q9ZIiSpr3o2zYLcQSkGbrTyTS9b3M5AypgseWR46aYJ1FF6r9D1t-8w",
  },
  {
    id: "4",
    name: "Special Halo-Halo",
    category: "Dessert",
    description: "Creamy shaved ice dessert with leche flan and ube ice cream.",
    price: 35,
    active: false,
    unliRice: false,
    bestSeller: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBG5aL36E1DNiy5h7tdzEXtIkq7nNX97yCal9UjoUZb6v9W_B_J2zomd_D3LlZYjCtN6CCgZRGZtvi7HsvTnFreiWqHnpjC6TIjjBfsDzjBjyhJyVerqfRUbAktNDREapQnwdZgjN0LW30b3vEYVrUVOqqw6mw8Ka5BZ9mLv8y5PtrufE1HJ429xLnlfHNIJYonljbjC4EUntvATO2ERDXwvYxjJ06wW0KLfDvmPxsGdCffiPRlYv_MGHUQf8aDi5RnJAC8ymFn1gQ",
  },
  {
    id: "5",
    name: "Tuna Panga",
    category: "Seafood",
    description: "Succulent grilled tuna jaw marinated in secret sauce.",
    price: 160,
    active: true,
    unliRice: false,
    bestSeller: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBG5aL36E1DNiy5h7tdzEXtIkq7nNX97yCal9UjoUZb6v9W_B_J2zomd_D3LlZYjCtN6CCgZRGZtvi7HsvTnFreiWqHnpjC6TIjjBfsDzjBjyhJyVerqfRUbAktNDREapQnwdZgjN0LW30b3vEYVrUVOqqw6mw8Ka5BZ9mLv8y5PtrufE1HJ429xLnlfHNIJYonljbjC4EUntvATO2ERDXwvYxjJ06wW0KLfDvmPxsGdCffiPRlYv_MGHUQf8aDi5RnJAC8ymFn1gQ",
  },
  {
    id: "6",
    name: "Baby Backribs",
    category: "Pork",
    description: "Tender ribs glazed in sweet and savory barbecue sauce.",
    price: 159,
    active: true,
    unliRice: false,
    bestSeller: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChniK0iPmFqUryVN7FVyFfsDNdlsemFTLWsOaIk-RWzv4RpAYzBG5Won_3tQeFQ4epXRPyQWQx0KvltbNa4Wig5XLa_L7JESHYr9UwyLQ5XFBdSD7iSlaYyoGzD1gZPcjzpwFTVHv6_eymhbZbmdQmP3tBqVzn_fNlYNHfoU85XHzKogzq3yEafE3d1swy-imhIRBcUgDIi1iBj-xfxPok3Tmen_GkIZlt-3RCquYbYqyF2IeAsdZhvWH84_NS9ypgPgKaxlmg1Ag",
  },
];

function currency(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState<DashboardPage>("overview");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem(authStorageKey) === "true",
  );
  const token = typeof window !== "undefined" ? window.localStorage.getItem("change_inaag_token") || "" : "";
  const [adminUsers, setAdminUsers] = useState<{ id: string; email: string }[]>([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    category: "Chicken",
    description: "",
    price: 0,
    active: true,
    unliRice: false,
    bestSeller: false,
    image: "",
  });
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const defaultHours: BranchHours = {
    monday: { open: true, openTime: "10:00", closeTime: "21:00" },
    tuesday: { open: true, openTime: "10:00", closeTime: "21:00" },
    wednesday: { open: true, openTime: "10:00", closeTime: "21:00" },
    thursday: { open: true, openTime: "10:00", closeTime: "21:00" },
    friday: { open: true, openTime: "10:00", closeTime: "21:00" },
    saturday: { open: true, openTime: "10:00", closeTime: "21:00" },
    sunday: { open: true, openTime: "10:00", closeTime: "21:00" },
  };

  const [newBranch, setNewBranch] = useState<Omit<BranchItem, "id">>({
    name: "",
    status: "open",
    image: "",
    address: "",
    hours: defaultHours,
    phone: "",
    email: "",
    features: [],
    mapUrl: "",
  });
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((items) => {
        if (Array.isArray(items) && items.length > 0) {
          setMenuItems(items as MenuItem[]);
        } else {
          setMenuItems(initialMenuItems);
        }
      })
      .catch(() => setMenuItems(initialMenuItems));
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem(authStorageKey) === "true") {
      fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((users) => {
          if (Array.isArray(users)) setAdminUsers(users);
        })
        .catch(() => {});
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    fetch("/api/branches")
      .then((r) => r.json())
      .then((items) => {
        if (Array.isArray(items)) setBranches(items);
      })
      .catch(() => {});
  }, []);

  const toggleBranchFeature = (feature: string) => {
    setNewBranch((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const addBranch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newBranch),
      });
      const data = await res.json();
      console.log("Branch created:", data);
      if (!res.ok) throw new Error(data.error || "Failed to add branch");
      setBranches((current) => [...current, data]);
      setNewBranch({ name: "", status: "open", image: "", address: "", hours: defaultHours, phone: "", email: "", features: [], mapUrl: "" });
      setSuccessMsg("Branch added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to add branch");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateBranchStatus = (id: string, status: "open" | "coming-soon") => {
    fetch(`/api/branches/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
      .then((r) => r.json())
      .then((updated) => {
        setBranches((current) => current.map((b) => (b.id === id ? updated : b)));
      });
  };

  const deleteBranchItem = (id: string) => {
    if (!confirm("Delete this branch?")) return;
    fetch(`/api/branches/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(() => {
        setBranches((current) => current.filter((b) => b.id !== id));
      });
  };

  const handleBranchImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBranch({ ...newBranch, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMenuItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return menuItems.filter((item) => {
      const textMatch =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);

      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "active" && item.active) ||
        (statusFilter === "inactive" && !item.active);

      return textMatch && statusMatch;
    });
  }, [menuItems, query, statusFilter]);

  const activeCount = menuItems.filter((item) => item.active).length;
  const inactiveCount = menuItems.length - activeCount;
  const estimatedRevenue = menuItems
    .filter((item) => item.active)
    .reduce((sum, item) => sum + item.price, 0);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Login failed");
        return;
      }
      window.localStorage.setItem("change_inaag_token", String(data.token));
      window.localStorage.setItem(authStorageKey, "true");
      setIsAuthenticated(true);
    } catch {
      setError("Network error. Please try again.");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(authStorageKey);
    window.localStorage.removeItem("change_inaag_token");
    setIsAuthenticated(false);
    setPassword("");
    setError("");
  };

  const updatePrice = (id: string, price: number) => {
    fetch(`/api/menu/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ price }),
    })
      .then((r) => r.json())
      .then((updated: MenuItem) => {
        setMenuItems((current) => current.map((x) => (x.id === id ? updated : x)));
      });
  };

  const toggleItemStatus = (id: string) => {
    const item = menuItems.find((x) => x.id === id);
    if (!item) return;
    fetch(`/api/menu/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ active: !item.active }),
    })
      .then((r) => r.json())
      .then((updated: MenuItem) => {
        setMenuItems((current) => current.map((x) => (x.id === id ? updated : x)));
      });
  };

  const toggleUnliRice = (id: string) => {
    const item = menuItems.find((x) => x.id === id);
    if (!item) return;
    fetch(`/api/menu/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ unliRice: !item.unliRice }),
    })
      .then((r) => r.json())
      .then((updated: MenuItem) => {
        setMenuItems((current) => current.map((x) => (x.id === id ? updated : x)));
      });
  };

  const toggleBestSeller = (id: string) => {
    const item = menuItems.find((x) => x.id === id);
    if (!item) return;
    fetch(`/api/menu/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ bestSeller: !item.bestSeller }),
    })
      .then((r) => r.json())
      .then((updated: MenuItem) => {
        setMenuItems((current) => current.map((x) => (x.id === id ? updated : x)));
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newItem),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server returned an error (${response.status}). Please check if the image is too large or if the server is running correctly.`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to add item");
      }

      setMenuItems((current) => [data, ...current]);
      setSuccessMsg("Item added successfully!");
      setNewItem({
        name: "",
        category: "Chicken",
        description: "",
        price: 0,
        active: true,
        unliRice: false,
        bestSeller: false,
        image: "",
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      console.error("Add Item Error:", err);
      setError(err.message || "An error occurred while adding the item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background-light px-6 py-10 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <section className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-soft-green md:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/30 blur-2xl"></div>
            <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-primary-light/40 blur-3xl"></div>
            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                  ChaDe Inaag Admin
                </div>
                <h1 className="text-4xl font-black leading-tight md:text-5xl">Welcome back, Admin</h1>
                <p className="max-w-md text-base text-white/85 md:text-lg">
                  Manage menu items, monitor your dashboard overview, and keep your store information updated.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wide text-white/75">Demo Email</p>
                  <p className="mt-1 font-bold">{demoEmail}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wide text-white/75">Demo Password</p>
                  <p className="mt-1 font-bold">{demoPassword}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-primary/10 bg-white p-8 shadow-xl md:p-10">
            <div className="mb-8 space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary-dark">Login</h2>
              <p className="text-slate-500">Use your admin account to access the dashboard.</p>
            </div>
            <form className="space-y-5" onSubmit={handleLogin}>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@gmail.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Password</span>
                <input
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="admin123"
                  autoComplete="current-password"
                  required
                />
              </label>
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
              )}
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-white transition hover:bg-primary-light"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                Sign In
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full bg-primary px-6 py-6 text-white lg:min-h-screen lg:w-72">
          <div className="mb-8 flex items-center gap-3">
            <img src="/chadeinaag.jpg" alt="Chade Inaag" className="h-10 w-10 rounded-xl" />
            <div>
              <h1 className="text-lg font-bold tracking-tight">CHADE INAAG</h1>
              <p className="text-xs font-medium text-green-200">Admin Portal</p>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            <button
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activePage === "overview" ? "bg-white/15 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setActivePage("overview")}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Dashboard
            </button>
            <button
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activePage === "menu" ? "bg-white/15 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setActivePage("menu")}
            >
              <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
              Menu Management
            </button>
            <button
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activePage === "users" ? "bg-white/15 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setActivePage("users")}
            >
              <span className="material-symbols-outlined text-[20px]">group</span>
              Admin Users
            </button>
            <button
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activePage === "branches" ? "bg-white/15 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setActivePage("branches")}
            >
              <span className="material-symbols-outlined text-[20px]">store</span>
              Branches
            </button>
          </nav>

          <button
            className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/20"
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </aside>

        <main className="flex-1 px-6 py-8 lg:px-10">
          {activePage === "overview" ? (
            <section className="space-y-6">
              <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-primary-dark">Dashboard Overview</h2>
                  <p className="mt-1 text-slate-500">Quick insights for today&apos;s operations.</p>
                </div>
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-light" onClick={() => setActivePage("menu")}>
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add New Food
                </button>
              </header>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Total Menu Items</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{menuItems.length}</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Items Active</p>
                  <p className="mt-2 text-3xl font-black text-primary">{activeCount}</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Estimated Ticket Total</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{currency(estimatedRevenue)}</p>
                </article>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <h3 className="text-lg font-bold text-slate-900">Menu Snapshot</h3>
                  <button
                    className="text-sm font-semibold text-primary transition hover:text-primary-light"
                    onClick={() => setActivePage("menu")}
                  >
                    Open Menu Management
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.slice(0, 5).map((item) => (
                        <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-800">{currency(item.price)}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                item.active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {item.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ) : activePage === "menu" ? (
            <section className="space-y-6">
              <header className="space-y-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-primary-dark">Menu Management</h2>
                <p className="text-slate-500">Manage food items, update pricing, and control item availability.</p>
              </header>

              <form className="grid grid-cols-1 gap-4 md:grid-cols-12 items-end rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={addItem}>
                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Food Name</label>
                  <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="e.g. Z1 Paa" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Category</label>
                  <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} required>
                    <option value="" disabled>Select...</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-primary-dark font-black ml-1">Price (₱)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₱</span>
                    <input className="h-11 w-full rounded-xl border-2 border-primary/20 bg-primary/5 pl-7 pr-3 text-sm font-bold text-primary-dark focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} required />
                  </div>
                </div>
                <div className="md:col-span-5 space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Short Description</label>
                  <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Describe the food..." value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
                </div>
                <div className="md:col-span-6 space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Upload Picture</label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                      required
                    />
                    <label
                      htmlFor="imageUpload"
                      className="h-11 w-full flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-500 cursor-pointer hover:border-primary hover:bg-primary/5 hover:text-primary transition-all overflow-hidden"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                      {newItem.image ? (
                        <span className="truncate text-primary-dark font-medium italic">Image Selected</span>
                      ) : (
                        <span>Choose from computer...</span>
                      )}
                      {newItem.image && (
                        <div className="ml-auto h-8 w-8 rounded-lg overflow-hidden border border-primary/20">
                          <img src={newItem.image} className="h-full w-full object-cover" alt="Preview" />
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                <div className="md:col-span-4 flex items-center justify-between gap-2 h-11 bg-slate-50 rounded-xl px-4 border border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer" checked={newItem.active} onChange={(e) => setNewItem({ ...newItem, active: e.target.checked })} />
                    <span className="text-[11px] font-bold uppercase text-slate-600 group-hover:text-primary transition-colors">Active</span>
                  </label>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer" checked={newItem.unliRice} onChange={(e) => setNewItem({ ...newItem, unliRice: e.target.checked })} />
                    <span className="text-[11px] font-bold uppercase text-slate-600 group-hover:text-primary transition-colors">Unli Rice</span>
                  </label>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500/20 transition-all cursor-pointer" checked={newItem.bestSeller} onChange={(e) => setNewItem({ ...newItem, bestSeller: e.target.checked })} />
                    <span className="text-[11px] font-bold uppercase text-slate-600 group-hover:text-amber-500 transition-colors">Best Seller</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`h-11 w-full flex items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-lg transition-all ${
                      isSubmitting 
                        ? "bg-slate-400 cursor-not-allowed shadow-none" 
                        : "bg-primary shadow-primary/20 hover:bg-primary-light hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">add_task</span>
                    )}
                    {isSubmitting ? "Adding..." : "Add"}
                  </button>
                </div>
              </form>

              {/* Feedback Messages */}
              <div className="flex flex-col gap-2 mt-2">
                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {error}
                  </div>
                )}
                {successMsg && (
                  <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    {successMsg}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <label className="relative md:col-span-2">
                  <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="Search menu items..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <select
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as "all" | "active" | "inactive")}
                >
                  <option value="all">Status: All</option>
                  <option value="active">Status: Active</option>
                  <option value="inactive">Status: Inactive</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredMenuItems.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-black/65 px-2 py-1 text-xs font-bold text-white">{item.category}</span>
                        {item.unliRice && (
                          <span className="rounded-lg bg-primary/90 px-2 py-1 text-xs font-bold text-white flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">potted_plant</span>
                            Unli Rice
                          </span>
                        )}
                        {item.bestSeller && (
                          <span className="rounded-lg bg-amber-500/90 px-2 py-1 text-xs font-bold text-white flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">star</span>
                            Best Seller
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4 p-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[10px] font-black uppercase tracking-wider transition-all border ${
                            item.unliRice 
                              ? "bg-primary text-white border-transparent shadow-md shadow-primary/20" 
                              : "bg-slate-50 text-slate-400 border-slate-200 opacity-60 hover:opacity-100"
                          }`}
                          onClick={() => toggleUnliRice(item.id)}
                        >
                          <span className="material-symbols-outlined text-[14px]">{item.unliRice ? 'check_circle' : 'circle'}</span>
                          Unli Rice
                        </button>
                        <button
                          className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[10px] font-black uppercase tracking-wider transition-all border ${
                            item.bestSeller 
                              ? "bg-amber-500 text-white border-transparent shadow-md shadow-amber-500/20" 
                              : "bg-slate-50 text-slate-400 border-slate-200 opacity-60 hover:opacity-100"
                          }`}
                          onClick={() => toggleBestSeller(item.id)}
                        >
                          <span className="material-symbols-outlined text-[14px]">{item.bestSeller ? 'stars' : 'circle'}</span>
                          Best Seller
                        </button>
                        <button
                          className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[10px] font-black uppercase tracking-wider transition-all border ${
                            item.active 
                              ? "bg-green-600 text-white border-transparent shadow-md shadow-green-600/20" 
                              : "bg-red-500 text-white border-transparent shadow-md shadow-red-500/20"
                          }`}
                          onClick={() => toggleItemStatus(item.id)}
                        >
                          <span className="material-symbols-outlined text-[14px]">{item.active ? 'visibility' : 'visibility_off'}</span>
                          {item.active ? "Active" : "Hidden"}
                        </button>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block ml-1">Current Price</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-primary-dark">₱</span>
                            <input
                              type="number"
                              className="h-10 w-28 rounded-xl border-2 border-primary/10 bg-primary/5 pl-7 pr-3 text-sm font-black text-primary-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                              value={item.price}
                              onChange={(event) => updatePrice(item.id, Number(event.target.value))}
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Display</p>
                          <p className="text-lg font-black text-slate-900">{currency(item.price)}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredMenuItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <p className="font-semibold text-slate-700">No items matched your filters.</p>
                  <p className="mt-1 text-sm text-slate-500">Try another search or set status back to All.</p>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
                Active: <span className="font-bold text-primary">{activeCount}</span> · Inactive:{" "}
                <span className="font-bold text-slate-800">{inactiveCount}</span>
              </div>
            </section>
          ) : activePage === "branches" ? (
            <section className="space-y-6">
              <header className="space-y-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-primary-dark">Branch Management</h2>
                <p className="text-slate-500">Add, edit, and manage your restaurant branches and locations.</p>
              </header>

              {/* Add Branch Form */}
              <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4" onSubmit={addBranch}>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">add_business</span>
                  Add New Branch
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Branch Name</label>
                    <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="e.g. Valencia City - Main Branch" value={newBranch.name} onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })} required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Status</label>
                    <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" value={newBranch.status} onChange={(e) => setNewBranch({ ...newBranch, status: e.target.value as "open" | "coming-soon" })}>
                      <option value="open">Open</option>
                      <option value="coming-soon">Coming Soon</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Address</label>
                    <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Full address" value={newBranch.address} onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })} required />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Operating Hours</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const).map((day) => (
                        <div key={day} className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                          <input
                            type="checkbox"
                            id={`day-${day}`}
                            checked={newBranch.hours[day].open}
                            onChange={(e) => setNewBranch({
                              ...newBranch,
                              hours: {
                                ...newBranch.hours,
                                [day]: { ...newBranch.hours[day], open: e.target.checked }
                              }
                            })}
                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                          />
                          <div className="flex-1 min-w-0">
                            <label htmlFor={`day-${day}`} className="text-sm font-semibold text-slate-700 capitalize block">{day}</label>
                            {newBranch.hours[day].open ? (
                              <div className="flex items-center gap-1 mt-1">
                                <input
                                  type="time"
                                  value={newBranch.hours[day].openTime}
                                  onChange={(e) => setNewBranch({
                                    ...newBranch,
                                    hours: {
                                      ...newBranch.hours,
                                      [day]: { ...newBranch.hours[day], openTime: e.target.value }
                                    }
                                  })}
                                  className="w-20 h-7 text-xs rounded border border-slate-200 px-1"
                                />
                                <span className="text-xs text-slate-400">to</span>
                                <input
                                  type="time"
                                  value={newBranch.hours[day].closeTime}
                                  onChange={(e) => setNewBranch({
                                    ...newBranch,
                                    hours: {
                                      ...newBranch.hours,
                                      [day]: { ...newBranch.hours[day], closeTime: e.target.value }
                                    }
                                  })}
                                  className="w-20 h-7 text-xs rounded border border-slate-200 px-1"
                                />
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 italic">Closed</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Phone</label>
                    <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="+63 912 345 6789" value={newBranch.phone} onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Email</label>
                    <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="branch@chadenanag.com" value={newBranch.email} onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Google Maps URL</label>
                    <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="https://goo.gl/maps/..." value={newBranch.mapUrl} onChange={(e) => setNewBranch({ ...newBranch, mapUrl: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Branch Photo</label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleBranchImageChange} className="hidden" id="branchImageUpload" />
                      <label htmlFor="branchImageUpload" className="h-11 w-full flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-500 cursor-pointer hover:border-primary hover:bg-primary/5 hover:text-primary transition-all overflow-hidden">
                        <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                        {newBranch.image ? <span className="truncate text-primary-dark font-medium italic">Image Selected</span> : <span>Choose photo...</span>}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Branch Features</label>
                  <div className="flex flex-wrap gap-2">
                    {branchFeatures.map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => toggleBranchFeature(feature)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                          newBranch.features.includes(feature)
                            ? "bg-primary text-white border-transparent shadow-md shadow-primary/20"
                            : "bg-slate-50 text-slate-400 border-slate-200 opacity-60 hover:opacity-100"
                        }`}
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
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white shadow-lg transition-all ${
                    isSubmitting ? "bg-slate-400 cursor-not-allowed shadow-none" : "bg-primary shadow-primary/20 hover:bg-primary-light hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {isSubmitting ? <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">add_task</span>}
                  {isSubmitting ? "Adding..." : "Add Branch"}
                </button>
              </form>

              {/* Feedback Messages */}
              <div className="flex flex-col gap-2">
                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {error}
                  </div>
                )}
                {successMsg && (
                  <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    {successMsg}
                  </div>
                )}
              </div>

              {/* Branch Cards */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {branches.map((branch) => (
                  <article key={branch.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {branch.image ? (
                        <img src={branch.image} alt={branch.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-slate-200">
                          <span className="material-symbols-outlined text-4xl text-slate-400">store</span>
                        </div>
                      )}
                      {branch.status === "coming-soon" && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            Coming Soon
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${branch.status === "open" ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}>
                          <span className="material-symbols-outlined text-[14px]">{branch.status === "open" ? "check_circle" : "schedule"}</span>
                          {branch.status === "open" ? "OPEN" : "SOON"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 p-4">
                      <h3 className="text-lg font-bold text-slate-900">{branch.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">location_on</span>
                          <span className="text-slate-600">{branch.address}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">schedule</span>
                          <div className="text-slate-600 text-xs">
                            {(() => {
                              const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
                              const openDays = days.filter(d => branch.hours[d]?.open);
                              if (openDays.length === 0) return <span className="italic">Closed all days</span>;
                              const formatTime = (t: string) => {
                                const [h, m] = t.split(":");
                                const hour = parseInt(h);
                                const ampm = hour >= 12 ? "PM" : "AM";
                                const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                                return `${displayHour}:${m} ${ampm}`;
                              };
                              const grouped = [] as { days: string[], openTime: string, closeTime: string }[];
                              let current: { days: string[], openTime: string, closeTime: string } | null = null;
                              openDays.forEach((day) => {
                                const hrs = branch.hours[day];
                                const timeKey = `${hrs.openTime}-${hrs.closeTime}`;
                                if (current && `${current.openTime}-${current.closeTime}` === timeKey) {
                                  current.days.push(day);
                                } else {
                                  if (current) grouped.push(current);
                                  current = { days: [day], openTime: hrs.openTime, closeTime: hrs.closeTime };
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
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">phone</span>
                          <span className="text-slate-600">{branch.phone || "N/A"}</span>
                        </div>
                      </div>
                      {branch.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                          {branch.features.map((f) => (
                            <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                              <span className="material-symbols-outlined text-[12px]">
                                {f === "Free WiFi" ? "wifi" : f === "Parking Available" ? "local_parking" : f === "Air Conditioned" ? "ac_unit" : f === "Unli Rice" ? "rice_bowl" : f === "Outdoor Seating" ? "deck" : f === "Delivery" ? "delivery_dining" : f === "Function Room" ? "event" : "check_circle"}
                              </span>
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <button
                          className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[10px] font-black uppercase tracking-wider transition-all border ${branch.status === "open" ? "bg-green-600 text-white border-transparent shadow-md shadow-green-600/20" : "bg-amber-500 text-white border-transparent shadow-md shadow-amber-500/20"}`}
                          onClick={() => updateBranchStatus(branch.id, branch.status === "open" ? "coming-soon" : "open")}
                        >
                          <span className="material-symbols-outlined text-[14px]">{branch.status === "open" ? "check_circle" : "schedule"}</span>
                          {branch.status === "open" ? "Open" : "Coming Soon"}
                        </button>
                        <button
                          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[10px] font-black uppercase tracking-wider bg-red-500 text-white border-transparent shadow-md shadow-red-500/20 transition-all hover:bg-red-600"
                          onClick={() => deleteBranchItem(branch.id)}
                        >
                          <span className="material-symbols-outlined text-[14px]">delete</span>
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {branches.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">store</span>
                  <p className="font-semibold text-slate-700">No branches yet.</p>
                  <p className="mt-1 text-sm text-slate-500">Add your first branch above.</p>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
                Total Branches: <span className="font-bold text-primary">{branches.length}</span> · Open:{" "}
                <span className="font-bold text-green-600">{branches.filter((b) => b.status === "open").length}</span> · Coming Soon:{" "}
                <span className="font-bold text-amber-500">{branches.filter((b) => b.status === "coming-soon").length}</span>
              </div>
            </section>
          ) : (
            <section className="space-y-6">
              <header className="space-y-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-primary-dark">Admin Users</h2>
                <p className="text-slate-500">Add admin accounts by email.</p>
              </header>
              <form
                className="grid grid-cols-1 gap-3 md:grid-cols-3 items-end rounded-2xl border border-slate-200 bg-white p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch("/api/admin/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ email: adminEmail }),
                  })
                    .then(async (r) => {
                      const data = await r.json();
                      if (!r.ok) return;
                      setAdminUsers((current) => [data, ...current]);
                      setAdminEmail("");
                    })
                    .catch(() => {});
                }}
              >
                <input
                  className="h-11 rounded-xl border border-slate-200 px-3 text-sm md:col-span-2"
                  placeholder="Admin email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-light"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  Add Admin
                </button>
              </form>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <h3 className="text-lg font-bold text-slate-900">Current Admins</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((u) => (
                        <tr key={u.id} className="border-b border-slate-100 last:border-b-0">
                          <td className="px-6 py-4 text-sm font-medium text-slate-800">{u.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
