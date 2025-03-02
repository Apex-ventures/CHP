
export interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  queueNumber: number;
  arrivalTime: string;
  condition: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: 'waiting' | 'processing' | 'completed' | 'cancelled';
  assignedDoctor?: string;
  notes?: string;
}

export interface QueueFilter {
  status?: string;
  priority?: string;
  searchTerm?: string;
}
