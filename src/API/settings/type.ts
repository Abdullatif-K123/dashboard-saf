export type About = { aboutApp: string | null };
export type Policy = { policy: string | null };

export type CompanyRatio = {
  companyRatio: number;
  serviceRatio: number;
};

export type AboutActionParams = { aboutApp: string };
export type PolicyActionParams = { policy: string };
export type CompanyRatioActionParams = CompanyRatio;
