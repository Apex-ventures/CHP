
import { formatDistanceToNow } from 'date-fns';
import { User, UserCheck, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { QueueItem } from '@/types/queue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface QueueItemCardProps {
  item: QueueItem;
  currentUserName?: string;
  currentUserEmail?: string;
  currentUserRole?: string;
  onAssignSelf: (item: QueueItem) => void;
  onMarkComplete: (item: QueueItem) => void;
  onViewPatient: (patientId: string) => void;
}

const QueueItemCard = ({
  item,
  currentUserName,
  currentUserEmail,
  currentUserRole,
  onAssignSelf,
  onMarkComplete,
  onViewPatient
}: QueueItemCardProps) => {
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

  const isAssignedToCurrentUser = () => {
    if (!item.assignedDoctor || !currentUserName) return false;
    
    return item.assignedDoctor.includes(currentUserName) || 
           (currentUserEmail && item.assignedDoctor.includes(currentUserEmail.split('@')[0]));
  };

  return (
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
            onClick={() => onViewPatient(item.patientId)}
          >
            <User className="h-4 w-4 mr-1" />
            View Details
          </Button>
          
          {currentUserRole === 'clinician' && item.status === 'waiting' && (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => onAssignSelf(item)}
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Assign to Me
            </Button>
          )}
          
          {currentUserRole === 'clinician' && item.status === 'processing' && isAssignedToCurrentUser() && (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onMarkComplete(item)}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Complete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default QueueItemCard;
