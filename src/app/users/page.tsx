"use client"
import { useState, useEffect } from "react";

type User = {
    _id: string;
    name: string;
    email: string;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch users on component mount and handle errors
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users");
         
                if (!res.ok) {
                    // throw new Error("Failed to fetch users");
                    console.log("error get user ")
                }
                const data = await res?.json();
                console.log("🚀 ~ fetchUsers ~ data:", data)
                setUsers(data);
            } catch (err:any) {
                console.error("Error fetching users:", err);
                setError(err.message || "An error occurred while fetching users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle form submission with error handling
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            if (!res.ok) {
                const errData = await res.json();
                setError(errData.error || "Failed to create user");
                throw new Error(errData.error || "Failed to create user"); // Re-throw for potential boundary handling
            }

            const newUser = await res.json();
            setUsers((prev) => [...prev, newUser]);
            setName("");
            setEmail("");
        } catch (err) {
            console.error("Error creating user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Users</h1>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add User"}
                </button>
            </form>

            {/* <ul>
                {users && users?.map((user) => (
                    <li key={user?._id}>
                        {user?.name} - {user?.email}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}