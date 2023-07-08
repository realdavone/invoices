import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const templatePath = join(process.cwd(), 'public', 'template.html')
    const template = await readFile(templatePath, 'utf-8')

    const filledTemplate = fillTemplate(template, body)
    const pdf = await getPdfBlob(filledTemplate)

    return pdf
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Chyba servera' })
  }
})