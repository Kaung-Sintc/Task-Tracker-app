<template>
    <h1>Edit Task</h1>
    <form action="#" method="POST" @submit.prevent="handleSubmit">
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title">
            <span class="error" v-if="validationError">
                {{ validationError }}
            </span>
        </div>
        <div>
            <label for="desc">Description (optional)</label>
            <textarea id="desc" cols="30" rows="6" v-model="desc"></textarea>
        </div>

        <button class="btn-submit" type="submit">Edit</button>
    </form>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            url:`http://localhost:3000/tasks/${this.id}`,
            title: '',
            desc: '',
            validationError: null
        }
    },
    mounted() {
         fetch(this.url)
            .then(res => res.json())
            .then(data => {
                this.title = data.title
                this.desc = data.description
            })
    },
    methods: {
        handleSubmit() {
            // validate
            if(!this.title.trim() || this.title.trim().length < 3) {
                this.validationError = "Title field should be at least 3 characters"
            }else {
                let updateData = JSON.stringify({
                    title: this.title,
                    description: this.desc
                })
                // reset validation error
                this.validationError = null
                // update
                fetch(this.url, {
                    method: 'PATCH',
                    headers: { 'Content-type': 'application/json'},
                    body: updateData
                })
                .then(() => this.$router.push('/'))
                .catch(e => console.log(e.message))
            }
        }
    }
}
</script>

<style scoped>
     form {
        background-color: white;
        margin:40px auto;
        padding:20px;
        display:flex;
        flex-direction:column;
        justify-content: center;
        box-shadow:0px 0px 0px 3px rgba(0, 0, 0, 0.1);
        border-radius: 7px;

    }
    form div {
        margin-bottom:20px;
        display:flex;
        flex-direction:column;
        gap:4px;
    }
    label {
        display:block;
    }
    input {
        height:24px;
        outline:none;
        border:none;
        border-bottom:2px solid #aaa;
    }
    form button {
        width:100px;
        height:40px;
        border:none;
        background-color: #4ed3ff;
        color:white;
        font-size: 14px;
        border-radius:6px;
        cursor:pointer;
    }
    form button:hover {
        background-color: #00befe;

    }
    textarea {
        outline:none;
    }
</style>