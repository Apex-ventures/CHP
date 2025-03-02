
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  User, 
  X, 
  Edit, 
  FileText, 
  CalendarRange 
} from 'lucide-react';

const AppointmentsList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    { id: 1, patientId: "1", patientName: "John Doe", date: "2023-06-10", time: "09:00 AM", status: "Scheduled", type: "Regular Check-up" },
    { id: 2, patientId: "2", patientName: "Jane Smith", date: "2023-06-12", time: "11:30 AM", status: "Completed", type: "Follow-up" },
    { id: 3, patientId: "3", patientName: "Robert Johnson", date: "2023-06-15", time: "02:00 PM", status: "Cancelled", type: "Specialist Consultation" },
  ]);

  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: "Cancelled" } : app
    ));
    
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been cancelled successfully.",
    });
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Link to="/appointments/new">
          <Button>New Appointment</Button>
        </Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardHeader className={`
              ${appointment.status === 'Scheduled' ? 'bg-blue-50' : 
                appointment.status === 'Completed' ? 'bg-green-50' : 'bg-red-50'}
            `}>
              <CardTitle className="flex justify-between">
                <span>{appointment.patientName}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                  appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {appointment.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{appointment.date}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{appointment.time}</p>
                </div>
                <div className="flex items-center">
                  <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{appointment.type}</p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewPatient(appointment.patientId)}
                  >
                    <User className="h-4 w-4 mr-1" />
                    Patient
                  </Button>
                  <Link to={`/appointments/${appointment.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  {appointment.status === 'Scheduled' && (
                    <Button 
                      variant="destructive" 
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-2 text-blue-600"
                  onClick={() => navigate(`/medical-records`)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  View Medical Records
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
