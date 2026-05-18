export type ProofManualStatus =
  | "PUBLIC"
  | "LOGIN_REQUIRED"
  | "PRIVATE"
  | "BROKEN"
  | "NEEDS_REVIEW"
  | "NOT_CHECKED";

export interface ProofManualValidation {
  url: string;
  manualStatus: ProofManualStatus;
  lastCheckedAt?: string;
  checkedBy?: string;
  relatedPortfolioIds: number[];
  notes?: string;
}

export const legacyProofManualValidation: ProofManualValidation[] = [
  {
    url: "https://www.instagram.com/p/C7URYyEhtIY/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [1],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C72wtVxB6D2/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [2],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C75YRnjBLXO/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [3],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C75X79qh2EY/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [4],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C75YwsChrzi/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [5],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9TiMjBnZwK/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [6],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9TiPKmnp4I/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [6],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9TiRlbH2d7/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [6],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9V0vg6nC6c/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [7, 10, 36],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9YVe8kHREn/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [7, 10, 36],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9YVgs-HMMW/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [7, 10, 36],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9gPvRUnUgt/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [8],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9lg6H_H4JL/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [8],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B9noynwn235/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [8],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C7py6ovhh5k/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [9],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B7P9IttH3G3/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [11],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B7P9FHQns77/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [11],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B7P8Fd1nrQx/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [11],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B6SYctwHBG3/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [12],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B6SaLpdHie0/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [12],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B6SaM8EH-xC/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [12],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B5uDvs3nSGI/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [13],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B5uDsikn1n0/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [13],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B5KLwbaHZrA/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [14],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B4_SQCZnBA8/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [14],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B4_SMmwngx1/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [14],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B3gHvwdn5IJ/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [15],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B3gHyzmnsRW/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [15],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B3gHwyEHDI5/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [15],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B4L9DPoHrjF/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [17, 21, 28, 38],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B4MaheQHI30/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [17, 21],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B4L8_MTHElz/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [17, 21],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B2oY8b2H33M/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [18],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B2oYzq7nAVg/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [18],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B2oYxRKnhLr/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [18],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B1pkWujHO88/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [19, 23],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B1pkUHkn-0q/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [19, 23],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B1pkRvzHSws/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [19, 23],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B2dYZhhHJJf/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [20],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B2dYdDznUyx/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [20],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/B2gDkLznyp4/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [20],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/BwI_0NQB-Nv/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [25],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/BwI_ochBUp2/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [25],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/BwlZsYpBRrL/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [26],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/Bu7z_adBibD/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [27],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C7iMLKnh4nz/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [29, 39],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C70OKQzhGoH/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [30],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C70NjhUBkwk/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [31],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C7p0QMfBwd2/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [32],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/C7klyXKhCNm/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [33],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/Bu7xLd-hFSH/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [35],
    notes: "Awaiting manual browser validation.",
  },
  {
    url: "https://www.instagram.com/p/BtxDzD5BLVF/",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [37],
    notes: "Awaiting manual browser validation.",
  },
];

export function getManualValidationForUrl(url: string): ProofManualValidation | undefined {
  return legacyProofManualValidation.find(p => p.url === url);
}

export function getProofManualStatus(url: string): ProofManualStatus {
  const v = getManualValidationForUrl(url);
  return v ? v.manualStatus : "NOT_CHECKED";
}

export function getProofManualValidationSummary() {
  const summary = {
    total: legacyProofManualValidation.length,
    public: 0,
    loginRequired: 0,
    private: 0,
    broken: 0,
    needsReview: 0,
    notChecked: 0,
  };
  for (const v of legacyProofManualValidation) {
    if (v.manualStatus === "PUBLIC") summary.public++;
    else if (v.manualStatus === "LOGIN_REQUIRED") summary.loginRequired++;
    else if (v.manualStatus === "PRIVATE") summary.private++;
    else if (v.manualStatus === "BROKEN") summary.broken++;
    else if (v.manualStatus === "NEEDS_REVIEW") summary.needsReview++;
    else summary.notChecked++;
  }
  return summary;
}

export function getPortfolioProofManualStatuses(portfolioId: number): ProofManualStatus[] {
  return legacyProofManualValidation
    .filter(v => v.relatedPortfolioIds.includes(portfolioId))
    .map(v => v.manualStatus);
}
