import { useState } from "react";
import type { FormEvent } from "react";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const demoEmail = "admin@gmail.com";
const demoPassword = "admin123";

export default function LoginModal({ onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = email.trim().toLowerCase() === demoEmail && password === demoPassword;
    if (!ok) {
      setError("Invalid credentials. Use the demo admin account.");
      return;
    }
    setError("");
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-primary/10 mx-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img src="/chadeinaag.jpg" alt="Change Inaag" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">CHANGE INAAG</p>
              <h3 className="text-lg font-bold text-slate-900">Admin Login</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={onSubmit} className="px-6 py-6 space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              required
            />
          </label>
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}
          <div className="flex items-center gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="h-12 px-5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="h-12 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary-light">
              Sign In
            </button>
          </div>
        </form>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Demo Email</p>
              <p className="font-bold text-slate-900">{demoEmail}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Demo Password</p>
              <p className="font-bold text-slate-900">{demoPassword}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
