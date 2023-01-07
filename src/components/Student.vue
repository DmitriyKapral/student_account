<template>
    <div>
        <h2>Student с email = {{ $route.params.login }}</h2>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return {
                guid: "",
                data: {},
                average: 0
            }
        },
        methods: {
            async getStudent(){
                this.guid = JSON.parse(localStorage.getItem('student')).guid;
                return await axios.get("https://localhost:7263/Student/" + this.guid).then(response => (this.data = response.data));
            },
            async averageSubjects(){
                return await axios.get("https://localhost:7263/Student/average/" + this.guid).then(response => (this.average = response.data));
            }
        },
        async beforeMount(){
            await this.getStudent()
            console.log(this.data)
        }
    }

</script>

<style>

</style>