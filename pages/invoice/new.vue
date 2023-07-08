<template>
  <section>
    <h1 style="margin-bottom: 20px;">Nová faktúra</h1>
    <form @submit.prevent="handleSubmit">
      <Fieldset legend="Predajca">
        <div class="inputs">
          <span class="p-float-label">
            <InputText id="seller-name" v-model="form.seller.name" type="text" required />
            <label for="seller-name">Meno predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText id="seller-id" v-model="form.seller.id" type="text" required />
            <label for="seller-id">ID predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText id="seller-address" v-model="form.seller.address" type="text" required />
            <label for="seller-address">Adresa predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText id="seller-contact" v-model="form.seller.contact" type="text" required />
            <label for="seller-contact">Kontakt predajcu</label>
          </span>
        </div>
      </Fieldset>

      <Fieldset legend="Kupujúci">
        <div class="inputs">
          <span class="p-float-label">
            <InputText id="buyer-name" v-model="form.buyer.name" required />
            <label for="buyer-name">Meno predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText id="buyer-id" v-model="form.buyer.id" required />
            <label for="buyer-id">ID predajcu</label>
          </span>
          <span class="p-float-label">
            <InputText id="buyer-address" v-model="form.buyer.address" required />        
            <label for="buyer-address">Adresa predajcu</label>
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
                <InputNumber id="item-quantity" v-model="item.quantity" required :useGrouping="false" />
                <label for="item-quantity">Množstvo</label>
              </span>
              <span class="p-float-label">
                <InputNumber id="item-price" v-model="item.price" mode="currency" currency="EUR" required />
                <label for="item-price">Cena</label>
              </span>
              <Button @click="removeItem(index)" type="button" variation="destructive" style="align-self: center;margin-left: auto;">&times;</Button>
            </div>
          </template>
          <p v-else>
            Nie sú tu žiadne položky.
          </p>
          <Button @click="handleAddItem" type="button" style="align-self: flex-end;">Pridaj položku</Button>
        </div>        
      </Fieldset>

      <Button style="align-self: flex-end;" :loading="loading">Vygenerovať faktúru</Button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const { data } = await useFetch('/api/me')

const form = ref({ seller: {}, buyer: {}, does_pay_tax: false })
const loading = ref(false)

if(data.value?.user !== null) {
  form.value.seller = data.value.user
}

function handleAddItem() {
  (form.value.items ??= []).push({})
}

function removeItem(index) {
  (form.value.items ??= []).splice(index, 1)
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
    link.download = 'file.pdf'
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