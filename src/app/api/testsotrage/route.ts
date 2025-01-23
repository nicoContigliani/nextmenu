// import type { NextApiRequest, NextApiResponse } from "next";
// import { getStorage, ref, listAll } from "firebase/storage";
// import { initializeApp, FirebaseOptions } from "firebase/app";

// // Leer configuración desde variables de entorno
// const firebaseConfig: FirebaseOptions = JSON.parse(process.env.FIREBASE_CONFIG as string);

// // Inicializar Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// // API handler
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     try {
//       // Crear referencia a la raíz del bucket
//       const storageRef = ref(storage, "/");

//       // Listar carpetas y archivos en la raíz
//       const result = await listAll(storageRef);

//       // Respuesta con las carpetas encontradas
//       const folders = result.prefixes.map((folder) => folder.name);
//       res.status(200).json({
//         success: true,
//         message: "Conexión exitosa a Firebase Storage.",
//         folders,
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: "Error al conectar con Firebase Storage.",
//         error: error.message,
//       });
//     }
//   } else {
//     res.setHeader("Allow", ["GET","POST", "PUT", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import { getStorage, ref, listAll } from "firebase/storage";
import { initializeApp, FirebaseOptions } from "firebase/app";

// Leer configuración desde variables de entorno
const firebaseConfig: FirebaseOptions = JSON.parse(process.env.FIREBASE_CONFIG as string);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            // Crear referencia a la raíz del bucket
            const storageRef = ref(storage, "/");

            // Listar carpetas y archivos en la raíz
            const result = await listAll(storageRef);

            // Respuesta con las carpetas encontradas
            const folders = result.prefixes.map((folder) => folder.name);
            res.status(200).json({
                success: true,
                message: "Conexión exitosa a Firebase Storage.",
                folders,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error al conectar con Firebase Storage.",
                error: error.message,
            });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        console.log(req.method);

    }
}
