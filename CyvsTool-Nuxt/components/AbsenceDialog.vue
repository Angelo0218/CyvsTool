<template>
    <v-dialog v-model="dialog" persistent max-width="620px">
        <v-card>
            <v-card-title class="text-h5 font-weight-bold">缺曠記錄</v-card-title>
            <v-card-text>
                <div class="records-explanation">
                    <!-- 添加標示說明 -->
                    <p>「超過1/3」表示該課程的缺課次數超過總節數的三分之一。</p>
                    <p>「正常」表示缺課次數未超過總節數的三分之一。</p>
                    <span style="margin-left: 5px;">各種假期的節數將顯示於各自的標籤中。</span>
                </div>
                <div class="absence-cards-container">
                    <div v-for="(status, courseName) in courseStatus" :key="courseName" class="absence-card">
                        <div class="course-header">
                            <span class="course-name">{{ courseName }}</span>
                            <span class="status-indicator" :class="{ 'exceeded': status.over_threshold }">
                                {{ status.over_threshold ? '超過1/3' : '正常' }}
                            </span>
                        </div>
                        <div class="course-details">
                            <span>預計剩餘節數將達到1/3：{{ status.remaining_to_threshold }}節 </span>
                            <br>
                            <span>累計缺課次數: {{ status.total_absences }}次</span>
                            <br>
                            <span>總節數: {{ status.total_classes }}節</span>
                        </div>
                        <div class="absence-types">
                            <v-chip v-for="(count, type) in courseAbsences[courseName]" :key="type" :color="getColor(type)"
                                class="absence-chip">
                                {{ getAbsenceTypeName(type) }}：{{ count }}節
                            </v-chip>
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
        },
        courseStatus: {
            type: Object,
            required: true
        },
    },
    setup(props) {
        const dialog = ref(false);

        const absenceTypes = {
            '差': '公差',
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
            '差': 'orange',
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
.records-explanation {
    margin-bottom: 2rem;
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
}



.absence-card {
    margin-bottom: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 1rem;
    background: #fff;
    overflow-y: auto;
    transform: translate3d(0, 0, 0);
}

.course-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.course-name {
    font-weight: 500;
    font-size: 1.1rem;
}

.status-indicator {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-weight: 500;
    color: white;
    font-size: 0.875rem;
}

.exceeded {
    background-color: #ff4949;
}

.status-indicator:not(.exceeded) {
    background-color: #49ff90;
}

.course-details {
    border-top: 1px solid #e0e0e0;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
}

.absence-types {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.absence-chip {
    font-size: 0.8rem;
    font-weight: 400;
}
</style>





