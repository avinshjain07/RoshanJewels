import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'roshan_jewels_user_session';
const ORDERS_STORAGE_KEY = 'roshan_jewels_orders';

// Initial dummy patron for demonstration & testing
const DEMO_USER = {
  id: 'usr_patron_01',
  name: 'Avinash Jain',
  email: 'avinshjain521@gmail.com',
  phone: '+91 82249 98809',
  vipTier: 'Heritage Privilege Patron',
  membershipId: 'RJ-VIP-1965-88',
  addresses: [
    {
      id: 'addr_01',
      name: 'Avinash Jain',
      phone: '+91 82249 98809',
      addressLine1: 'Flat 402, Royal Palms Residency',
      addressLine2: 'Near Yeshwant Club, Race Course Road',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      isDefault: true,
      tag: 'Home'
    }
  ]
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Pre-seed with demo user on first load for a seamless out-of-the-box VIP experience
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_USER));
      return DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'forgot'

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email, password) => {
    // Simulated luxury auth validation
    const trimmedEmail = (email || '').trim().toLowerCase();
    const newUser = {
      id: `usr_${Date.now()}`,
      name: trimmedEmail.split('@')[0].replace('.', ' ').replace(/^./, c => c.toUpperCase()),
      email: trimmedEmail,
      phone: '+91 98765 43210',
      vipTier: 'Heritage Privilege Patron',
      membershipId: `RJ-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
      addresses: user?.addresses?.length ? user.addresses : DEMO_USER.addresses
    };
    setUser(newUser);
    closeAuthModal();
    return { success: true, user: newUser };
  };

  const register = async ({ name, email, phone, password }) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      vipTier: 'Privilege Member',
      membershipId: `RJ-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
      addresses: []
    };
    setUser(newUser);
    closeAuthModal();
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  const addAddress = (address) => {
    const newAddr = {
      id: `addr_${Date.now()}`,
      ...address,
      isDefault: user?.addresses?.length === 0 || address.isDefault
    };

    setUser(prev => {
      if (!prev) return prev;
      let updatedList = prev.addresses || [];
      if (newAddr.isDefault) {
        updatedList = updatedList.map(a => ({ ...a, isDefault: false }));
      }
      return { ...prev, addresses: [...updatedList, newAddr] };
    });
    return newAddr;
  };

  const removeAddress = (addressId) => {
    setUser(prev => {
      if (!prev) return prev;
      const filtered = (prev.addresses || []).filter(a => a.id !== addressId);
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return { ...prev, addresses: filtered };
    });
  };

  const setDefaultAddress = (addressId) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = (prev.addresses || []).map(a => ({
        ...a,
        isDefault: a.id === addressId
      }));
      return { ...prev, addresses: updated };
    });
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: order.id || `RJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed & Karigari Scheduled',
      timeline: [
        { title: 'Order Placed & Verified', time: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }), done: true },
        { title: 'Quality Purity & Hallmark Inspection', time: 'Estimated within 24 hours', done: false },
        { title: 'Insured Courier Handover (Sequel / BlueDart)', time: 'Pending', done: false },
        { title: 'Dispatched to Delivery Address', time: 'Pending', done: false }
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
