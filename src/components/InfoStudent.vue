<template>
    <div>
        <button type="button" @click="showDialog">{{ subject.name }}</button>
            <my-model v-model:show="dialogVisible">
                <div>
                    <h4>{{ subject.name }}</h4>
                    <label>Сумма баллов:</label>
                    {{ subject.sumEvaluatuion }}
                    <table v-if="subject.sumEvaluatuion != 0">
                        <tr>
                            <td>Дата и время:</td>
                            <td>Оценка:</td>
                        </tr>
                        <tr v-for="evaluation in subject?.evaluations" :key="evaluation.guid">
                            <td>{{ new Date(evaluation.dateTime).toLocaleString() }}</td>
                            <td>{{ evaluation.quantity  }}</td>
                        </tr>
                    </table>
                </div>
            </my-model>   
    </div>
</template>

<script>
import axios from 'axios';
import MyModel from './UI/MyModel.vue';
    export default {
        components: { MyModel },
        props: {
            subject: {
                type: Array,
                required: true,
            }
        },
        data(){
            return {
                average: 0,
                dialogVisible: false
            }
        },
        methods: {
            showDialog()
            {
                this.dialogVisible = true;
            }
        },
    }
</script>

<style>

</style>