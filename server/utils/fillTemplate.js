const TAX_RATE = 0.2

export default function fillTemplate(template, _body) {
  let filledTemplate = template

  const { items, does_pay_tax, invoice_due_date, seller, buyer,  ...body } = _body

  for (const [key, value] of Object.entries(body)) {
    filledTemplate = filledTemplate.replace(`{{ ${key} }}`, value)
  }

  for (const [key, value] of Object.entries(seller)) {
    filledTemplate = filledTemplate.replace(`{{ seller.${key} }}`, value)
  }

  for (const [key, value] of Object.entries(buyer)) {
    filledTemplate = filledTemplate.replace(`{{ buyer.${key} }}`, value)
  }

  let _items = ''

  items.forEach(item => {
    _items += `
      <div class="cell">${item.name ?? '&nbsp;'}</div>
      <div class="cell">${item.description ?? '&nbsp;'}</div>
      <div class="cell">${item.quantity ?? 1}</div>
      <div class="cell">${new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(item.price ?? 0)}</div>
    `
  })

  const taxFreePrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const taxPrice = does_pay_tax ? taxFreePrice * TAX_RATE : 0

  filledTemplate = filledTemplate.replace(`{{ invoice_issue_date }}`, new Intl.DateTimeFormat('sk-SK').format(new Date()))
  filledTemplate = filledTemplate.replace(`{{ invoice_due_date }}`, new Intl.DateTimeFormat('sk-SK').format(new Date(invoice_due_date)))
  filledTemplate = filledTemplate.replace(`{{ items }}`, _items)
  filledTemplate = filledTemplate.replace(`{{ tax_free_price }}`, taxFreePrice)
  filledTemplate = filledTemplate.replace(`{{ tax_rate }}`, `${does_pay_tax ? TAX_RATE * 100 : 0}%`)
  filledTemplate = filledTemplate.replace(`{{ tax_total }}`, taxPrice)
  filledTemplate = filledTemplate.replace(`{{ total_price }}`, taxFreePrice + taxPrice)

  return filledTemplate
}