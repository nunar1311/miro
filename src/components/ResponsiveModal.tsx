import { ReactNode } from "react";
import { useMedia } from "react-use";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Drawer, DrawerContent, DrawerHeader } from "./ui/drawer";

interface ResponsiveModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export const ResponsiveModal = ({
    open,
    onOpenChange,
    children,
}: ResponsiveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="p-0">
                    <DialogHeader className="sr-only">
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="p-0">
                <DrawerHeader className="sr-only">
                    <DialogTitle></DialogTitle>
                </DrawerHeader>
                <div className="flex flex-row w-full h-auto max-w-full">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
};
