export type TScheduleProps = {
  openModal?: boolean;
  handleModalClose: () => void;
  mode: 'add' | 'edit' | 'detail';
};

export type TSchedule = {
  aggregateId?: string;
  id?: string;
  author: number;
  title: string;
  date?: Date;
  start: Date;
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
