import { Link } from "react-router-dom";

export default function PropertyUpload() {
    return (
        <div>
            <Link
                to="/list-property/amenities"
                className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >

                Back to Amenities
            </Link>
        </div>
    );
}