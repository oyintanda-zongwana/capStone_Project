<template>
  <div class="admin">
    <h1>Admin Dashboard</h1>

    <!-- Products Section -->
    <h2>Products</h2>
    <table v-if="products">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td><img v-if="product.prodUrl" :src="product.prodUrl" :alt="product.prodName" class="product-image"></td>
          <td>{{ product.prodName }}</td>
          <td>${{ product.amount }}</td>
          <td>{{ product.catergory }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button @click="openEditProductModal(product)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Loading products...</div>
    <button @click="openAddProductModal">Add Product</button>

    <!-- Users Section -->
    <h2>Users</h2>
    <table v-if="users">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><img v-if="user.userProfile" :src="user.userProfile" :alt="user.firstName" class="product-image"></td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="openEditUserModal(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Loading users...</div>
    <button @click="openAddUserModal">Add User</button>

    <!-- Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{ isEdit ? 'Edit Product' : 'Add Product' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitProduct">
              <div class="mb-3">
                <label for="prodName" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="prodName" v-model="currentProduct.prodName" required>
              </div>
              <div class="mb-3">
                <label for="amount" class="form-label">Price</label>
                <input type="number" class="form-control" id="amount" v-model="currentProduct.amount" required>
              </div>
              <!-- Add other fields for category, quantity, etc. -->
              <button type="submit" class="btn btn-primary">{{ isEdit ? 'Save Changes' : 'Add Product' }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- User Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">{{ isEdit ? 'Edit User' : 'Add User' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitUser">
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="currentUser.firstName" required>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" v-model="currentUser.lastName" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="currentUser.firstName" required>
              </div>
              <button type="submit" class="btn btn-primary">{{ isEdit ? 'Save Changes' : 'Add User' }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminPage',
  data() {
    return {
      isEdit: false,
      currentProduct: {
        prodName: '',
        amount: 0,
        // Add other fields like category, quantity, etc.
      },
      currentUser: {
        firstName: '',
        lastName: '',
        // Add other user-related fields
      }
    };
  },
  computed: {
    ...mapState(['products', 'users']),
  },
  created() {
    this.$store.dispatch('getProducts');
    this.$store.dispatch('getUsers');
  },
  methods: {
    openAddProductModal() {
      this.isEdit = false;
      this.currentProduct = { prodName: '', amount: 0 };
      new bootstrap.Modal(document.getElementById('productModal')).show();
    },
    openEditProductModal(product) {
      this.isEdit = true;
      this.currentProduct = { ...product };
      new bootstrap.Modal(document.getElementById('productModal')).show();
    },
    submitProduct() {
      if (this.isEdit) {
        // Call editProduct action in Vuex
        this.$store.dispatch('editProduct', this.currentProduct);
      } else {
        // Call addProduct action in Vuex
        this.$store.dispatch('addProduct', this.currentProduct);
      }
      new bootstrap.Modal(document.getElementById('productModal')).hide();
    },
    deleteProduct(prodID) {
      this.$store.dispatch('deleteProduct', prodID);
    },

    openAddUserModal() {
      this.isEdit = false;
      this.currentUser = { firstName: '', lastName: '' };
      new bootstrap.Modal(document.getElementById('userModal')).show();
    },
    openEditUserModal(user) {
      this.isEdit = true;
      this.currentUser = { ...user };
      new bootstrap.Modal(document.getElementById('userModal')).show();
    },
    submitUser() {
      if (this.isEdit) {
        // Call editUser action in Vuex
        this.$store.dispatch('editUser', this.currentUser);
      } else {
        // Call addUser action in Vuex
        this.$store.dispatch('addUser', this.currentUser);
      }
      new bootstrap.Modal(document.getElementById('userModal')).hide();
    },
    deleteUser(userId) {
      this.$store.dispatch('deleteUser', userId);
    }
  }
};
</script>

<style scoped>
.admin {
  margin-top: 10vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

/* Media Queries for Responsive Design */

/* Small devices (landscape phones, 576px and up) */
@media (max-width: 576px) {
  .admin {
    padding: 10px;
  }

  table {
    font-size: 14px;
  }

  th, td {
    padding: 5px;
  }

  .product-image {
    width: 50px;
    height: 50px;
  }

  button {
    padding: 3px 6px;
    font-size: 12px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 577px) and (max-width: 768px) {
  .admin {
    padding: 15px;
  }

  table {
    font-size: 15px;
  }

  .product-image {
    width: 75px;
    height: 75px;
  }

  button {
    padding: 4px 8px;
    font-size: 13px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 769px) and (max-width: 992px) {
  .admin {
    padding: 20px;
  }

  table {
    font-size: 16px;
  }

  .product-image {
    width: 90px;
    height: 90px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 993px) {
  .admin {
    padding: 20px;
  }
}

/* Responsive table for small screens */
@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin-bottom: 15px;
    border: 1px solid #ccc;
  }

  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
  }
}
</style>