<template>

    <!-- show error if exists -->
    <div v-if="error" class="error">
        {{ error }}
    </div>

    <!-- filter nav -->
    <FilterNav :current="currentState" @filter="currentState = $event" />

    <!-- components render -->
    <section v-if="tasks.length">
        <div v-for="task in filteredTasks" :key="task.id">
            <SingleTask :task="task" @complete="handleComplete" @delete="handleDelete"/>
        </div>
    </section>
</template>

<script>
import SingleTask from '@/components/SingleTask.vue'
import FilterNav from '@/components/FilterNav.vue'

export default {
    components: { SingleTask, FilterNav },
    data() {
        return {
            tasks: [],
            error: null,
            currentState: 'all'
        }
    },
    mounted() {
        this.error = null // re-update error to null state if mounted
        
        fetch("http://localhost:3000/tasks")
            .then(res => res.json())
            .then(data => this.tasks = data)
            .catch(e => this.error = e.message)
    },
    methods: {
        // remove task from DOM
        handleDelete(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
        },      
        handleComplete(id) {
            let task = this.tasks.find(task => task.id === id)
            // update in DOM
            task.complete = !task.complete

        }
    },
    computed: {
        filteredTasks(){
            switch(this.currentState) {
                // return keyword is used therefore no need to break
                case 'all':
                    return this.tasks

                case 'completed':
                    return this.tasks.filter(task => task.complete)

                case 'ongoing':
                    return this.tasks.filter(task => !task.complete)
            }
        }
    }
}
</script>
