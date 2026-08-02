-- CreateTable
CREATE TABLE "CommercialOffer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "primaryAction" TEXT NOT NULL DEFAULT 'REGISTER_INTEREST',
    "currency" TEXT NOT NULL DEFAULT 'IDR',
    "priceAmount" INTEGER,
    "capacity" INTEGER,
    "registrationOpensAt" TIMESTAMP(3),
    "registrationClosesAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommercialOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferRuntimeMapping" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "runtimeType" TEXT NOT NULL,
    "runtimeId" TEXT NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT 'PRIMARY',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferRuntimeMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferTrainerAssignment" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "trainerProfileId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PROPOSED',
    "scope" JSONB,
    "compensationType" TEXT,
    "compensationTerms" JSONB,
    "acceptedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferTrainerAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramProduction" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "stage" TEXT NOT NULL DEFAULT 'TOPIC_PROPOSAL',
    "ownerTrainerId" TEXT,
    "reviewerId" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "reviewNotes" TEXT,
    "pilotAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "maintenanceDueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramProductionItem" (
    "id" TEXT NOT NULL,
    "productionId" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'MISSING',
    "assetUrl" TEXT,
    "notes" TEXT,
    "completedById" TEXT,
    "completedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramProductionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceRecord" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "sourceReference" TEXT NOT NULL,
    "approvedCopy" TEXT,
    "subjectName" TEXT,
    "consentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "consentProofUrl" TEXT,
    "ownerId" TEXT,
    "approvedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "withdrawnAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvidenceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferEvidenceLink" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    "placement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferEvidenceLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferAuditEvent" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferAuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommercialOffer_slug_key" ON "CommercialOffer"("slug");

-- CreateIndex
CREATE INDEX "CommercialOffer_type_status_idx" ON "CommercialOffer"("type", "status");

-- CreateIndex
CREATE INDEX "CommercialOffer_audience_status_idx" ON "CommercialOffer"("audience", "status");

-- CreateIndex
CREATE INDEX "CommercialOffer_publishedAt_idx" ON "CommercialOffer"("publishedAt");

-- CreateIndex
CREATE INDEX "OfferRuntimeMapping_runtimeType_runtimeId_idx" ON "OfferRuntimeMapping"("runtimeType", "runtimeId");

-- CreateIndex
CREATE UNIQUE INDEX "OfferRuntimeMapping_offerId_runtimeType_runtimeId_key" ON "OfferRuntimeMapping"("offerId", "runtimeType", "runtimeId");

-- CreateIndex
CREATE INDEX "OfferTrainerAssignment_trainerProfileId_status_idx" ON "OfferTrainerAssignment"("trainerProfileId", "status");

-- CreateIndex
CREATE INDEX "OfferTrainerAssignment_offerId_status_idx" ON "OfferTrainerAssignment"("offerId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "OfferTrainerAssignment_offerId_trainerProfileId_role_key" ON "OfferTrainerAssignment"("offerId", "trainerProfileId", "role");

-- CreateIndex
CREATE INDEX "ProgramProduction_stage_idx" ON "ProgramProduction"("stage");

-- CreateIndex
CREATE INDEX "ProgramProduction_maintenanceDueAt_idx" ON "ProgramProduction"("maintenanceDueAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramProduction_offerId_version_key" ON "ProgramProduction"("offerId", "version");

-- CreateIndex
CREATE INDEX "ProgramProductionItem_status_idx" ON "ProgramProductionItem"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramProductionItem_productionId_requirement_key" ON "ProgramProductionItem"("productionId", "requirement");

-- CreateIndex
CREATE INDEX "EvidenceRecord_type_status_idx" ON "EvidenceRecord"("type", "status");

-- CreateIndex
CREATE INDEX "EvidenceRecord_expiresAt_idx" ON "EvidenceRecord"("expiresAt");

-- CreateIndex
CREATE INDEX "OfferEvidenceLink_evidenceId_idx" ON "OfferEvidenceLink"("evidenceId");

-- CreateIndex
CREATE UNIQUE INDEX "OfferEvidenceLink_offerId_evidenceId_placement_key" ON "OfferEvidenceLink"("offerId", "evidenceId", "placement");

-- CreateIndex
CREATE INDEX "OfferAuditEvent_offerId_createdAt_idx" ON "OfferAuditEvent"("offerId", "createdAt");

-- CreateIndex
CREATE INDEX "OfferAuditEvent_action_idx" ON "OfferAuditEvent"("action");

-- AddForeignKey
ALTER TABLE "OfferRuntimeMapping" ADD CONSTRAINT "OfferRuntimeMapping_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "CommercialOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTrainerAssignment" ADD CONSTRAINT "OfferTrainerAssignment_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "CommercialOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTrainerAssignment" ADD CONSTRAINT "OfferTrainerAssignment_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "TrainerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramProduction" ADD CONSTRAINT "ProgramProduction_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "CommercialOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramProductionItem" ADD CONSTRAINT "ProgramProductionItem_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "ProgramProduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferEvidenceLink" ADD CONSTRAINT "OfferEvidenceLink_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "CommercialOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferEvidenceLink" ADD CONSTRAINT "OfferEvidenceLink_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "EvidenceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferAuditEvent" ADD CONSTRAINT "OfferAuditEvent_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "CommercialOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
