import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <header className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto flex justify-between items-center"
        >
          <h1 className="text-2xl font-semibold text-gray-800">
            <span className="text-blue-600">Auth</span>App
          </h1>
        </motion.div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Outlet />
      </main>
      
      <footer className="p-4 text-center text-gray-500 text-sm border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} AuthApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;