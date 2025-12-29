import { Navbar } from "@/components/web/NavBar";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
    return <div><Navbar />{children}</div>;
}