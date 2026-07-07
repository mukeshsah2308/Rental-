import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import config from '../config';
const { API_BASE_URL } = config;
export default function userproperty() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [propertylist, setPropertyList] = useState([]);
    useEffect(() => {
        const fetchUserProperty = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error("No user ID found in localStorage");
                    return;
                }

                const response = await fetch(`${API_BASE_URL}/api/properties/user/${userId}`);
                if (!response.ok) {
                    throw new Error("Network response was not okay");
                }
                const data = await response.json();
                setPropertyList(data);
                console.log(data);
            } catch (err) {
                console.error("Error fetching user properties:", err);
            }
        }
        fetchUserProperty();
    }, [])
    return (
        <>
            <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
                {/* Sidebar */}
                <Sidebar
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-y-auto lg:ml-64">
                    {/* Header */}
                    <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                </div>
                <div className="w-full h-dvh bg-sky-300">
                    
                </div>
            </div>
        </>
    )
}