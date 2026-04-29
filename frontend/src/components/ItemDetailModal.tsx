import React from "react";

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

interface ItemDetailModalProps {
  item: MenuItem;
  onClose: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:p-0">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-[32px] bg-white dark:bg-[#1a2c20] shadow-2xl transition-all sm:my-8 animate-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 text-slate-900 dark:text-white backdrop-blur-md transition hover:bg-white dark:hover:bg-black/60 shadow-lg"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative h-72 w-full md:h-auto md:w-1/2 overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img 
              src={item.image} 
              alt={item.name} 
              className="h-full w-full object-cover"
            />
            {/* Badges on Image */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {item.bestSeller && (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-pulse">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  BEST SELLER
                </span>
              )}
              {item.unliRice && (
                <span className="inline-flex items-center gap-1 bg-accent-yellow text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                  <span className="material-symbols-outlined text-[14px]">rice_bowl</span>
                  UNLI RICE
                </span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex w-full flex-col p-8 md:w-1/2">
            <div className="mb-6">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase border border-primary/20 mb-3">
                {item.category}
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {item.name}
              </h2>
              <div className="mt-2 flex items-center gap-1 text-accent-yellow">
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star_half</span>
                <span className="ml-1 text-xs font-bold text-slate-400">4.5 (120+ reviews)</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Price</p>
                <p className="text-3xl font-black text-primary">₱{item.price}</p>
              </div>
              <button className="flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-white shadow-xl shadow-primary/30 transition hover:bg-primary-light hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0">
                <span className="material-symbols-outlined">shopping_bag</span>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;
