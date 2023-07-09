<template>
  <section>
    <h1 style="margin-bottom: 20px;">Nová faktúra</h1>
    <form @submit.prevent="handleSubmit">
      <Fieldset legend="Predajca">
        <div class="inputs">
          <span class="p-float-label">
            <InputText :disabled="useSellerFromDatabase" id="seller-name" v-model="form.seller.name" type="text" required />
            <label for="seller-name">Meno predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText :disabled="useSellerFromDatabase" id="seller-id" v-model="form.seller.id" type="text" required />
            <label for="seller-id">ID predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText :disabled="useSellerFromDatabase" id="seller-address" v-model="form.seller.address" type="text" required />
            <label for="seller-address">Adresa predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText :disabled="useSellerFromDatabase" id="seller-contact" v-model="form.seller.contact" type="text" required />
            <label for="seller-contact">Kontakt predajcu</label>
          </span>
        </div>
        <div class="checkbox">
          <InputSwitch :disabled="useSellerFromDatabase === null" inputId="seller-toggle" :modelValue="useSellerFromDatabase" @update:modelValue="handleSellerToggle" />
          <label for="seller-toggle">Použiť moje uložené údaje</label>
        </div>
      </Fieldset>

      <Fieldset legend="Kupujúci">
        <div class="inputs">
          <span class="p-float-label">
            <InputText id="buyer-name" v-model="form.buyer.name" required />
            <label for="buyer-name">Meno kupujúceho</label>
          </span>
          <span class="p-float-label">
            <InputText id="buyer-id" v-model="form.buyer.id" required />
            <label for="buyer-id">ID kupujúceho</label>
          </span>
          <span class="p-float-label">
            <InputText id="buyer-address" v-model="form.buyer.address" required />        
            <label for="buyer-address">Adresa kupujúceho</label>
          </span>
        </div>
      </Fieldset>

      <Fieldset legend="Faktúra">
        <div class="inputs">
          <span class="p-float-label">
            <InputText id="invoice-id" v-model="form.invoice_id" required />
            <label for="invoice-id">ID faktúry</label>
          </span>
          <Calendar id="invoice-due-date" v-model="form.invoice_due_date" placeholder="Splatnosť faktúry" dateFormat="dd/mm/yy" required />
        </div>
        <div class="checkbox">
          <label for="does_pay_tax">Platca DPH?</label>
          <Checkbox v-model="form.does_pay_tax" binary inputId="does_pay_tax" />  
        </div>
      </Fieldset>

      <Fieldset legend="Položky">
        <div style="display: flex; flex-direction: column; gap: 20px">
          <template v-if="form.items?.length">
            <div v-for="(item, index) in form.items" :key="index" class="items">
              <span class="p-float-label">
                <InputText id="item-name" v-model="item.name" />
                <label for="item-name">Meno položky</label>
              </span>
              <span class="p-float-label">
                <InputText id="item-description" v-model="item.description" />
                <label for="item-description">Popis položky</label>
              </span>
              <span class="p-float-label">
                <InputNumber id="item-quantity" v-model="item.quantity" :useGrouping="false" required />
                <label for="item-quantity">Množstvo</label>
              </span>
              <span class="p-float-label">
                <InputNumber id="item-price" v-model="item.price" mode="currency" currency="EUR" required />
                <label for="item-price">Cena</label>
              </span>
              <button v-if="index !== 0" @click="removeItem(index)" type="button" style="align-self: center;margin-left: auto; background-color: transparent;font-size: 2rem;">&times;</button>
            </div>
          </template>
          <p v-else>
            Nie sú tu žiadne položky.
          </p>
          <Button @click="handleAddItem" type="button" variation="secondary" style="align-self: flex-end;">Pridaj položku</Button>
        </div>        
      </Fieldset>

      <Button style="align-self: flex-end;" :loading="loading" variation="success">Vygenerovať faktúru</Button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const { data } = await useFetch('/api/me')

const generatedId = new Intl.DateTimeFormat('en-US', { month: '2-digit', year: 'numeric' }).format(new Date()).replace(/\D/g, '')

const form = ref({
  seller: {},
  buyer: {},
  does_pay_tax: false,
  invoice_id: generatedId,
  items: [{}]
})
const loading = ref(false)
const useSellerFromDatabase = ref(null)

if(data.value?.user !== null) {
  form.value.seller = data.value.user
  useSellerFromDatabase.value = true
}

function handleAddItem() {
  (form.value.items ??= []).push({})
}

function removeItem(index) {
  if(form.value.items?.length === 1) return

  form.value.items?.splice(index, 1)
}

async function handleSubmit() {
  loading.value = true

  try {
    const rawForm = unref(form)
    const pdf = await $fetch('/api/invoice/template', { method: 'POST', body: rawForm, responseType: 'blob' })

    const blob = new Blob([pdf], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${rawForm.invoice_id}.pdf`
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(url)
    link.remove()
  } catch (error) {
    console.error
  } finally {
    loading.value = false
  }
}

function handleSellerToggle(value) {
  if(!value) {
    form.value.seller = {}
  } else {
    form.value.seller = data.value.user
  }
  useSellerFromDatabase.value = value
}

definePageMeta({
  middleware: 'auth'
})

useHead({ title: 'Nová faktúra' })
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.items {
  display: flex;
  gap: 20px;
}
.checkbox {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
</style>