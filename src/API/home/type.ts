import { Gender } from "constants/enums";

export interface HomeTourChartParams {
  branchId: string;
  from: string;
  to: string;
}
export type PendingCounts = {
  [k in "branches" | "customers" | "owners" | (string & {})]: number;
};
export interface HomeData {
  ownerCount: number;
  customerCount: number;
  branchCount: number;
  tourCount: number;
  recentOwners: HomeOwner[];
  recentCustomers: HomeOwner[];
  recentBranches: HomeBranch[];
  recentFinishedTours: HomeTour[];
  recentOngoingTours: HomeTour[];
  recentUpComingTours: HomeTour[];
  toursBranchChart: HomeToursBranchChart[];
}

export interface HomeBranch {
  id: string;
  name: string;
  phoneNumber: string;
  ownerName: string;
}

export interface HomeOwner {
  id: string;
  name: string;
  phoneNumber: string;
  gender: Gender;
}
export interface HomeCustomer {
  id: string;
  name: string;
  phoneNumber: string;
  gender: Gender;
}
export interface HomeTour {
  id: string;
  name: string;
  branchName: string;
  leaveDate: string;
  arriveDate: string;
}
export interface HomeToursBranchChart {
  date: string;
  tourCount: number;
}
