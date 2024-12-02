// import { useState, useEffect } from 'react';
// import { Menu, X, Home, Users, MessageSquare, Settings, LogOut, Brain } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Layout = () => {
//   const navigate = useNavigate();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [userRole] = useState('client'); // For demo, would come from auth
//   const [currentPath, setCurrentPath] = useState('/'); // Simple navigation state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if token exists in localStorage
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     // Clear token from localStorage
//     localStorage.removeItem('token');
//     // Navigate to login page
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const getMenuItems = (role) => {
//     const commonItems = [
//       { label: 'Home', icon: Home, path: '/' }
//     ];

//     const roleSpecificItems = {
//       admin: [
//         { label: 'Manage Therapists', icon: Users, path: '/therapists' },
//         { label: 'Platform Activity', icon: MessageSquare, path: '/activity' },
//         { label: 'Settings', icon: Settings, path: '/settings' }
//       ],
//       therapist: [
//         { label: 'My Profile', icon: Users, path: '/profile' },
//         { label: 'Chat Requests', icon: MessageSquare, path: '/requests' },
//         { label: 'Settings', icon: Settings, path: '/settings' }
//       ],
//       client: [
//         { label: 'Find Therapist', icon: Users, path: '/find' },
//         { label: 'My Sessions', icon: MessageSquare, path: '/sessions' },
//         { label: 'Settings', icon: Settings, path: '/settings' }
//       ]
//     };

//     return [...commonItems, ...roleSpecificItems[role]];
//   };

//   const menuItems = getMenuItems(userRole);

//   const handleNavigation = (path) => {
//     setCurrentPath(path);
//     // On mobile, close sidebar after navigation
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation Bar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Left side */}
//             <div className="flex">
//               <button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 lg:hidden"
//               >
//                 {isSidebarOpen ? (
//                   <X className="h-6 w-6" />
//                 ) : (
//                   <Menu className="h-6 w-6" />
//                 )}
//               </button>
//               <div className="flex-shrink-0 flex items-center">
//                 <Brain className="h-6 w-6 text-teal-600" />
//                 <span className="ml-2 text-xl font-semibold text-teal-600">WellMind</span>
//               </div>
//             </div>

//             {/* Right side */}
//             <div className="flex items-center">
//               {isLoggedIn ? (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
//                 >
//                   <LogOut className="h-5 w-5 mr-2" />
//                   Logout
//                 </button>
//               ) : (
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => navigate('/login')}
//                     className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mr-2"
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={() => navigate('/register')}
//                     className="flex items-center px-3 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-md"
//                   >
//                     Register
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar and Main Content */}
//       <div className="flex">
//         {/* Sidebar */}
//         <aside 
//           className={`${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           } transform md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative w-64 bg-white shadow-sm h-screen`}
//         >
//           <div className="p-4">
//             <nav className="space-y-1">
//               {menuItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleNavigation(item.path)}
//                   className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
//                     currentPath === item.path
//                       ? 'text-teal-600 bg-teal-50'
//                       : 'text-gray-700 hover:bg-gray-100 hover:text-teal-600'
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   {item.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 {menuItems.find(item => item.path === currentPath)?.label || 'Welcome to WellMind'}
//               </h2>
//               <p className="text-gray-600">
//                 Your journey to mental wellness starts here. Connect with professional therapists and begin your path to a healthier mind.
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;



import { useState, useEffect } from 'react';
import { Menu, X, Home, Users, MessageSquare, Settings, LogOut, Brain } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole] = useState('client'); // For demo, would come from auth
  const [currentPath, setCurrentPath] = useState('/'); // Simple navigation state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Navigate to login page
    setIsLoggedIn(false);
    navigate('/');
  };

  const getMenuItems = (role) => {
    const commonItems = [
      { label: 'Home', icon: Home, path: '/' }
    ];

    const roleSpecificItems = {
      admin: [
        { label: 'Manage Therapists', icon: Users, path: '/therapists' },
        { label: 'Platform Activity', icon: MessageSquare, path: '/activity' },
        { label: 'Settings', icon: Settings, path: '/settings' }
      ],
      therapist: [
        { label: 'My Profile', icon: Users, path: '/profile' },
        { label: 'Chat Requests', icon: MessageSquare, path: '/requests' },
        { label: 'Settings', icon: Settings, path: '/settings' }
      ],
      client: [
        { label: 'Find Therapist', icon: Users, path: '/findtherapist' },
        { label: 'My Sessions', icon: MessageSquare, path: '/mysessions' },
        { label: 'Settings', icon: Settings, path: '/settings' }
      ]
    };

    return [...commonItems, ...roleSpecificItems[role]];
  };

  const menuItems = getMenuItems(userRole);

  const handleNavigation = (path) => {
    navigate(path);
    setCurrentPath(path);
    // On mobile, close sidebar after navigation
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side */}
            <div className="flex">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 lg:hidden"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <div className="flex-shrink-0 flex items-center">
                <Brain className="h-6 w-6 text-teal-600" />
                <span className="ml-2 text-xl font-semibold text-teal-600">WellMind</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mr-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="flex items-center px-3 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-md"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transform md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative w-64 bg-white shadow-sm h-screen`}
        >
          <div className="p-4">
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                    currentPath === item.path
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-teal-600'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;