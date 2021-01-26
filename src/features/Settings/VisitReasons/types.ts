export type VisitReason = {
  id: string;
  title: string;
  duration: number;
  isEnabled: boolean;
  color: string;
  isEdited?: boolean;
};

export type Specialty = {
  id: string;
  name: string;
  visitReasons: VisitReason[];
};

export type FetchSpecialtyResponse = {
  isMain: number;
  practitionerToSpecialtyId: string;
  specialty: { id: string; name: string };
};
