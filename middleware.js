import { NextResponse } from "next/server";

export function middleware(request) {
  let isLogin = request.cookies.get("logged"); // Cuando alguien está logeado tendremos esta cookie.

  // Si no está la cookie la unica ruta disponible será "/", no estarán disponibles las rutas en matcher.
  if (!isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/profile", "/create-prompt", "/update-prompt"],
};
