<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" @click.prevent="addModal"><i class="fa fa-user-plus fa-fw"></i> Add User
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Modify</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td><span class="tag tag-success">{{ user.type }}</span></td>
                                <td>
                                    <a href="" @click.prevent="editModal(user)">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                    /
                                    <a href="" @click.prevent="deleteUser(user.id)">
                                        <i class="fa fa-trash red"></i>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewLabel">{{ editMode?'Update User':'Add New User' }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode?updateUser():createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name"
                                       placeholder="Name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.email" type="email" name="email"
                                       placeholder="Email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                            <textarea v-model="form.bio" type="text" name="bio"
                                      placeholder="Bio"
                                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select v-model="form.type" name="type" id="type"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standard User</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password"
                                       placeholder="Password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">{{ editMode ? 'Update':'Create' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editMode: false,
            users: {},
            form: new Form({
                id:'',
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: '',
            })
        }
    },
    methods: {
        loadUsers() {
            axios.get('api/user').then(({data}) => (this.users = data.data));
        },
        addModal() {
            this.editMode = false;
            this.form.reset();
            $('#addNew').modal('show');
        },
        createUser() {
            this.form.post('api/user').then(() => {
                // $(".btn").click(function () {
                $("#addNew").modal('hide');
                // });
                Fire.$emit('AfterCreate');
                Toast.fire({
                    icon: 'success',
                    title: 'User created successfully'
                })
            }).catch(() => {

            });
        },
        deleteUser(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete('api/user/' + id).then(() => {
                        Fire.$emit('AfterCreate');
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                        )
                    }).catch(() => {
                        Swal.fire("Failed!", "There was something wrong", "warning");
                    });
                }
            })
        },
        editModal(user) {
            this.form.fill(user);
            this.editMode = true;
            $('#addNew').modal('show');
        },
        updateUser() {
            this.form.put('api/user/' + this.form.id,{params:this.form})
                .then(() => {

                    $("#addNew").modal('hide');
                    // });
                    Fire.$emit('AfterCreate');
                    Toast.fire({
                        icon: 'success',
                        title: 'User upadated successfully'});
                })
                .catch(() => {

                });
        },
    },
    created() {
        this.loadUsers();
        Fire.$on('AfterCreate', () => {
            this.loadUsers()
        })
        // setInterval(() => this.loadUsers(),3000)
    }
}
</script>
