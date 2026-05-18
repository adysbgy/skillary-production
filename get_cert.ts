import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const cert = await prisma.certificate.findFirst()
  console.log("CERT_CODE:", cert?.uniqueCode)
}
main()
