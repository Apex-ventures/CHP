
import { QueueItem } from '@/types/queue';
import { Button } from '@/components/ui/button';
import QueueItemCard from './QueueItemCard';

interface QueueContentProps {
  items: QueueItem[];
  isLoading: boolean;
  searchTerm?: string;
  currentUserName?: string;
  currentUserEmail?: string;
  currentUserRole?: string;
  onAssignSelf: (item: QueueItem) => void;
  onMarkComplete: (item: QueueItem) => void;
  onViewPatient: (patientId: string) => void;
  onClearSearch: () => void;
}

const QueueContent = ({
  items,
  isLoading,
  searchTerm,
  currentUserName,
  currentUserEmail,
  currentUserRole,
  onAssignSelf,
  onMarkComplete,
  onViewPatient,
  onClearSearch
}: QueueContentProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-muted-foreground animate-pulse">Loading queue...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <p className="text-muted-foreground">No patients in queue</p>
        {searchTerm && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearSearch} 
            className="mt-2"
          >
            Clear search
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <QueueItemCard
          key={item.id}
          item={item}
          currentUserName={currentUserName}
          currentUserEmail={currentUserEmail}
          currentUserRole={currentUserRole}
          onAssignSelf={onAssignSelf}
          onMarkComplete={onMarkComplete}
          onViewPatient={onViewPatient}
        />
      ))}
    </div>
  );
};

export default QueueContent;
