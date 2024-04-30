export function checkAccessMiddleware(to, from, next) {
  const token = localStorage.getItem("token");
  const isAuthRoute = to.matched.some((item) => item.meta.isAuth);
  if (isAuthRoute && token) return next();
  if (token && to.name === "login") next({ name: "Home" });
  if (isAuthRoute) return next({ name: "login" });
  next();
}
