
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { QueueItem, QueueFilter } from '@/types/queue';
import AddToQueueDialog from '@/components/patient-queue/AddToQueueDialog';
import QueueHeader from '@/components/patient-queue/QueueHeader';
import QueueStatusCard from '@/components/patient-queue/QueueStatusCard';
import QueueContent from '@/components/patient-queue/QueueContent';
import { fetchQueueData, addToQueue } from '@/services/queueService';

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
    const loadQueueData = async () => {
      try {
        const data = await fetchQueueData();
        setQueueItems(data);
        setFilteredItems(data);
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

    loadQueueData();
    
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

  const handleAddToQueue = async (newItem: Omit<QueueItem, 'id' | 'queueNumber'>) => {
    try {
      const queueItem = await addToQueue(newItem, nextQueueNumber);
      
      setQueueItems(prev => [...prev, queueItem]);
      setNextQueueNumber(nextQueueNumber + 1);
      
      toast({
        title: 'Patient added to queue',
        description: `${newItem.patientName} has been added with queue number ${nextQueueNumber}.`
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error adding patient',
        description: 'There was a problem adding the patient to the queue.'
      });
    }
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

  const waitingCount = filteredItems.filter(item => item.status === 'waiting').length;
  const processingCount = filteredItems.filter(item => item.status === 'processing').length;

  return (
    <div>
      <QueueHeader 
        title="Patient Queue"
        subtitle="Manage the daily patient queue and track status"
        userRole={user?.role}
        onAddToQueue={() => setIsDialogOpen(true)}
      />

      <QueueStatusCard 
        waitingCount={waitingCount}
        processingCount={processingCount}
        filter={filter}
        setFilter={setFilter}
      />

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="processing">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {['all', 'waiting', 'processing', 'completed'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <QueueContent 
              items={filteredItems}
              isLoading={isLoading}
              searchTerm={filter.searchTerm}
              currentUserName={user?.name}
              currentUserEmail={user?.email}
              currentUserRole={user?.role}
              onAssignSelf={handleAssignSelf}
              onMarkComplete={handleMarkComplete}
              onViewPatient={handleViewPatient}
              onClearSearch={() => setFilter({...filter, searchTerm: ''})}
            />
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
