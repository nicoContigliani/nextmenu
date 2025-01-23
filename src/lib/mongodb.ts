// import mongoose, { Mongoose } from "mongoose";

// const MONGODB_URI: string = process.env.MONGODB_URI || "";

// interface Cached {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// }

// // Declare the global mongoose property
// declare global {
//   var mongoose: Cached | undefined; // Important: Make it optional with undefined
// }

// let cached: Cached;

// // Initialize cached only if global.mongoose exists, otherwise create it.
// if (global.mongoose) {
//     cached = global.mongoose;
// } else {
//     cached = global.mongoose = { conn: null, promise: null };
// }


// export async function connectToDatabase(): Promise<Mongoose> {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     try {
//       cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
//     } catch (error) {
//       console.error("Error connecting to database:", error);
//       cached.promise = null; // Reset the promise on error
//       throw error;
//     }
//   }

//   try {
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (error) {
//     console.error("Error awaiting database connection:", error);
//     cached.promise = null; // Reset the promise on error
//     throw error;
//   }
// }


import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: Cached | undefined;
}

let cached: Cached;

if (global.mongoose) {
  cached = global.mongoose;
} else {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);

      mongoose.connection.on('connected', () => {
        console.log('Mongoose connected!');
      });

      mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected!');
      });
    } catch (error) {
      console.error("Error connecting to database:", error);
      cached.promise = null;
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error awaiting database connection:", error);
    cached.promise = null;
    throw error;
  }
}