
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';
import { QueueFilter } from '@/types/queue';
import QueueSearch from './QueueSearch';

interface QueueStatusCardProps {
  waitingCount: number;
  processingCount: number;
  filter: QueueFilter;
  setFilter: (filter: QueueFilter) => void;
}

const QueueStatusCard = ({ 
  waitingCount, 
  processingCount, 
  filter, 
  setFilter 
}: QueueStatusCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Current Queue Status</CardTitle>
        <CardDescription>
          {waitingCount} patients waiting, {processingCount} in progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <QueueSearch filter={filter} setFilter={setFilter} />
          <div className="ml-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFilter({ status: 'all', priority: 'all', searchTerm: '' })}
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QueueStatusCard;
