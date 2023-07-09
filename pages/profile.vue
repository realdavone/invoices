<template>
  <section>
    <Fieldset legend="Môj profil">
      <form @submit.prevent="handleSubmit">
        <span class="p-float-label">
          <InputText id="seller-name" v-model="form.name" type="text" required />
          <label for="seller-name">Moje obchodné meno</label>
        </span>
        <span class="p-float-label">
          <InputText id="seller-id" v-model="form.id" type="text" required />
          <label for="seller-id">Moje obchodné ID</label>
        </span>
        <span class="p-float-label">
          <InputText id="seller-address" v-model="form.address" type="text" required />
          <label for="seller-address">Moja obchodná adresa</label>
        </span>
        <span class="p-float-label">
          <InputText id="seller-contact" v-model="form.contact" type="text" required />
          <label for="seller-contact">Kontakt na mňa</label>
        </span>
        <Button>{{ data.user ? 'Upraviť' : 'Vytvoriť' }}</Button>
      </form>
    </Fieldset>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({})
const submitting = ref(false)

const { data, refresh } = await useFetch('/api/me')

if(data.value.user) {
  form.value = data.value.user
}

async function handleSubmit() {
  submitting.value = true

  try {
    await $fetch('/api/me', {
      method: data.value.user ? 'PUT' : 'POST',
      body: form.value
    })

    await refresh()
    useRouter().push('/')
  } catch(error) {
    console.error
  } finally {
    submitting.value = false
  }
}

definePageMeta({
  middleware: 'auth'
})
</script>

<style lang="scss" scoped>
form {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}
</style>