// // app/api/companies/route.ts (o pages/api/companies.ts si usas pages/api)
// import { NextResponse } from "next/server"; // Importa NextResponse (necesario en app directory)
// import { connectToDatabase } from "@/lib/mongodb";
// import Company from "@/models/Company";

// export async function GET() {
//   try {
//     await connectToDatabase();

//     // Encuentra todas las compañías. El objeto vacío {} en find() significa "todas".
//     const companies = await Company.find({});
//     console.log("🚀 ~ GET ~ companies:", companies)

//     // Si no se encuentran compañías, devuelve un array vacío en lugar de null.
//     if (!companies) {
//       return NextResponse.json([], { status: 200 }); // Devuelve un array vacío
//     }

//     return NextResponse.json(companies, { status: 200 }); // Respuesta exitosa
//   } catch (error) {
//     console.error("Error al obtener las compañías:", error);
//     return NextResponse.json(
//       { error: "Error al obtener las compañías de la base de datos" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Company from "@/models/Company";

export async function GET() {
  try {
    await connectToDatabase();

    const companies = await Company.find({});
    console.log(" ~ GET ~ companies:", companies);

    if (companies.length === 0) { // Verifica si el array está vacío
      console.log("No se encontraron compañías, creando registro de ejemplo.");

      // Datos de ejemplo para la nueva compañía
      const newCompanyData = {
        companyName: "Nombre de la Compañía de Ejemplo",
        folderName: "Carpeta de Ejemplo",
        hojas: { Hoja1: [], Promotion: [] }, // Arrays vacíos para hojas y promociones
        status_Companies: true,
        visits: 0,
        licence: [],
        infoVisits: [],
        loyaltyProgram: [],
        delivery: [],
        trafficStats: [],
        marketingCampaigns: [],
        giftCards: [],
        latitude: "0",
        longitude: "0",
        createAt: new Date(),
        updateAt: new Date(),
      };

      try {
        const newCompany = new Company(newCompanyData);
        await newCompany.save();
        console.log("Compañía de ejemplo creada:", newCompany);
        return NextResponse.json([newCompany], { status: 200 }); // Devuelve un array con la nueva compañía
      } catch (creationError) {
        console.error("Error al crear la compañía de ejemplo:", creationError);
        return NextResponse.json({ error: "Error al crear la compañía inicial." }, { status: 500 });
      }
    }

    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las compañías:", error);
    return NextResponse.json(
      { error: "Error al obtener las compañías de la base de datos" },
      { status: 500 }
    );
  }
}