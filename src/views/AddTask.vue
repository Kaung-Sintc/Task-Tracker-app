<template>
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

        <button class="btn-submit" type="submit">Add Task</button>
    </form>
</template>

<script>

export default {
    data() {
        return {
            url:"http://localhost:3000/tasks",
            title:'',
            desc:'',
            validationError: null,
        }
    },
    methods: {
        handleSubmit() {

            // validation
            if(!this.title.trim() || this.title.trim().length < 3) {
                this.validationError = "Title field should be at least 3 characters"
            }else {
                // reset validation error to null
                this.validationError = null

                let task = {
                    title: this.title,
                    description: this.desc,
                    complete: false
                }

                fetch(this.url, { method: 'POST',
                    headers: { 'Content-type': 'application/json'},
                    body: JSON.stringify(task)
                }).then(() => {
                    this.title = ''
                    this.desc = ''
                })
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