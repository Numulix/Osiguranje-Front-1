<script setup>
import { inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { companyAPI } from "../api/companyAPI";

const toast = inject("toast");
const loading = ref(false);
const company = ref({
  name: "",
  address: "",
  registrationID: 0,
  taxID: 0,
  industrialClassificationID: 0,
  bankAccounts: [],
  employees: []
});
const route = useRoute();
const id = route.params.id;

onMounted(() => {
  loading.value = true;
  companyAPI.getCompanyById(id).then((res) => {
    loading.value = false;
    company.value = res.data;
  }).catch((err) => {
    loading.value = false;
    console.log(err);
  });
})

function deleteEmployee(id) {
  loading.value = true;
  companyAPI.deleteEmployee(company.value.id, id).then((res) => {
    loading.value = false;
    toast.success("Employee deleted successfully");
    company.value.employees = company.value.employees.filter(employee => employee.id !== id);
  }).catch((err) => {
    loading.value = false;
    console.log(err);
  });
}

function deleteBankAccount(id) {
  loading.value = true;
  companyAPI.deleteBankAccount(company.value.id, id).then((res) => {
    loading.value = false;
    toast.success("Bank account deleted successfully");
    company.value.bankAccounts = company.value.bankAccounts.filter(bankAccount => bankAccount.id !== id);
  }).catch((err) => {
    loading.value = false;
    console.log(err);
  });
}

function updateCompany() {
  loading.value = true;
  companyAPI.updateCompany(company.value).then((res) => {
    loading.value = false;
    toast.success("Company updated successfully");
  }).catch((err) => {
    loading.value = false;
    console.log(err);
  });
}

</script>

<template>
  <div class="container">
    <h1 class="mt-5">{{ company.name }}</h1>
    <div class="row row-cols-2">
      <div class="col">
        <h3 class="mt-4 text-center">Company Info</h3>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="company.name">
        </div>
        <p class="mt-3"><strong>Registration ID: </strong>{{ company.registrationID }}</p>
        <p><strong>Tax ID: </strong>{{ company.taxID }}</p>
        <div class="form-group">
          <label for="name">Address</label>
          <input type="text" class="form-control" id="name" v-model="company.address">
        </div>
        <div class="form-group mt-2">
          <label for="name">Industrial Classification ID</label>
          <input type="text" class="form-control" id="name" v-model="company.industrialClassificationID">
        </div>
        <button type="button" class="btn btn-primary mt-3" @click="updateCompany">Update Info</button>
      </div>
      <div class="col">
        <h3 class="mt-3 mb-5 text-center">Contact Employees</h3>
        <div class="d-flex justify-content-between align-items-center" v-for="employee in company.employees">
          <p>{{ employee.name + ' ' + employee.surname }} - {{ employee.email }} - {{ employee.phone }}</p>
          <button type="button" class="btn btn-sm btn-danger" @click="deleteEmployee(employee.id)"><i class="bi bi-trash"></i></button>
        </div>
        <hr>
        <h3 class="mt-3 mb-5 text-center">Contact Bank Accounts</h3>
        <div class="d-flex justify-content-between align-items-center" v-for="bankAccount in company.bankAccounts">
          <p>{{ bankAccount.bankName }} - {{ bankAccount.accountNumber }} - {{ bankAccount.accountType }}</p>
          <button type="button" class="btn btn-sm btn-danger" @click="deleteBankAccount(bankAccount.id)"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>