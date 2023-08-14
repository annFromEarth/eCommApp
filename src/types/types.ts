export interface IWorkshopCard {
  img: string;
  title: string;
  date: string;
  place: string;
  description?: string;
}

export interface IDescription {
  description: string;
}

export interface IQuestions {
  title: string;
  answer: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
