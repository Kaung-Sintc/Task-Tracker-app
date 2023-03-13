<template>
    <div class="task" :class="{ active: task.complete }">
        <div class="main">
            <h3 @click="toggleDesc">{{ task.title }}</h3>
            <div class="actions">
                <span 
                class="material-symbols-outlined done" 
                :class="{ active:task.complete }"
                @click="completeTask">
                    done
                </span>
                  <router-link :to="{ name:'edit-task', params: { id: task.id }}">
                    <span class="material-symbols-outlined">
                        edit
                    </span>    
                  </router-link>     
                <span class="material-symbols-outlined" @click="deleteTask">
                    delete
                </span>
            </div>
        </div>
        
        <div class="details" v-show="showDetails" @click.self="toggleDesc">
            <hr>
            <p>{{ task.description }}</p>
        </div>
      </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    props: ['task'],
    data() {
        return {
            url: `http://localhost:3000/tasks/${this.task.id}`,
            showDetails: false
        }
    },
    methods: {
        // delete
        deleteTask() {
            // pop-up with sweetalert2
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                // delete
                fetch(this.url, { method: 'DELETE' })
                .then(() => this.$emit('delete', this.task.id))
                .catch(e => console.log(e.messasge))
                // pop-up again
                Swal.fire(
                  'Deleted!',
                  'Your task has been deleted.',
                  'success'
                )
              }
            })
        },
        // complete task
        completeTask() {
            fetch(this.url, { 
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ complete: !this.task.complete })
            })
            .then(() => this.$emit('complete', this.task.id))
        },
        toggleDesc() {
            this.showDetails = !this.showDetails
        }
    }
}
</script>
<style>
    .task {
        background: white;
        margin:20px auto;
        padding:10px 20px;
        border-left:7px solid #fffa6d;
        border-radius:4px;
        box-shadow:1px 2px 2px rgba(0, 0, 0, 0.05);
    }
    .task.active {
        border-left:7px solid #8bffea;
    }
    .main {
        display:flex;
        justify-content: space-between;
        align-items: center;
        gap:9px;
        cursor:pointer;
    }
    .actions span{
        cursor:pointer;
        margin-right:4px;
        font-size: 24px;
        padding:6px;
        color:#4f4d4d;

    }
    .actions span.active {
        background-color:#8bffea;
        border-radius: 50%;
        color:#000000;
    }
    .main span:hover {
        color:#a2a0a0;
    }
    details {
        cursor:pointer;
    }
    .details p {
        opacity:0.7;
    }
</style>