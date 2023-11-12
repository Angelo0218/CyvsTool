<template>
    <v-sheet class="pa-12">
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

                <v-btn :disabled="!email || !password || loading" :loading="loading" block color="#89916B"
                    size="large" type="submit">
                    查詢
                </v-btn>
            </v-form>
            <v-alert v-if="loginError" type="error" class="mt-4">
                登入失敗<br>請檢查您的學號和密碼
            </v-alert>
        </v-card>
    </v-sheet>
    <AbsenceDialog :course-absences="courseAbsences" v-model="showDialog" />
    <span style="display: block; text-align: center; margin-top: 3vh;"> ©苗栗國政府|教育廳</span>

    <v-dialog v-model="showTermsDialog" persistent max-width="600px">
        <v-card>
            <v-card-title class="text-h5 font-weight-300 mt-4">使用條款</v-card-title>
            <v-card-text class="terms-text">
                <p>在使用本查詢工具前，請詳細閱讀以下條款：</p>
                <ul>
                    <li>本工具僅供學習和查詢使用，請合理安排查詢次數以避免對校務系統造成負擔。</li>
                    <li>如校方認為本服務危害到學校伺服器的穩定性，可通過郵件（<a
                            href="mailto:maplech0218@gmail.com">maplech0218@gmail.com</a>）聯繫開發者進行處理。</li>
                    <li>若無法登入，可能是因為多次嘗試登入導致校務系統暫時封鎖帳號，請稍後再試。</li>
                </ul>
                <p class="text-center"><strong>點擊同意表示您已閱讀並同意以上條款。</strong></p>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn color="green darken-1" text @click="acceptTerms">同意</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import AbsenceDialog from '@/components/AbsenceDialog.vue';

export default {
    components: {
        AbsenceDialog
    },
    setup() {
        const email = ref(null);
        const password = ref(null);
        const showTermsDialog = ref(true);
        const loading = ref(false);
        const showDialog = ref(false);
        const courseAbsences = ref({});
        const loginError = ref(false);

        const onSubmit = async () => {
    
            loading.value = true;

            try {
                const response = await axios.post('/api', {
                    UserId: email.value,
                    Pswd: password.value
                });

                courseAbsences.value = response.data.course_absences;
                showDialog.value = true;
                loginError.value = false;
                loading.value = false;
            } catch (error) {
                console.error('登入失敗:', error);
                loginError.value = true;
                loading.value = false;
            }
        };

        const acceptTerms = () => {
      
            showTermsDialog.value = false;
        };

        return {
            email,
            password,
            showTermsDialog,
            onSubmit,
            acceptTerms,
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

.terms-text ul {
    padding-left: 1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.terms-text ul li {
    margin-bottom: 0.5em;
}

.terms-text p {
    margin-bottom: 0.5em;
}

.terms-text .text-center {
    margin-top: 1em;
    font-weight: 400;
}

a {
    color: #1976D2;
    /* 藍色連結 */
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
