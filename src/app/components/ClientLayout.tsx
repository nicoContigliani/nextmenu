"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // Ajusta la ruta según sea necesario

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}