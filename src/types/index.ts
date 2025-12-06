// Core types for the Contractor Pro app

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EstimateLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Estimate {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  lineItems: EstimateLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  uri: string;
  clientId?: string;
  estimateId?: string;
  caption?: string;
  photoType?: 'before' | 'after' | 'progress';
  createdAt: Date;
}

// Jobs & Payroll (to be implemented in later phases)
export interface Job {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  status: 'lead' | 'estimated' | 'in_progress' | 'completed';
  estimateIds: string[];
  photoIds: string[];
  startDate?: Date;
  completedDate?: Date;
}

export interface Employee {
  id: string;
  name: string;
  hourlyRate: number;
  active: boolean;
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  jobId?: string;
  date: Date;
  hours: number;
  notes?: string;
}

export interface PayPeriod {
  id: string;
  start: Date;
  end: Date;
  timeEntryIds: string[];
}

export type RootTabParamList = {
  Dashboard: undefined;
  Estimates: undefined;
  Photos: undefined;
  Clients: undefined;
};
