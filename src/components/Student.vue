<template>
    <div>
        <label>Фамилия Имя Отчество:</label>
        <h2>{{ data.fio }}</h2>
        <label>Группа:</label>
        <h2>{{ data.groupName }}</h2>
        <label>Факультет:</label>
        <h2>{{ data.facultyName }}</h2>
        <button type="button" @click="showDialog">Средний балл за все предметы</button>
        <my-model v-model:show="dialogVisibleAverage">
            <div>{{ averageEvalition }} Баллов</div>
        </my-model>
        <button type="button" @click="showDialogGraph">Визуализация суммы баллов за все предметы</button>
        <my-model v-model:show="dialogVisibleGraph">
            <div>
            <apexchart width="700" type="bar" :options="chartOptions" :series="series"></apexchart>
        </div>
        </my-model>
        <h2>Предметы:</h2>
        <div v-for="subject in data.subjects" :key="subject.guid">
                 <info-student
                 :subject="subject"></info-student>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MyModel from './UI/MyModel.vue';
import InfoStudent from './InfoStudent.vue';
import VueApexCharts from "vue3-apexcharts";
    export default {
  components: { MyModel, InfoStudent, apexchart: VueApexCharts, },
        data(){
            return {
                guid: "",
                data: {},
                averageEvalition: 0,
                dialogVisible: false,
                dialogVisibleAverage: false,
                dialogVisibleGraph: false,
                series: [
                    {
                        name: "Сумма баллов",
                        data: [0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ],
                chartOptions: {
                    xaxis: {
                        categories: [0, 0, 0, 0, 0, 0, 0, 0],
                    },
                },
            }
        },
        methods: {
            async getStudent(){
                this.guid = JSON.parse(localStorage.getItem('student')).guid;
                return await axios.get("https://localhost:7263/Student/" + this.guid).then(response => (this.data = response.data));
            },
            async averageSubjects(){
                return await axios.get("https://localhost:7263/Student/average/" + this.guid).then(response => (this.average = response.data));
            },
            showDialog()
            {
                this.dialogVisibleAverage = true;
                axios.get("https://localhost:7263/Student/average/" + this.data.guid).then(response => this.averageEvalition = response.data)
            },
            showDialogGraph()
            {
                this.dialogVisibleGraph = true;
                axios.get("https://localhost:7263/Student/dataAllSubjects/" + this.data.guid).then(response => {
                    this.chartOptions = {
                        xaxis: {
                            categories: response.data.subjects,
                        },
                };
                this.series = [
                    {
                        data: response.data.sumEvalitions,
                    },
                ];

                })
                
                
            }
        },
        async beforeMount(){
            await this.getStudent()
            //console.log(this.data)
        },
        logout() {
            localStorage.removeItem('student');
        },
    }

</script>

<style>
button {
    margin: 15px;
}
</style>