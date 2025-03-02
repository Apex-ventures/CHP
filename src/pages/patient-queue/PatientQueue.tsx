
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Search, 
  Clock, 
  UserCheck, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  RotateCw,
  Filter
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { QueueItem, QueueFilter } from '@/types/queue';
import AddToQueueDialog from '@/components/patient-queue/AddToQueueDialog';
import QueueSearch from '@/components/patient-queue/QueueSearch';

// Mock data
const mockQueueItems: QueueItem[] = [
  {
    id: '1',
    patientId: '101',
    patientName: 'John Doe',
    queueNumber: 1,
    arrivalTime: new Date(new Date().getTime() - 45 * 60000).toISOString(), // 45 minutes ago
    condition: 'Fever, Headache',
    priority: 'normal',
    status: 'waiting',
  },
  {
    id: '2',
    patientId: '102',
    patientName: 'Sarah Johnson',
    queueNumber: 2,
    arrivalTime: new Date(new Date().getTime() - 30 * 60000).toISOString(), // 30 minutes ago
    condition: 'Chest pain, Shortness of breath',
    priority: 'urgent',
    status: 'waiting',
  },
  {
    id: '3',
    patientId: '103',
    patientName: 'Michael Smith',
    queueNumber: 3,
    arrivalTime: new Date(new Date().getTime() - 20 * 60000).toISOString(), // 20 minutes ago
    condition: 'Ankle injury',
    priority: 'normal',
    status: 'processing',
    assignedDoctor: 'Dr. Williams',
  },
  {
    id: '4',
    patientId: '104',
    patientName: 'Emily Davis',
    queueNumber: 4,
    arrivalTime: new Date(new Date().getTime() - 10 * 60000).toISOString(), // 10 minutes ago
    condition: 'Severe allergic reaction',
    priority: 'emergency',
    status: 'processing',
    assignedDoctor: 'Dr. Johnson',
  },
  {
    id: '5',
    patientId: '105',
    patientName: 'Robert Wilson',
    queueNumber: 5,
    arrivalTime: new Date(new Date().getTime() - 60 * 60000).toISOString(), // 60 minutes ago
    condition: 'Follow-up for diabetes',
    priority: 'normal',
    status: 'completed',
    assignedDoctor: 'Dr. Brown',
  },
];

const PatientQueue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<QueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<QueueFilter>({
    status: 'all',
    priority: 'all',
    searchTerm: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('all');
  const [nextQueueNumber, setNextQueueNumber] = useState(6); // Starting from 6 since we have 5 mock items

  // Simulating loading queue data
  useEffect(() => {
    const fetchQueue = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQueueItems(mockQueueItems);
        setFilteredItems(mockQueueItems);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error loading queue',
          description: 'There was a problem loading the patient queue.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQueue();
    // In a real app, we would refresh this data periodically
    const interval = setInterval(() => {
      // Update wait times
      setQueueItems(prevItems => [...prevItems]);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [toast]);

  // Apply filters
  useEffect(() => {
    let result = [...queueItems];

    if (currentTab !== 'all') {
      result = result.filter(item => item.status === currentTab);
    }

    if (filter.priority && filter.priority !== 'all') {
      result = result.filter(item => item.priority === filter.priority);
    }

    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      result = result.filter(
        item =>
          item.patientName.toLowerCase().includes(term) ||
          item.condition.toLowerCase().includes(term) ||
          item.queueNumber.toString().includes(term)
      );
    }

    setFilteredItems(result);
  }, [queueItems, filter, currentTab]);

  const handleAddToQueue = (newItem: Omit<QueueItem, 'id' | 'queueNumber'>) => {
    const id = Date.now().toString();
    const queueItem: QueueItem = {
      ...newItem,
      id,
      queueNumber: nextQueueNumber,
    };
    
    setQueueItems(prev => [...prev, queueItem]);
    setNextQueueNumber(nextQueueNumber + 1);
    
    toast({
      title: 'Patient added to queue',
      description: `${newItem.patientName} has been added with queue number ${nextQueueNumber}.`
    });
    
    setIsDialogOpen(false);
  };

  const handleAssignSelf = (item: QueueItem) => {
    if (!user) return;
    
    const doctorName = user.name || 'Dr. ' + user.email?.split('@')[0];
    
    setQueueItems(prev =>
      prev.map(qItem =>
        qItem.id === item.id
          ? { ...qItem, status: 'processing', assignedDoctor: doctorName }
          : qItem
      )
    );
    
    toast({
      title: 'Patient assigned',
      description: `You have been assigned to ${item.patientName}.`
    });
  };

  const handleMarkComplete = (item: QueueItem) => {
    setQueueItems(prev =>
      prev.map(qItem =>
        qItem.id === item.id ? { ...qItem, status: 'completed' } : qItem
      )
    );
    
    toast({
      title: 'Patient completed',
      description: `${item.patientName}'s visit has been marked as completed.`
    });
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const renderPriorityBadge = (priority: QueueItem['priority']) => {
    switch (priority) {
      case 'emergency':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Emergency
          </Badge>
        );
      case 'urgent':
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Urgent
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <User className="h-3 w-3" />
            Normal
          </Badge>
        );
    }
  };

  const renderStatusBadge = (status: QueueItem['status']) => {
    switch (status) {
      case 'waiting':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Waiting
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            In Progress
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const renderWaitTime = (arrivalTime: string) => {
    try {
      return formatDistanceToNow(new Date(arrivalTime), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patient Queue</h1>
          <p className="text-muted-foreground">
            Manage the daily patient queue and track status
          </p>
        </div>
        {(user?.role === 'receptionist' || user?.role === 'clinician') && (
          <Button onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add to Queue
          </Button>
        )}
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Current Queue Status</CardTitle>
          <CardDescription>
            {filteredItems.filter(item => item.status === 'waiting').length} patients waiting,{' '}
            {filteredItems.filter(item => item.status === 'processing').length} in progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <QueueSearch filter={filter} setFilter={setFilter} />
            <div className="ml-auto">
              <Button variant="outline" size="sm" onClick={() => setFilter({ status: 'all', priority: 'all', searchTerm: '' })}>
                <RotateCw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="processing">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {['all', 'waiting', 'processing', 'completed'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-muted-foreground animate-pulse">Loading queue...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-muted-foreground">No patients in queue</p>
                {filter.searchTerm && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFilter({...filter, searchTerm: ''})} 
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className={`
                      ${item.priority === 'emergency' ? 'bg-red-50 border-b-2 border-red-500' : 
                        item.priority === 'urgent' ? 'bg-amber-50 border-b-2 border-amber-500' : 
                        'bg-gray-50'}
                    `}>
                      <CardTitle className="flex justify-between items-center">
                        <span>#{item.queueNumber}</span>
                        {renderStatusBadge(item.status)}
                      </CardTitle>
                      <CardDescription className="font-medium text-lg text-foreground">
                        {item.patientName}
                      </CardDescription>
                      <div className="flex justify-between items-center mt-2">
                        {renderPriorityBadge(item.priority)}
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 
                          {renderWaitTime(item.arrivalTime)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Condition:</p>
                          <p className="text-sm">{item.condition}</p>
                        </div>
                        {item.assignedDoctor && (
                          <div>
                            <p className="text-sm font-medium">Assigned to:</p>
                            <p className="text-sm">{item.assignedDoctor}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <div className="w-full flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleViewPatient(item.patientId)}
                        >
                          <User className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        
                        {user?.role === 'clinician' && item.status === 'waiting' && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleAssignSelf(item)}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Assign to Me
                          </Button>
                        )}
                        
                        {user?.role === 'clinician' && item.status === 'processing' && 
                         item.assignedDoctor?.includes(user.name || user.email?.split('@')[0] || '') && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleMarkComplete(item)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {isDialogOpen && (
        <AddToQueueDialog 
          open={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleAddToQueue}
        />
      )}
    </div>
  );
};

export default PatientQueue;
