
import { QueueItem } from '@/types/queue';

// Mock data
export const mockQueueItems: QueueItem[] = [
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

// Simulate API calls to fetch queue data
export const fetchQueueData = async (): Promise<QueueItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockQueueItems;
};

export const addToQueue = async (newItem: Omit<QueueItem, 'id' | 'queueNumber'>, nextQueueNumber: number): Promise<QueueItem> => {
  const id = Date.now().toString();
  const queueItem: QueueItem = {
    ...newItem,
    id,
    queueNumber: nextQueueNumber,
  };
  
  // In a real app, this would be an API call
  return queueItem;
};
