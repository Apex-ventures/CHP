
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              request access if you don't have an account
            </a>
          </p>
        </div>
        
        <div className="mt-8 bg-white p-8 rounded-lg shadow">
          <LoginForm />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo accounts</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <div className="border p-3 rounded">
                <p><strong>Admin:</strong> admin@example.com / password</p>
              </div>
              <div className="border p-3 rounded">
                <p><strong>Doctor:</strong> doctor@example.com / password</p>
              </div>
              <div className="border p-3 rounded">
                <p><strong>Receptionist:</strong> receptionist@example.com / password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
