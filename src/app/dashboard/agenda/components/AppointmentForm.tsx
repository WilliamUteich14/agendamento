// components/agenda/AppointmentForm.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FiCheck, FiEdit, FiLoader, FiPlus, FiX } from 'react-icons/fi';
import { format } from 'date-fns';
import { useMemo, useCallback, useState, useEffect } from 'react';

interface AppointmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAppointment: any;
  clients: any[];
  currentDate: Date;
  allAppointments: any[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  processing: string | null;
}

export const AppointmentForm = ({
  open,
  onOpenChange,
  clients,
  onSubmit
}: Pick<AppointmentFormProps, 'open' | 'onOpenChange' | 'clients' | 'onSubmit'>) => {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Agendamento (MÍNIMO)</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientId">Paciente</Label>
            <select
              id="clientId"
              name="clientId"
              value={selectedClientId}
              onChange={e => setSelectedClientId(e.target.value)}
              required
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Selecione um paciente</option>
              {clients.map((client: any) => (
                <option key={client._id} value={client._id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do procedimento</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={!selectedClientId || !name}>Agendar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};