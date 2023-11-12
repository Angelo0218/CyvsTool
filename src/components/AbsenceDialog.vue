<template>
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
            <v-card-title class="text-h5 font-weight-black ">缺曠記錄</v-card-title>
            <v-card-text>
                <div class="absence-grid">
                    <div v-for="(absenceInfo, courseName) in sortedAbsences" :key="courseName"
                        class="absence-card elevation-2">
                        <div class="course-title">{{ courseName }}</div>
                        <div class="absence-detail">
                            <div class="absence-count">總缺席節數：{{ totalAbsencesForCourse(absenceInfo) }}</div>
                            <div v-for="(count, type) in absenceInfo" :key="type" class="absence-chip">
                                <v-chip :color="getColor(type)" dark>{{ getAbsenceTypeName(type) }}：{{ count }}</v-chip>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
import { ref, computed } from 'vue';

export default {
    props: {
        courseAbsences: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const dialog = ref(false);

        const absenceTypes = {
            '公': '公假',
            '病': '病假',
            '喪': '喪假',
            '事': '事假',
            '曠': '曠課',
            '缺': '缺席',
            '遲': '遲到',
            '早': '早退',
            '產': '產前假',
            '娩': '娩假',
            '流': '流產假',
            '育': '育嬰假',
            '生': '生理假',
            '陪': '陪產假',
            '婚': '婚假'
        };

        const colors = {
            '公': 'orange',
            '病': 'green',
            '喪': 'brown',
            '事': 'blue',
            '曠': 'red',
            '缺': 'pink',
            '遲': 'yellow',
            '早': 'purple',
            '產': 'teal',
            '娩': 'lime',
            '流': 'blue-grey',
            '育': 'deep-purple',
            '生': 'indigo',
            '陪': 'deep-orange',
            '婚': 'amber'
        };

        const getColor = (type) => {
            return colors[type] || 'grey';
        };

        const getAbsenceTypeName = (type) => {
            return absenceTypes[type] || type;
        };

        const totalAbsencesForCourse = (absenceInfo) => {
            return Object.values(absenceInfo).reduce((total, count) => total + count, 0);
        };

        const sortedAbsences = computed(() => {
            const sorted = {};
            const courseNames = Object.keys(props.courseAbsences).sort((a, b) => a.localeCompare(b, 'zh-Hant'));
            for (const courseName of courseNames) {
                sorted[courseName] = props.courseAbsences[courseName];
            }
            return sorted;
        });

        return {
            dialog,
            sortedAbsences,
            getColor,
            getAbsenceTypeName,
            totalAbsencesForCourse
        };
    }
};
</script>
  
<style>
.absence-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    justify-content: start;
}

.absence-card {
    padding: 16px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.absence-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.absence-count {
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.absence-chip {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.v-chip {
    margin: 4px 0;
}
</style>
  