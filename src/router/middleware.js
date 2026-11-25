// Chặn trang cần đăng nhập khi chưa có token; đã đăng nhập thì không vào lại trang login.
export function checkAccessMiddleware(to) {
  const token = localStorage.getItem("token");
  const isAuthRoute = to.matched.some((item) => item.meta.isAuth);
  if (isAuthRoute && !token) return { name: "login" };
  if (token && to.name === "login") return { name: "Home" };
  return true;
}
