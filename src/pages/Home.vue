<template>
    <v-sheet class=" pa-12">
        <span style="display: block;text-align: center; font-size: 2rem; font-weight: bolder;">啓英高中缺曠查詢</span>
        <span style="display: block;text-align: center; font-size: 1rem; font-weight: bolder;">Chi-Ying High School
            Attendance Statistics Lookup Tool</span>
        <br>
        <br>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form @submit.prevent="onSubmit">
                <v-text-field v-model="email" :readonly="loading" class="mb-2" clearable label="學號" required></v-text-field>

                <v-text-field v-model="password" :readonly="loading" clearable label="密碼" placeholder="輸入密碼" type="password"
                    required></v-text-field>

                <v-btn :disabled="!email || !password || loading" :loading="loading" block color="#89916B" size="large"
                    type="submit">
                    查詢
                </v-btn>
            </v-form>
            <v-alert v-if="loginError" type="error" class="mt-4">
                登入失敗，請檢查您的學號和密碼。
            </v-alert>
        </v-card>
    </v-sheet>
    <AbsenceDialog :course-absences="courseAbsences" v-model="showDialog" />

    <span style="display: block; text-align: center; margin-top: 3vh;"> ©苗栗國政府|教育廳</span>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import AbsenceDialog from '@/components/AbsenceDialog.vue'; // 引入 AbsenceDialog 組件

export default {
    components: {
        AbsenceDialog
    },
    setup() {
        const email = ref(null);
        const password = ref(null);
        const loading = ref(false);
        const showDialog = ref(false); // 控制彈窗顯示
        const courseAbsences = ref({}); // 存儲缺曠數據
        const loginError = ref(false); // 定义 loginError

        const onSubmit = async () => {
            loading.value = true;

            try {
                const response = await axios.post('http://192.168.0.221:8000/login', {
                    UserId: email.value,
                    Pswd: password.value
                });

                // 處理響應數據
                courseAbsences.value = response.data.course_absences; // 獲取缺曠數據
                showDialog.value = true; // 顯示彈窗
                loading.value = false;
            } catch (error) {
                console.error('登入失敗:', error);
                loading.value = false;
            }
        };

        return {
            email,
            password,
            onSubmit,
            loading,
            showDialog,
            courseAbsences,
            loginError
        };
    }
}
</script>

<style>
body {
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
}
</style>