import { cn } from "@/lib/utils";
import { Circle, FastForward } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex flex-1 flex-row-reverse h-screen">
            <section className="w-1/3 flex mx-auto items-center">
                <div className="flex flex-row items-center w-full max-w-sm min-w-min mx-auto md:mx-0 my-auto relative md:-left-4">
                    <Link
                        href={"/"}
                        className=" bg-background flex items-center text-4xl py-6 gap-2"
                    >
                        <FastForward className="fill-current text-primary -rotate-45 size-9 pl-1 pb-1" />
                        <p className="font-bold">Mira</p>
                    </Link>
                    <div
                        className={cn(
                            "items-start flex absolute gap-x-4 top-36 left-2 w-full",
                        )}
                    >
                        <div className="bg-background text-primary">
                            <Circle
                                strokeWidth={2.3}
                                className="w-2 h-2 m-1"
                            />
                        </div>
                        <div className="text-sm -mt-1">
                            Connect every team, task and project
                            together with Qix{" "}
                        </div>
                    </div>
                </div>
            </section>
            <div className="border-r transition-all flex items-center justify-center w-2/3">
                {children}
            </div>
        </main>
    );
};

export default Layout;
