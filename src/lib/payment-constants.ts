/**
 * Payment and Certificate constants.
 * Single source of truth for product types and certificate modes.
 */

export const PRODUCT_TYPE = {
    COURSE: "COURSE",
    DIGITAL_CERTIFICATE: "DIGITAL_CERTIFICATE",
} as const;

export type ProductType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

export const CERTIFICATE_MODE = {
    INCLUDED: "INCLUDED",
    PAID_DIGITAL: "PAID_DIGITAL",
    DISABLED: "DISABLED",
} as const;

export type CertificateModeType = (typeof CERTIFICATE_MODE)[keyof typeof CERTIFICATE_MODE];
