<template>
    <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
            <v-card-title>
                缺曠記錄
            </v-card-title>
            <v-card-text>
                <vue-good-table :columns="columns" :rows="formattedAbsences" :style-class="tableStyle">
                    <template v-slot:table-row="props">
                        <span v-if="props.column.field === 'type'">
                            <v-chip :color="getColor(props.row.type)" dark>
                                {{ props.row.type }}
                            </v-chip>
                        </span>
                        <span v-else>
                            {{ props.row[props.column.field] }}
                        </span>
                    </template>
                </vue-good-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
import { ref, computed } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'

export default {
    components: {
        VueGoodTable
    },
    props: {
        courseAbsences: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const dialog = ref(false);
        const columns = [
            {
                label: '課程',
                field: 'course'
            },
            {
                label: '缺勤類型',
                field: 'type'
            },
            {
                label: '次數',
                field: 'count'
            }
        ];

        const formattedAbsences = computed(() => {
            const absences = [];
            for (const course in props.courseAbsences) {
                for (const type in props.courseAbsences[course]) {
                    absences.push({
                        course,
                        type,
                        count: props.courseAbsences[course][type]
                    });
                }
            }
            return absences;
        });

        const getColor = (type) => {
            switch (type) {
                case '事': return 'blue';
                case '病': return 'green';
                case '曠': return 'red';
                default: return 'grey';
            }
        };

        return { dialog, columns, formattedAbsences, getColor };
    }
};
</script>
  
<style>
.tableStyle {
    background: white;
}
</style>
  