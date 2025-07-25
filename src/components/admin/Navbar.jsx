"use client"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { logout } from "../../api/admin/adminApi"
import { useDispatch } from "react-redux"
import { adminLogout } from "../../redux/slices/adminAuthSlice"

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      // Glass effect styling
      background: "rgba(0, 0, 0, 0.8)",
      backdrop: `
        rgba(0, 0, 0, 0.6)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      customClass: {
        popup: "glass-popup",
        title: "glass-title",
        htmlContainer: "glass-text",
        confirmButton: "glass-confirm-btn",
        cancelButton: "glass-cancel-btn",
        icon: "glass-icon",
      },
      didOpen: () => {
        // Add custom CSS for glass effect
        const style = document.createElement("style")
        style.textContent = `
          .glass-popup {
            backdrop-filter: blur(20px) !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 20px !important;
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3) !important;
          }
          
          .glass-title {
            color: #ffffff !important;
            font-weight: 600 !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
          }
          
          .glass-text {
            color: #e5e7eb !important;
            font-weight: 400 !important;
          }
          
          .glass-confirm-btn {
            background: linear-gradient(135deg, #f59e0b, #f97316) !important;
            border: none !important;
            border-radius: 12px !important;
            font-weight: 600 !important;
            padding: 12px 24px !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3) !important;
          }
          
          .glass-confirm-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4) !important;
          }
          
          .glass-cancel-btn {
            background: rgba(107, 114, 128, 0.2) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 12px !important;
            color: #ffffff !important;
            font-weight: 600 !important;
            padding: 12px 24px !important;
            transition: all 0.3s ease !important;
          }
          
          .glass-cancel-btn:hover {
            background: rgba(107, 114, 128, 0.3) !important;
            transform: translateY(-2px) !important;
          }
          
          .glass-icon {
            border: 3px solid rgba(245, 158, 11, 0.3) !important;
            background: rgba(245, 158, 11, 0.1) !important;
            backdrop-filter: blur(10px) !important;
          }
          
          .swal2-backdrop-show {
            backdrop-filter: blur(5px) !important;
          }
        `
        document.head.appendChild(style)
      },
    })

    if (result.isConfirmed) {
      try {
        const response = await logout()

        // Success alert with glass effect
        await Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: "rgba(0, 0, 0, 0.8)",
          customClass: {
            popup: "glass-success-popup",
            title: "glass-title",
            htmlContainer: "glass-text",
            icon: "glass-success-icon",
          },
          didOpen: () => {
            const style = document.createElement("style")
            style.textContent = `
              .glass-success-popup {
                backdrop-filter: blur(20px) !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border: 1px solid rgba(34, 197, 94, 0.3) !important;
                border-radius: 20px !important;
                box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3) !important;
              }
              
              .glass-success-icon {
                border: 3px solid rgba(34, 197, 94, 0.3) !important;
                background: rgba(34, 197, 94, 0.1) !important;
                backdrop-filter: blur(10px) !important;
              }
            `
            document.head.appendChild(style)
          },
        })

        localStorage.removeItem("adminToken")
        dispatch(adminLogout())
        navigate("/admin")
      } catch (error) {
        console.error("Logout failed", error)

        // Error alert with glass effect
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Logout failed",
          icon: "error",
          confirmButtonColor: "#f59e0b",
          background: "rgba(0, 0, 0, 0.8)",
          customClass: {
            popup: "glass-error-popup",
            title: "glass-title",
            htmlContainer: "glass-text",
            confirmButton: "glass-confirm-btn",
            icon: "glass-error-icon",
          },
          didOpen: () => {
            const style = document.createElement("style")
            style.textContent = `
              .glass-error-popup {
                backdrop-filter: blur(20px) !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border: 1px solid rgba(239, 68, 68, 0.3) !important;
                border-radius: 20px !important;
                box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3) !important;
              }
              
              .glass-error-icon {
                border: 3px solid rgba(239, 68, 68, 0.3) !important;
                background: rgba(239, 68, 68, 0.1) !important;
                backdrop-filter: blur(10px) !important;
              }
            `
            document.head.appendChild(style)
          },
        })
      }
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80 text-white shadow-2xl border-b border-yellow-500/20">
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        <div className="flex items-center gap-2">
          <img
            src="https://yt3.googleusercontent.com/2n1mMw31wtZbE1ri4audS-SG9sMs0jY8vEJ4Sx9CFXTkkW3V5hmJl4xACqgsgfCw-nzOPYvE4Q=s160-c-k-c0x00ffffff-no-rj"
            alt="Admin Logo"
            className="w-10 h-10 rounded-full ring-2 ring-yellow-400/30 shadow-lg"
          />
          <h1 className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-2 px-6 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-white text-2xl hover:text-yellow-400 transition-colors">
            ☰
          </button>
          <button
            onClick={handleLogout}
            className="text-white text-sm backdrop-blur-md bg-white/10 border border-yellow-500/30 px-3 py-1 rounded-lg hover:bg-yellow-500/20 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
