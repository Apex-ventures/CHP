
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { QueueFilter } from '@/types/queue';

interface QueueSearchProps {
  filter: QueueFilter;
  setFilter: (filter: QueueFilter) => void;
}

const QueueSearch = ({ filter, setFilter }: QueueSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(filter.searchTerm || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter({ ...filter, searchTerm });
  };

  const handlePriorityChange = (priority: string) => {
    setFilter({ ...filter, priority });
  };

  return (
    <div className="flex gap-2 flex-1">
      <form onSubmit={handleSearch} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, condition or queue number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handlePriorityChange('all')}>
              <span className={filter.priority === 'all' ? 'font-bold' : ''}>All</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange('normal')}>
              <span className={filter.priority === 'normal' ? 'font-bold' : ''}>Normal</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange('urgent')}>
              <span className={filter.priority === 'urgent' ? 'font-bold' : ''}>Urgent</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange('emergency')}>
              <span className={filter.priority === 'emergency' ? 'font-bold' : ''}>Emergency</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QueueSearch;
