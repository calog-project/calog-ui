export type TScheduleProps = {
  openModal?: boolean;
  handleModalClose: () => void;
  mode: 'add' | 'detail';
  scheduleData?: TSchedule | null;
};

export type TSchedule = {
  aggregateId?: string;
  id?: number;
  author: number;
  title: string;
  date?: Date;
  start: Date;
  startDate?: Date | null;
  startTime?: Date | null;
  endDate?: string | null;
  endTime?: string | null;
  end: Date;
  categoryId: number;
  joiner?: string[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  categoryColor?: string;
};

export type TScheduleStore = {
  title: string | null;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string | null;
  endTime: string | null;
  categoryId: string;
  joiner: string[];
  description: string | null;
  setTitle: (title: string) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setStartTime: (time: string | null) => void;
  setEndTime: (time: string | null) => void;
  setCategoryId: (id: string) => void;
  setJoiner: (joiner: string[]) => void;
  setDescription: (description: string | null) => void;
  setScheduleFormReset: () => void;
};
