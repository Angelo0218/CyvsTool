<template>
    <v-sheet class="pa-12">
        <span style="display: block;text-align: center; font-size: 2rem; font-weight: bolder;">啟英高中快速缺曠查詢工具</span>
        <span style="display: block;text-align: center; font-size: 1rem; font-weight: bolder;">Chi-Ying High School
            Absence Inquiry Tool</span>
        <br>
        <br>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form @submit.prevent="onSubmit">
                <v-text-field v-model="email" :readonly="loading" class="mb-2" clearable label="學號" required></v-text-field>
                <v-text-field v-model="password" :readonly="loading" clearable label="校務系統密碼" placeholder="輸入密碼"
                    type="password" required></v-text-field>

                <v-btn :disabled="!email || !password || loading" :loading="loading" block color="#89916B" size="large"
                    type="submit">
                    查詢
                </v-btn>
            </v-form>
            <v-alert v-if="loginError" type="error" class="mt-4">
                登入失敗
            </v-alert>
        </v-card>
    </v-sheet>
    <AbsenceDialog :course-absences="courseAbsences" v-model="showDialog" />
    <div style="display: block; text-align: center; margin-top: 3vh;">
        <span>Copyright© 苗栗國政府|教育廳<br>
            苗栗國（Myori）為網路虛擬國家</span>
        <br>
        <button class="blue-underline" @click="showTermsDialog = true">使用條款</button>
    </div>

    <v-dialog v-model="showTermsDialog" persistent max-width="600px" class="">
        <v-card>
            <v-card-title class="text-h5 font-weight-300 mt-4">使用條款</v-card-title>
            <v-card-text class="terms-text">
                <p>在使用本查詢工具前，請仔細閱讀並同意以下條款：</p>
                <ul>
                    <li>本網站目前為1.3版本，未來更新或功能變更將可能對條款進行調整。</li>
                    <li>本工具是一個獨立的第三方工具，並無存取或儲存任何學生資料。所有登錄操作實際上發生在學校校務系統中，本工具不會記錄任何用戶資料。</li>
                    <li>我們重視您的隱私和數據安全，不會未經授權使用或分享您的個人信息。</li>
                    <li>為保障服務品質和公平使用，本網站對查詢次數進行了合理限制。請根據您的實際需求合理安排查詢。</li>
                    <li>所有查詢結果以學校校務系統提供的資料為準。由於調課等情況，查詢結果可能存在不準確性，請用戶自行核對。</li>
                    <li>用戶有責任保護自己的帳號安全，不應將帳號信息泄露給他人，並應定期更換密碼。</li>
                    <li>若無法登入，可能是由於多次登入嘗試導致校務系統暫時封鎖您的帳號，請稍後再試。</li>
                    <li>若校方認為本服務影響學校伺服器的穩定性，或有任何安全疑慮，請通過郵件聯繫開發者進行處理：<a
                            href="mailto:angelo0218@ajlo.org">angelo0218@ajlo.org</a>。</li>
                    <li>本服務可能因維護、升級或其他技術原因而暫時中斷或終止，我們將盡力提前通知用戶。</li>
                    <li>本項目是開源的，您可以在 GitHub 上查看源碼：<a href="https://github.com/Angelo0218/Cyvs-MIMC"
                            target="_blank">https://github.com/Angelo0218/Cyvs-MIMC</a>。有關開源許可的詳細信息，請參考項目頁面上的說明。</li>
                    <li>如在使用過程中發現任何錯誤或有改善建議，歡迎通過郵件（<a
                            href="mailto:angelo0218@ajlo.org">angelo0218@ajlo.org</a>）或GitHub項目頁面提出反饋。</li>
                </ul>
                <h4 class="text-center"><strong>點擊同意表示您已閱讀並同意以上條款。</strong></h4>
            </v-card-text>


            <v-card-actions class="justify-center " large>
                <v-btn color="white " b class="custom-large-btn " @click="acceptTerms"
                    style="font-size:large;  background:#89916B; ">我已閲讀並同意以上條款</v-btn>
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

.blue-underline {
    text-decoration: underline;
    text-decoration-color: blue;
    text-decoration-thickness: 1px;
    /* 控制底線粗細 */
    border: none;
    /* 移除標準按鈕邊框 */
    background: none;
    /* 移除背景顏色 */
    color: blue;
    /* 文字顏色 */
    cursor: pointer;
    /* 滑鼠懸停時顯示指標 */
    padding: 5px;
    /* 內部間距 */
    font-size: 16px;
    /* 字體大小 */
}</style>