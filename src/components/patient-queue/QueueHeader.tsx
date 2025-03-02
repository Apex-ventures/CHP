
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface QueueHeaderProps {
  title: string;
  subtitle: string;
  userRole?: string;
  onAddToQueue: () => void;
}

const QueueHeader = ({ title, subtitle, userRole, onAddToQueue }: QueueHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {(userRole === 'receptionist' || userRole === 'clinician' || userRole === 'doctor' || userRole === 'admin') && (
        <Button onClick={onAddToQueue}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add to Queue
        </Button>
      )}
    </div>
  );
};

export default QueueHeader;
