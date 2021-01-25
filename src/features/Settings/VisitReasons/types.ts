export type VisitReason = {
  id: string;
  title: string;
  duration: number;
  isEnabled: boolean;
  color: string;
};

export type Specialty = {
  id: string;
  name: string;
  visitReasons: VisitReason[];
};
