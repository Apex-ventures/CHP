
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/context/AuthContext';

// Layouts
import Layout from "@/components/layout/Layout";
import AuthLayout from "@/components/layout/AuthLayout";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

// Patient Pages
import PatientsList from "@/pages/patients/PatientsList";
import PatientDetails from "@/pages/patients/PatientDetails";
import PatientForm from "@/pages/patients/PatientForm";

// Appointment Pages
import AppointmentsList from "@/pages/appointments/AppointmentsList";
import AppointmentForm from "@/pages/appointments/AppointmentForm";

// Medical Record Pages
import MedicalRecordsList from "@/pages/medical-records/MedicalRecordsList";
import MedicalRecordDetails from "@/pages/medical-records/MedicalRecordDetails";

// Report Pages
import Reports from "@/pages/reports/Reports";

// Profile Page
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            
            {/* Protected Routes */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Patient Routes */}
              <Route path="/patients" element={<PatientsList />} />
              <Route path="/patients/new" element={<PatientForm />} />
              <Route path="/patients/:id" element={<PatientDetails />} />
              <Route path="/patients/:id/edit" element={<PatientForm />} />
              
              {/* Appointment Routes */}
              <Route path="/appointments" element={<AppointmentsList />} />
              <Route path="/appointments/new" element={<AppointmentForm />} />
              <Route path="/appointments/:id" element={<AppointmentForm />} />
              
              {/* Medical Record Routes */}
              <Route path="/medical-records" element={<MedicalRecordsList />} />
              <Route path="/medical-records/:id" element={<MedicalRecordDetails />} />
              
              {/* Report Routes */}
              <Route path="/reports" element={<Reports />} />
              
              {/* Profile Route */}
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
