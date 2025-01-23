"use client";

import { useState, useEffect } from "react";

interface Item {
    Menu_Title: string;
    Profile_Type: string;
    Primary_Color: string;
    Secondary_color: string;
    Background_Image: string;
    Item_Image: string;
    Section: string;
    Item_id: number;
    Name: string;
    Description: string;
    Price: string;
    profile: number;
}

interface PromotionItem {
    Menu_Title: string;
    Profile_Type: string;
    Primary_Color: string;
    Secondary_color: string;
    Background_Image: string;
    Item_Image: string;
    Section: string;
    Item_id: number;
    Name: string;
    Description: string;
    Price: string;
    profile: number;
}

interface Company {
    _id: string;
    companyName: string;
    folderName: string;
    hojas: {
        Hoja1: Item[];
        Promotion: PromotionItem[];
    };
    status_Companies: boolean;
    visits: number;
    licence: any[];
    infoVisits: any[];
    loyaltyProgram: any[];
    delivery: any[];
    trafficStats: any[];
    marketingCampaigns: any[];
    giftCards: any[];
    latitude: string;
    longitude: string;
    createAt: string; // O Date si prefieres manejar objetos Date
    updateAt: string; // O Date si prefieres manejar objetos Date
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch("/api/companies");
                if (!res.ok) {
                    const errorData = await res.json(); // Intenta parsear JSON para obtener mensaje de error
                    throw new Error(errorData.error || `Error HTTP ${res.status}`); // Usa mensaje específico o uno genérico
                }
                const data = await res.json();
                setCompanies(data);
            } catch (err: any) {
                console.error("Error fetching companies:", err);
                setError(err.message || "Error al cargar las compañías.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Compañías</h1>
            <ul>
                {companies.map((company) => (
                    <li key={company._id}>
                        <h2>{company.companyName}</h2>
                        {/* Ejemplo de cómo acceder a datos anidados: */}
                        <h3>Hoja 1</h3>
                        <ul>
                            {company.hojas.Hoja1.map((item) => (
                                <li key={item.Name}>
                                    {item.Name} - {item.Price}
                                </li>
                            ))}
                        </ul>
                        <h3>Promociones</h3>
                        <ul>
                            {company.hojas.Promotion.map((promotion) => (
                                <li key={promotion.Name}>
                                    {promotion.Name} - {promotion.Price}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}