import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra localStorage để tự động đăng nhập
    const savedUser = localStorage.getItem("auto_marketing_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mô phỏng API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mô phỏng validation
      if (email === "admin@example.com" && password === "123456") {
        const userData = {
          id: 1,
          email: email,
          firstName: "Admin",
          lastName: "User",
          avatar: null,
        };

        setUser(userData);
        localStorage.setItem("auto_marketing_user", JSON.stringify(userData));

        return { success: true, user: userData };
      } else {
        return { success: false, error: "Email hoặc mật khẩu không đúng" };
      }
    } catch (error) {
      return { success: false, error: "Có lỗi xảy ra khi đăng nhập" };
    }
  };

  const register = async (userData) => {
    try {
      // Mô phỏng API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        avatar: null,
      };

      setUser(newUser);
      localStorage.setItem("auto_marketing_user", JSON.stringify(newUser));

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: "Có lỗi xảy ra khi đăng ký" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auto_marketing_user");
  };

  const updateProfile = async (profileData) => {
    try {
      // Mô phỏng API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem("auto_marketing_user", JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: "Có lỗi xảy ra khi cập nhật thông tin" };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
