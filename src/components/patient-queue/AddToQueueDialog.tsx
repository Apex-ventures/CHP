
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QueueItem } from '@/types/queue';

// Mock patient data for quick selection
const mockPatients = [
  { id: '101', name: 'John Doe' },
  { id: '102', name: 'Sarah Johnson' },
  { id: '103', name: 'Michael Smith' },
  { id: '104', name: 'Emily Davis' },
  { id: '105', name: 'Robert Wilson' },
  { id: '106', name: 'Jessica Brown' },
  { id: '107', name: 'William Taylor' },
];

const formSchema = z.object({
  patientId: z.string().min(1, { message: 'Patient ID is required' }),
  patientName: z.string().min(1, { message: 'Patient name is required' }),
  condition: z.string().min(1, { message: 'Condition is required' }),
  priority: z.enum(['normal', 'urgent', 'emergency']),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddToQueueDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<QueueItem, 'id' | 'queueNumber'>) => void;
}

const AddToQueueDialog = ({ open, onClose, onSubmit }: AddToQueueDialogProps) => {
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: '',
      patientName: '',
      condition: '',
      priority: 'normal',
      notes: '',
    },
  });

  useEffect(() => {
    if (selectedPatient) {
      form.setValue('patientId', selectedPatient.id);
      form.setValue('patientName', selectedPatient.name);
    }
  }, [selectedPatient, form]);

  const handleSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      arrivalTime: new Date().toISOString(),
      status: 'waiting',
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Patient to Queue</DialogTitle>
          <DialogDescription>
            Enter patient information to add them to the current queue.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Existing Patient</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const patient = mockPatients.find(p => p.id === value);
                        if (patient) {
                          setSelectedPatient(patient);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockPatients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Patient ID</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!!selectedPatient} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Patient Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!!selectedPatient} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition/Symptoms</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="E.g., Fever, Headache, Chest pain" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Any additional information that might be helpful"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add to Queue</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToQueueDialog;
