import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'roshan_jewels_user_session';
const ORDERS_STORAGE_KEY = 'roshan_jewels_orders';

const REGISTERED_USERS_KEY = 'roshan_jewels_registered_patrons';

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Initial dummy patron for demonstration & testing
const DEMO_USER = {
  id: 'usr_patron_01',
  name: 'Avinash Jain',
  email: 'avinshjain521@gmail.com',
  password: 'Roshan@1965',
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

const DEFAULT_REGISTERED_USERS = [DEMO_USER];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
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

  const getRegisteredUsers = () => {
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      if (!stored) {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(DEFAULT_REGISTERED_USERS));
        return DEFAULT_REGISTERED_USERS;
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(DEFAULT_REGISTERED_USERS));
        return DEFAULT_REGISTERED_USERS;
      }
      if (!parsed.some(u => u.email.toLowerCase() === DEMO_USER.email.toLowerCase())) {
        parsed.push(DEMO_USER);
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return DEFAULT_REGISTERED_USERS;
    }
  };

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
    const trimmedEmail = (email || '').trim();
    if (!trimmedEmail) {
      throw new Error('Please enter your email address.');
    }
    if (!isValidEmail(trimmedEmail)) {
      throw new Error('Please enter a valid email address (e.g. name@domain.com).');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find(
      u => u.email.toLowerCase() === trimmedEmail.toLowerCase()
    );

    if (!existingUser) {
      throw new Error('No account found with this email. Please check your credentials or create an account.');
    }

    if (existingUser.password !== password) {
      throw new Error('Incorrect password. Please verify your credentials and try again.');
    }

    const { password: _, ...userSession } = existingUser;
    setUser(userSession);
    closeAuthModal();
    return { success: true, user: userSession };
  };

  const loginAsDemo = async () => {
    const demo = DEMO_USER;
    const { password: _, ...userSession } = demo;
    setUser(userSession);
    closeAuthModal();
    return { success: true, user: userSession };
  };

  const register = async ({ name, email, phone, password }) => {
    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim().toLowerCase();
    const trimmedPhone = (phone || '').trim();

    if (!trimmedName) {
      throw new Error('Please enter your full name.');
    }
    if (!trimmedEmail) {
      throw new Error('Please enter your email address.');
    }
    if (!isValidEmail(trimmedEmail)) {
      throw new Error('Please enter a valid email address (e.g. name@domain.com).');
    }
    if (!trimmedPhone) {
      throw new Error('Please enter your mobile phone number.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters in length.');
    }

    const registeredUsers = getRegisteredUsers();
    if (registeredUsers.some(u => u.email.toLowerCase() === trimmedEmail)) {
      throw new Error('An account with this email address already exists. Please sign in instead.');
    }

    const newRegisteredUser = {
      id: `usr_${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      password: password,
      vipTier: 'Privilege Member',
      membershipId: `RJ-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
      addresses: []
    };

    const updatedUsers = [...registeredUsers, newRegisteredUser];
    try {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));
    } catch {
      // Ignore quota error if storage is full
    }

    const { password: _, ...userSession } = newRegisteredUser;
    setUser(userSession);
    closeAuthModal();
    return { success: true, user: userSession };
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
        loginAsDemo,
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
