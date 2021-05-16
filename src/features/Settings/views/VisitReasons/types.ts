export type VisitReason = {
  id: string;
  name: string;
  duration: number;
  isEnabled: boolean;
  color: string;
  isEdited?: boolean;
};

export type Specialty = {
  id: string;
  name: string;
  isMain?: number;
  visitReasons: VisitReason[];
};

export type FetchSpecialtyResponse = {
  id: string;
  name: string;
  reasons: VisitReason[];
};
