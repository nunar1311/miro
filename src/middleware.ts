import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "./types/auth";

const isProtected = [
    "/workspace(*)",
    "/create-workspace)",
    "/onboarding",
];

export async function middleware(request: NextRequest) {
    const { data } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    const isAuthenticated = !!data?.user;

    if (
        isProtected.includes(request.nextUrl.pathname) &&
        !isAuthenticated
    ) {
        return NextResponse.redirect(new URL("/auth", request.url));
    } else if (
        request.nextUrl.pathname === "/auth" &&
        isAuthenticated
    ) {
        return NextResponse.redirect(
            new URL("/workspace", request.url),
        );
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
