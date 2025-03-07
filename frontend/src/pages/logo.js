import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000); // Redirect after 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" /> {/* Access logo from public directory */}
    </div>
  );
}

export default LogoPage;
