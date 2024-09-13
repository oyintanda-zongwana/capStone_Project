<template>
  <div>
    <table v-if="users && users.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td data-label="Name">{{ user.firstName }}</td>
          <td data-label="Surname">{{ user.lastName }}</td>
          <td data-label="Email">{{ user.email }}</td>
          <td data-label="Actions">
            <button @click="openEditUserModal(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="users && !users.length">No users found.</div>
    <div v-else>Loading users...</div>
    
    <button @click="openAddUserModal">Edit User</button>

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
                <input type="email" class="form-control" id="email" v-model="currentUser.email" required>
              </div>
              <div class="mb-3" v-if="!isEdit">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="currentUser.password" required>
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserProfileView',
  data() {
    return {
      isEdit: false,
      currentUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapState(['users']),
  },
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions(['getUsers', 'addUser', 'editUser', 'deleteUser']),
    
    openAddUserModal() {
      this.isEdit = false;
      this.currentUser = { firstName: '', lastName: '', email: '', password: '' };
      this.showModal();
    },

    openEditUserModal(user) {
      this.isEdit = true;
      this.currentUser = { ...user, password: '' };
      this.showModal();
    },

    async submitUser() {
      try {
        if (this.isEdit) {
          await this.editUser(this.currentUser);
        } else {
          await this.addUser(this.currentUser);
        }
        this.hideModal();
        this.getUsers();
      } catch (error) {
        console.error('Error submitting user:', error);
      }
    },

    async deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        await this.$store.dispatch('deleteUser', userId);
        this.getUsers();
      }
    },

    showModal() {
      const modal = new bootstrap.Modal(document.getElementById('userModal'));
      modal.show();
    },

    hideModal() {
      const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
      if (modal) {
        modal.hide();
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>