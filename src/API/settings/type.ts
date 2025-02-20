export type About = string | null;
export type Policy = string | null;

export type CompanyRatio = {
  companyRatio: number;
  serviceRatio: number;
};

export type AboutActionParams = { aboutApp: string };
export type PolicyActionParams = { policy: string };
export type CompanyRatioActionParams = CompanyRatio;
